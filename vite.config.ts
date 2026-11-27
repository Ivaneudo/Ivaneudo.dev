import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import type { IncomingMessage } from 'node:http';

function readJsonBody(req: IncomingMessage): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => chunks.push(chunk));
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf-8');
        resolve(raw ? JSON.parse(raw) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

function devPortfolioCmsPlugin(): Plugin {
  return {
    name: 'dev-portfolio-cms',
    configureServer(server) {
      const rootDir = server.config.root;
      const i18nDir = path.resolve(rootDir, 'src/i18n');
      const projectsJsonPath = path.resolve(rootDir, 'src/data/projects.json');
      const projectsImgDir = path.resolve(rootDir, 'public/images/projects');

      // Rota 1: Criar ou editar projeto
      server.middlewares.use('/__dev-cms/project', async (req, res, next) => {
        if (req.method !== 'POST') return next();

        try {
          const body = (await readJsonBody(req)) as {
            id: string;
            title: string;
            imagePath?: string;
            imageUpload?: { filename: string; dataUrl: string };
            liveUrl?: string;
            githubUrl?: string;
            stacks: Array<{ id: string; alt: string; src: string }>;
            insertAtTop?: boolean;
            translations: {
              pt: { alt: string; summary: string };
              en: { alt: string; summary: string };
              es: { alt: string; summary: string };
            };
          };

          const cleanId = body.id.trim().replace(/[^a-zA-Z0-9_-]/g, '');
          if (!cleanId || !body.title?.trim()) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'ID e Título são obrigatórios.' }));
            return;
          }

          let finalImagePath = body.imagePath?.trim() || '';

          if (body.imageUpload?.dataUrl) {
            const match = body.imageUpload.dataUrl.match(
              /^data:image\/([a-zA-Z0-9+.-]+);base64,(.+)$/
            );
            if (!match) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Formato de imagem inválido.' }));
              return;
            }

            const rawExt = match[1].toLowerCase();
            const ext = rawExt === 'jpeg' ? 'jpg' : rawExt === 'svg+xml' ? 'svg' : rawExt;
            const fileName = `${cleanId}.${ext}`;

            fs.mkdirSync(projectsImgDir, { recursive: true });
            const buffer = Buffer.from(match[2], 'base64');
            fs.writeFileSync(path.resolve(projectsImgDir, fileName), buffer);
            finalImagePath = `/images/projects/${fileName}`;
          }

          const langs = ['pt', 'en', 'es'] as const;
          for (const lang of langs) {
            const filePath = path.resolve(i18nDir, `${lang}.json`);
            const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
            jsonData.projects = jsonData.projects || {};
            jsonData.projects[cleanId] = {
              alt: body.translations[lang].alt,
              summary: body.translations[lang].summary,
            };
            fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2) + '\n', 'utf-8');
          }

          const currentProjects = JSON.parse(fs.readFileSync(projectsJsonPath, 'utf-8'));
          const newEntry = {
            id: cleanId,
            title: body.title.trim(),
            ...(finalImagePath ? { image: finalImagePath } : {}),
            ...(body.liveUrl?.trim() ? { liveUrl: body.liveUrl.trim() } : {}),
            ...(body.githubUrl?.trim() ? { githubUrl: body.githubUrl.trim() } : {}),
            stacks: body.stacks,
          };

          const existingIndex = currentProjects.findIndex(
            (p: { id: string }) => p.id === cleanId
          );

          if (existingIndex >= 0) {
            currentProjects[existingIndex] = newEntry;
          } else if (body.insertAtTop) {
            currentProjects.unshift(newEntry);
          } else {
            currentProjects.push(newEntry);
          }

          fs.writeFileSync(projectsJsonPath, JSON.stringify(currentProjects, null, 2) + '\n', 'utf-8');

          // 👇 AQUI (sucesso ao salvar projeto)
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ ok: true, project: newEntry }));
        } catch (error) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: String(error) }));
        }
      });

      // Rota 2: Atualizar textos gerais
      server.middlewares.use('/__dev-cms/texts', async (req, res, next) => {
        if (req.method !== 'POST') return next();

        try {
          const body = (await readJsonBody(req)) as {
            translations: Record<'pt' | 'en' | 'es', Record<string, unknown>>;
          };

          const langs = ['pt', 'en', 'es'] as const;
          for (const lang of langs) {
            const filePath = path.resolve(i18nDir, `${lang}.json`);
            fs.writeFileSync(
              filePath,
              JSON.stringify(body.translations[lang], null, 2) + '\n',
              'utf-8'
            );
          }

          // 👇 E AQUI (sucesso ao salvar textos)
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ ok: true }));
        } catch (error) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: String(error) }));
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), devPortfolioCmsPlugin()],
});