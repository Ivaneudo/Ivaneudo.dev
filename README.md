# Portfólio Pessoal (v3.1) 🚀

Bem-vindo ao repositório do meu portfólio profissional! Este projeto foi desenvolvido para apresentar meus projetos, habilidades e trajetórias na área de desenvolvimento de software.

🔗 **Acesse o portfólio online:** [Portfolio](https://ivaneudo-portfolio.vercel.app/)

> 🎉 **Novidades da versão (v3.1):**
> - Totalmente responsivo (Desktop, Tablet e Mobile) e disponível em **Português, English e Español**.
> - **Tema Claro e Escuro** com detecção automática das preferências do sistema operacional e alternância manual.
> - **Navbar Inteligente** fixa que se oculta ao rolar para baixo e reaparece imediatamente ao rolar para cima.
> - **Dev CMS Integrado** (exclusivo para ambiente de desenvolvimento) para cadastrar/editar projetos, enviar imagens e alterar textos nos 3 idiomas sem precisar editar múltiplos arquivos manualmente.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando o ecossistema React com tipagem estática, CSS-in-JS e padrão rigoroso de separação entre renderização (`*.tsx`) e estilização (`*.styles.ts`):

- **[React](https://react.dev/):** Biblioteca principal para a construção da interface.
- **[TypeScript](https://www.typescriptlang.org/):** Tipagem estática para maior segurança e produtividade no código.
- **[Emotion JS](https://emotion.sh/):** Estilização dinâmica e escopada em TypeScript (zero arquivos `.css` tradicionais).
- **[Vite](https://vitejs.dev/):** Bundler e servidor de desenvolvimento com plugin local customizado para o Dev CMS.
- **[Lucide React](https://lucide.dev/):** Biblioteca de ícones minimalistas para a interface.

---

## ✨ O que você encontra no portfólio

- **Apresentação Pessoal (Home):** Foto em destaque, cargo, resumo profissional e grid de tecnologias principais.
- **Projetos em Destaque:** Cards responsivos com foto, stacks utilizadas, descrição multilíngue e links condicionais (os ícones de *Live Preview* e *GitHub* só são exibidos quando configurados, e apenas projetos com foto são listados).
- **Sobre Mim & Contato:** Biografia detalhada, idiomas e links diretos para redes sociais.
- **Fundo Animado:** Animação sutil em tons carmesim (`#C90000`) adaptada para alto contraste nos temas claro e escuro.

---

## 🚀 Como executar o projeto localmente

Caso queira clonar e explorar o código-fonte na sua máquina:

1. Clone o repositório:

```bash
git clone https://github.com/Ivaneudo/Ivaneudo.dev.git
```

2. Entre na pasta do projeto:

```bash
cd Ivaneudo.dev
```

3. Instale as dependências:

```bash
npm install
# ou
yarn install
```

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

5. Abra o navegador em `http://localhost:5173` (ou a porta indicada no terminal).

---

## 🧩 Como adicionar seus próprios projetos e personalizar (Dev CMS)

Este repositório conta com um **Painel CMS local** que funciona **apenas em modo de desenvolvimento (`npm run dev`)**. Se você clonou o projeto para criar o seu próprio portfólio, não precisa sair editando dezenas de arquivos manualmente:

1. Com o projeto rodando via `npm run dev`, clique no botão flutuante **`Dev CMS`** no canto inferior direito da tela.
2. Escolha o **setor** que deseja editar:
   - **Projetos (Novo / Editar):** preencha o título, links opcionais (*Live* e *GitHub*), selecione as stacks e faça o **upload da imagem** diretamente do seu computador (ela será salva automaticamente em `public/images/projects/`) além dos textos nos 3 idiomas (`PT`, `EN`, `ES`).
   - **Navbar & Home:** edite os links de navegação, cargo e subtítulo da página inicial nos 3 idiomas.
   - **Título de Projetos:** altere o título da seção nos 3 idiomas.
   - **Sobre Mim:** edite os blocos de biografia, destaques em vermelho e idiomas falados em `PT`, `EN` e `ES`.
3. Ao clicar em **Salvar**, um middleware do Vite grava as alterações diretamente nos arquivos `src/data/projects.json` e `src/i18n/*.json`, atualizando o portfólio em tempo real.

> 🔒 **Segurança em Produção:** Ao gerar o build final (`npm run build`), a flag `import.meta.env.DEV` se torna `false` e o Vite remove completamente o botão e todo o código do `Dev CMS` do pacote final.

### Outras personalizações manuais rápidas:
- **Foto de perfil:** substitua o arquivo `public/images/profile.jpg` pela sua própria foto.
- **Stacks da tela inicial:** edite o array `STACKS_DATA` em `src/data/stacks.ts`.
- **Links das redes sociais:** atualize os URLs em `src/components/AboutSection/AboutSection.tsx`.

---

## 📬 Contato

Gostou do projeto ou quer conversar sobre alguma oportunidade? Entre em contato comigo:

- **Instagram:** [Ivaneudo.dev](https://instagram.com/ivaneudo.dev/)
- **LinkedIn:** [Ivaneudo](https://linkedin.com/in/ivaneudo-carvalho/)
- **E-mail:** ivaneudo.dev@gmail.com
- **GitHub:** [Ivaneudo](https://github.com/Ivaneudo)

---

## 📄 Licença e Direitos Autorais

O código-fonte deste projeto está licenciado sob a licença **MIT**. Sinta-se à vontade para clonar e utilizar a estrutura como referência de estudo ou base para o seu portfólio.

> ⚠️ **Atenção aos Assets:** Os assets contidos neste repositório (imagens pessoais, logotipos, textos autorais e fotografias dos projetos) são protegidos por direitos autorais e não podem ser reproduzidos, copiados ou reutilizados sem autorização prévia.