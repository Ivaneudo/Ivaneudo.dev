import React, { useState } from 'react';
import { FolderPlus, Home, Save, Type, Upload, User, Wrench, X } from 'lucide-react';
import ptJson from '../../i18n/pt.json';
import enJson from '../../i18n/en.json';
import esJson from '../../i18n/es.json';
import { PROJECTS_DATA } from '../../data/projects';
import type { StackItem } from '../../data/stacks';
import {
  CheckboxLabel,
  CloseButton,
  CustomStackRow,
  DevBadge,
  FeedbackBanner,
  FieldGroupGrid,
  FieldWrapper,
  FileInputLabel,
  FloatingDevButton,
  HiddenFileInput,
  ImageUploadBox,
  Input,
  Label,
  LangCard,
  LangCardHeader,
  LangGrid,
  ModalBackdrop,
  ModalBody,
  ModalDialog,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  PreviewThumb,
  PrimarySubmitButton,
  SectorTabButton,
  SectorTabsBar,
  Select,
  StackChip,
  StacksPickerGrid,
  Textarea,
} from './DevCms.styles';

type SectorType = 'project' | 'home' | 'projectsTitle' | 'about';
type LangKey = 'pt' | 'en' | 'es';

const AVAILABLE_STACKS: StackItem[] = [
  { id: 'react', alt: 'React', src: 'https://skillicons.dev/icons?i=react' },
  { id: 'ts', alt: 'TypeScript', src: 'https://skillicons.dev/icons?i=ts' },
  { id: 'emotion', alt: 'Emotion', src: 'https://skillicons.dev/icons?i=emotion' },
  {
    id: 'quarkus',
    alt: 'Quarkus',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/quarkus/quarkus-original.svg',
  },
  { id: 'spring', alt: 'Spring Boot', src: 'https://skillicons.dev/icons?i=spring' },
  { id: 'postgres', alt: 'PostgreSQL', src: 'https://skillicons.dev/icons?i=postgres' },
  { id: 'docker', alt: 'Docker', src: 'https://skillicons.dev/icons?i=docker' },
  { id: 'nextjs', alt: 'Next.js', src: 'https://skillicons.dev/icons?i=nextjs' },
  { id: 'tailwind', alt: 'Tailwind CSS', src: 'https://skillicons.dev/icons?i=tailwind' },
  { id: 'angular', alt: 'Angular', src: 'https://skillicons.dev/icons?i=angular' },
  { id: 'java', alt: 'Java', src: 'https://skillicons.dev/icons?i=java' },
  { id: 'arch', alt: 'Arch Linux', src: 'https://skillicons.dev/icons?i=arch' },
  { id: 'linux', alt: 'Linux', src: 'https://skillicons.dev/icons?i=linux' },
  { id: 'bash', alt: 'Bash', src: 'https://skillicons.dev/icons?i=bash' },
  { id: 'git', alt: 'Git', src: 'https://skillicons.dev/icons?i=git' },
];

const toCamelCaseId = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .trim()
    .split(/\s+/)
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join('');

export const DevCms: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sector, setSector] = useState<SectorType>('project');
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{
    variant: 'success' | 'error';
    message: string;
  } | null>(null);

  // Estado do setor de Projeto
  const [selectedExistingId, setSelectedExistingId] = useState<string>('__new__');
  const [projectId, setProjectId] = useState('');
  const [idManuallyEdited, setIdManuallyEdited] = useState(false);
  const [projectTitle, setProjectTitle] = useState('');
  const [imagePath, setImagePath] = useState('');
  const [imageUpload, setImageUpload] = useState<{ filename: string; dataUrl: string } | null>(
    null
  );
  const [liveUrl, setLiveUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [selectedStacks, setSelectedStacks] = useState<StackItem[]>([]);
  const [customStackId, setCustomStackId] = useState('');
  const [insertAtTop, setInsertAtTop] = useState(true);
  const [projTranslations, setProjTranslations] = useState({
    pt: { alt: '', summary: '' },
    en: { alt: '', summary: '' },
    es: { alt: '', summary: '' },
  });

  // Estado dos setores de Textos Gerais (3 idiomas)
  const [textsState, setTextsState] = useState({
    pt: structuredClone(ptJson),
    en: structuredClone(enJson),
    es: structuredClone(esJson),
  });
  const [activeAboutLang, setActiveAboutLang] = useState<LangKey>('pt');

  const resetProjectForm = () => {
    setSelectedExistingId('__new__');
    setProjectId('');
    setIdManuallyEdited(false);
    setProjectTitle('');
    setImagePath('');
    setImageUpload(null);
    setLiveUrl('');
    setGithubUrl('');
    setSelectedStacks([]);
    setInsertAtTop(true);
    setProjTranslations({
      pt: { alt: '', summary: '' },
      en: { alt: '', summary: '' },
      es: { alt: '', summary: '' },
    });
  };

  const handleSelectProjectTarget = (targetId: string) => {
    setFeedback(null);
    if (targetId === '__new__') {
      resetProjectForm();
      return;
    }

    const found = PROJECTS_DATA.find((p) => p.id === targetId);
    if (!found) return;

    setSelectedExistingId(targetId);
    setProjectId(found.id);
    setIdManuallyEdited(true);
    setProjectTitle(found.title);
    setImagePath(found.image || '');
    setImageUpload(null);
    setLiveUrl(found.liveUrl || '');
    setGithubUrl(found.githubUrl || '');
    setSelectedStacks(found.stacks);
    setProjTranslations({
      pt: { ...textsState.pt.projects[found.id] },
      en: { ...textsState.en.projects[found.id] },
      es: { ...textsState.es.projects[found.id] },
    });
  };

  const handleTitleChange = (val: string) => {
    setProjectTitle(val);
    if (!idManuallyEdited && selectedExistingId === '__new__') {
      setProjectId(toCamelCaseId(val));
    }
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImageUpload({ filename: file.name, dataUrl: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };

  const toggleStack = (stack: StackItem) => {
    setSelectedStacks((prev) =>
      prev.some((s) => s.id === stack.id)
        ? prev.filter((s) => s.id !== stack.id)
        : [...prev, stack]
    );
  };

  const handleAddCustomStack = () => {
    const clean = customStackId.trim().toLowerCase();
    if (!clean) return;
    if (!selectedStacks.some((s) => s.id === clean)) {
      setSelectedStacks((prev) => [
        ...prev,
        {
          id: clean,
          alt: clean,
          src: `https://skillicons.dev/icons?i=${clean}`,
        },
      ]);
    }
    setCustomStackId('');
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!projectId.trim() || !projectTitle.trim()) {
      setFeedback({ variant: 'error', message: 'Preencha o ID e o Título do projeto.' });
      return;
    }

    const langs: LangKey[] = ['pt', 'en', 'es'];
    for (const lang of langs) {
      if (!projTranslations[lang].alt.trim() || !projTranslations[lang].summary.trim()) {
        setFeedback({
          variant: 'error',
          message: `Preencha os campos "alt" e "descrição" em ${lang.toUpperCase()}.`,
        });
        return;
      }
    }

    setSaving(true);
    try {
      const response = await fetch('/__dev-cms/project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: projectId,
          title: projectTitle,
          imagePath,
          imageUpload: imageUpload ?? undefined,
          liveUrl,
          githubUrl,
          stacks: selectedStacks,
          insertAtTop,
          translations: projTranslations,
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Erro ao salvar projeto.');

      setFeedback({
        variant: 'success',
        message: 'Projeto salvo com sucesso nos arquivos JSON e na pasta public/images/projects!',
      });
      if (selectedExistingId === '__new__') {
        resetProjectForm();
      }
    } catch (err) {
      setFeedback({ variant: 'error', message: String(err) });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveTexts = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    setSaving(true);

    try {
      const response = await fetch('/__dev-cms/texts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ translations: textsState }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Erro ao atualizar textos.');

      setFeedback({
        variant: 'success',
        message: 'Textos atualizados nos arquivos pt.json, en.json e es.json!',
      });
    } catch (err) {
      setFeedback({ variant: 'error', message: String(err) });
    } finally {
      setSaving(false);
    }
  };

  const updateTextField = (
    lang: LangKey,
    group: 'nav' | 'home' | 'projects' | 'about',
    key: string,
    value: string
  ) => {
    setTextsState((prev) => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        [group]: {
          ...prev[lang][group],
          [key]: value,
        },
      },
    }));
  };

  const updateAboutBlock = (
    lang: LangKey,
    block: 'block1' | 'block2',
    key: string,
    value: string
  ) => {
    setTextsState((prev) => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        about: {
          ...prev[lang].about,
          [block]: {
            ...prev[lang].about[block],
            [key]: value,
          },
        },
      },
    }));
  };

  const previewUrl = imageUpload?.dataUrl || imagePath;

  return (
    <>
      <FloatingDevButton type="button" onClick={() => setIsOpen(true)}>
        <Wrench size={16} />
        Dev CMS
      </FloatingDevButton>

      {isOpen && (
        <ModalBackdrop onClick={() => setIsOpen(false)}>
          <ModalDialog onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>
                Painel do Portfólio <DevBadge>DEV ONLY</DevBadge>
              </ModalTitle>
              <CloseButton type="button" onClick={() => setIsOpen(false)} aria-label="Fechar">
                <X size={18} />
              </CloseButton>
            </ModalHeader>

            <SectorTabsBar>
              <SectorTabButton
                type="button"
                active={sector === 'project'}
                onClick={() => {
                  setSector('project');
                  setFeedback(null);
                }}
              >
                <FolderPlus size={15} />
                Projetos (Novo / Editar)
              </SectorTabButton>

              <SectorTabButton
                type="button"
                active={sector === 'home'}
                onClick={() => {
                  setSector('home');
                  setFeedback(null);
                }}
              >
                <Home size={15} />
                Navbar & Home
              </SectorTabButton>

              <SectorTabButton
                type="button"
                active={sector === 'projectsTitle'}
                onClick={() => {
                  setSector('projectsTitle');
                  setFeedback(null);
                }}
              >
                <Type size={15} />
                Título de Projetos
              </SectorTabButton>

              <SectorTabButton
                type="button"
                active={sector === 'about'}
                onClick={() => {
                  setSector('about');
                  setFeedback(null);
                }}
              >
                <User size={15} />
                Sobre Mim
              </SectorTabButton>
            </SectorTabsBar>

            {sector === 'project' ? (
              <ModalBody onSubmit={handleSaveProject}>
                <FieldGroupGrid>
                  <FieldWrapper>
                    <Label>Modo (Criar novo ou editar existente)</Label>
                    <Select
                      value={selectedExistingId}
                      onChange={(e) => handleSelectProjectTarget(e.target.value)}
                    >
                      <option value="__new__">+ Cadastrar Novo Projeto</option>
                      {PROJECTS_DATA.map((proj) => (
                        <option key={proj.id} value={proj.id}>
                          Editar: {proj.title} ({proj.id})
                        </option>
                      ))}
                    </Select>
                  </FieldWrapper>

                  <FieldWrapper>
                    <Label>ID / Chave JSON (camelCase, sem espaços) *</Label>
                    <Input
                      value={projectId}
                      disabled={selectedExistingId !== '__new__'}
                      onChange={(e) => {
                        setIdManuallyEdited(true);
                        setProjectId(e.target.value);
                      }}
                      placeholder="ex: sistemaB2g"
                      required
                    />
                  </FieldWrapper>

                  <FieldWrapper>
                    <Label>Título do Projeto *</Label>
                    <Input
                      value={projectTitle}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="ex: Sistema Integrado B2G"
                      required
                    />
                  </FieldWrapper>

                  <FieldWrapper>
                    <Label>Live URL (deixe vazio se não estiver no ar)</Label>
                    <Input
                      value={liveUrl}
                      onChange={(e) => setLiveUrl(e.target.value)}
                      placeholder="https://..."
                    />
                  </FieldWrapper>

                  <FieldWrapper>
                    <Label>GitHub URL (deixe vazio se for privado)</Label>
                    <Input
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      placeholder="https://github.com/Ivaneudo/..."
                    />
                  </FieldWrapper>

                  <FieldWrapper>
                    <Label>Caminho ou URL da imagem (opcional se fizer upload)</Label>
                    <Input
                      value={imagePath}
                      onChange={(e) => setImagePath(e.target.value)}
                      placeholder="/images/projects/meu-projeto.png"
                    />
                  </FieldWrapper>
                </FieldGroupGrid>

                <FieldWrapper>
                  <Label>Upload da Imagem do Projeto (salva em public/images/projects/)</Label>
                  <ImageUploadBox>
                    <FileInputLabel>
                      <Upload size={16} />
                      {imageUpload ? imageUpload.filename : 'Selecionar imagem do computador'}
                      <HiddenFileInput
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                      />
                    </FileInputLabel>
                    {previewUrl && <PreviewThumb src={previewUrl} alt="Preview" />}
                  </ImageUploadBox>
                </FieldWrapper>

                <FieldWrapper>
                  <Label>Stacks utilizadas (selecione ou adicione por ID do skillicons.dev)</Label>
                  <StacksPickerGrid>
                    {AVAILABLE_STACKS.map((stack) => (
                      <StackChip
                        key={stack.id}
                        type="button"
                        selected={selectedStacks.some((s) => s.id === stack.id)}
                        onClick={() => toggleStack(stack)}
                      >
                        <img src={stack.src} alt={stack.alt} />
                        {stack.alt}
                      </StackChip>
                    ))}
                  </StacksPickerGrid>

                  <CustomStackRow>
                    <Input
                      style={{ maxWidth: 240 }}
                      value={customStackId}
                      onChange={(e) => setCustomStackId(e.target.value)}
                      placeholder="Outro ID skillicons (ex: python)"
                    />
                    <SectorTabButton type="button" active={false} onClick={handleAddCustomStack}>
                      + Adicionar Stack
                    </SectorTabButton>
                  </CustomStackRow>
                </FieldWrapper>

                {selectedExistingId === '__new__' && (
                  <CheckboxLabel>
                    <input
                      type="checkbox"
                      checked={insertAtTop}
                      onChange={(e) => setInsertAtTop(e.target.checked)}
                    />
                    Exibir este projeto primeiro (no topo da lista)
                  </CheckboxLabel>
                )}

                <FieldWrapper>
                  <Label>Traduções obrigatórias nos 3 idiomas *</Label>
                  <LangGrid>
                    {(['pt', 'en', 'es'] as LangKey[]).map((lang) => (
                      <LangCard key={lang}>
                        <LangCardHeader>
                          {lang === 'pt'
                            ? '🇧🇷 Português'
                            : lang === 'en'
                            ? '🇺🇸 English'
                            : '🇪🇸 Español'}
                        </LangCardHeader>
                        <FieldWrapper>
                          <Label>Texto alternativo da foto (alt) *</Label>
                          <Input
                            value={projTranslations[lang].alt}
                            onChange={(e) =>
                              setProjTranslations((prev) => ({
                                ...prev,
                                [lang]: { ...prev[lang], alt: e.target.value },
                              }))
                            }
                            required
                          />
                        </FieldWrapper>
                        <FieldWrapper>
                          <Label>Descrição / Resumo *</Label>
                          <Textarea
                            value={projTranslations[lang].summary}
                            onChange={(e) =>
                              setProjTranslations((prev) => ({
                                ...prev,
                                [lang]: { ...prev[lang], summary: e.target.value },
                              }))
                            }
                            required
                          />
                        </FieldWrapper>
                      </LangCard>
                    ))}
                  </LangGrid>
                </FieldWrapper>

                {feedback && (
                  <FeedbackBanner variant={feedback.variant}>{feedback.message}</FeedbackBanner>
                )}

                <ModalFooter>
                  <PrimarySubmitButton type="submit" disabled={saving}>
                    <Save size={16} />
                    {saving ? 'Salvando...' : 'Salvar Projeto'}
                  </PrimarySubmitButton>
                </ModalFooter>
              </ModalBody>
            ) : (
              <ModalBody onSubmit={handleSaveTexts}>
                {sector === 'home' && (
                  <LangGrid>
                    {(['pt', 'en', 'es'] as LangKey[]).map((lang) => (
                      <LangCard key={lang}>
                        <LangCardHeader>
                          {lang === 'pt'
                            ? '🇧🇷 Português'
                            : lang === 'en'
                            ? '🇺🇸 English'
                            : '🇪🇸 Español'}
                        </LangCardHeader>
                        <FieldWrapper>
                          <Label>Nav: Início</Label>
                          <Input
                            value={textsState[lang].nav.home}
                            onChange={(e) => updateTextField(lang, 'nav', 'home', e.target.value)}
                          />
                        </FieldWrapper>
                        <FieldWrapper>
                          <Label>Nav: Projetos</Label>
                          <Input
                            value={textsState[lang].nav.projects}
                            onChange={(e) =>
                              updateTextField(lang, 'nav', 'projects', e.target.value)
                            }
                          />
                        </FieldWrapper>
                        <FieldWrapper>
                          <Label>Nav: Sobre mim</Label>
                          <Input
                            value={textsState[lang].nav.about}
                            onChange={(e) => updateTextField(lang, 'nav', 'about', e.target.value)}
                          />
                        </FieldWrapper>
                        <FieldWrapper>
                          <Label>Cargo (Prefixo)</Label>
                          <Input
                            value={textsState[lang].home.rolePrefix}
                            onChange={(e) =>
                              updateTextField(lang, 'home', 'rolePrefix', e.target.value)
                            }
                          />
                        </FieldWrapper>
                        <FieldWrapper>
                          <Label>Cargo (Destaque Vermelho)</Label>
                          <Input
                            value={textsState[lang].home.roleHighlight}
                            onChange={(e) =>
                              updateTextField(lang, 'home', 'roleHighlight', e.target.value)
                            }
                          />
                        </FieldWrapper>
                        <FieldWrapper>
                          <Label>Cargo (Sufixo)</Label>
                          <Input
                            value={textsState[lang].home.roleSuffix}
                            onChange={(e) =>
                              updateTextField(lang, 'home', 'roleSuffix', e.target.value)
                            }
                          />
                        </FieldWrapper>
                        <FieldWrapper>
                          <Label>Subtítulo da Home</Label>
                          <Textarea
                            value={textsState[lang].home.summary}
                            onChange={(e) =>
                              updateTextField(lang, 'home', 'summary', e.target.value)
                            }
                          />
                        </FieldWrapper>
                      </LangCard>
                    ))}
                  </LangGrid>
                )}

                {sector === 'projectsTitle' && (
                  <LangGrid>
                    {(['pt', 'en', 'es'] as LangKey[]).map((lang) => (
                      <LangCard key={lang}>
                        <LangCardHeader>
                          {lang === 'pt'
                            ? '🇧🇷 Português'
                            : lang === 'en'
                            ? '🇺🇸 English'
                            : '🇪🇸 Español'}
                        </LangCardHeader>
                        <FieldWrapper>
                          <Label>Título da Seção Projetos</Label>
                          <Input
                            value={textsState[lang].projects.title}
                            onChange={(e) =>
                              updateTextField(lang, 'projects', 'title', e.target.value)
                            }
                          />
                        </FieldWrapper>
                      </LangCard>
                    ))}
                  </LangGrid>
                )}

                {sector === 'about' && (
                  <>
                    <StacksPickerGrid>
                      {(['pt', 'en', 'es'] as LangKey[]).map((lang) => (
                        <SectorTabButton
                          key={lang}
                          type="button"
                          active={activeAboutLang === lang}
                          onClick={() => setActiveAboutLang(lang)}
                        >
                          {lang === 'pt'
                            ? '🇧🇷 Português'
                            : lang === 'en'
                            ? '🇺🇸 English'
                            : '🇪🇸 Español'}
                        </SectorTabButton>
                      ))}
                    </StacksPickerGrid>

                    <FieldGroupGrid>
                      <FieldWrapper>
                        <Label>Título da Seção</Label>
                        <Input
                          value={textsState[activeAboutLang].about.title}
                          onChange={(e) =>
                            updateTextField(activeAboutLang, 'about', 'title', e.target.value)
                          }
                        />
                      </FieldWrapper>
                      <FieldWrapper>
                        <Label>Título Idiomas</Label>
                        <Input
                          value={textsState[activeAboutLang].about.languagesTitle}
                          onChange={(e) =>
                            updateTextField(
                              activeAboutLang,
                              'about',
                              'languagesTitle',
                              e.target.value
                            )
                          }
                        />
                      </FieldWrapper>
                      <FieldWrapper>
                        <Label>Texto Idiomas</Label>
                        <Input
                          value={textsState[activeAboutLang].about.languages}
                          onChange={(e) =>
                            updateTextField(activeAboutLang, 'about', 'languages', e.target.value)
                          }
                        />
                      </FieldWrapper>
                      <FieldWrapper>
                        <Label>Título Redes Sociais</Label>
                        <Input
                          value={textsState[activeAboutLang].about.socialTitle}
                          onChange={(e) =>
                            updateTextField(
                              activeAboutLang,
                              'about',
                              'socialTitle',
                              e.target.value
                            )
                          }
                        />
                      </FieldWrapper>
                      <FieldWrapper>
                        <Label>Descrição Redes Sociais</Label>
                        <Input
                          value={textsState[activeAboutLang].about.socialDesc}
                          onChange={(e) =>
                            updateTextField(
                              activeAboutLang,
                              'about',
                              'socialDesc',
                              e.target.value
                            )
                          }
                        />
                      </FieldWrapper>
                    </FieldGroupGrid>

                    <LangGrid>
                      <LangCard>
                        <LangCardHeader>Bloco 1 (Bio Principal)</LangCardHeader>
                        {(['p1', 'hl1', 'p2', 'hl2', 'p3', 'hl3', 'p4', 'hl4', 'p5'] as const).map(
                          (key) => (
                            <FieldWrapper key={key}>
                              <Label>
                                {key.startsWith('hl') ? `Destaque Vermelho (${key})` : `Texto (${key})`}
                              </Label>
                              <Input
                                value={textsState[activeAboutLang].about.block1[key]}
                                onChange={(e) =>
                                  updateAboutBlock(activeAboutLang, 'block1', key, e.target.value)
                                }
                              />
                            </FieldWrapper>
                          )
                        )}
                      </LangCard>

                      <LangCard>
                        <LangCardHeader>Bloco 2 (Stacks & Linux)</LangCardHeader>
                        {(['p1', 'hl1', 'p2', 'hl2', 'p3', 'hl3', 'p4', 'hl4', 'p5'] as const).map(
                          (key) => (
                            <FieldWrapper key={key}>
                              <Label>
                                {key.startsWith('hl') ? `Destaque Vermelho (${key})` : `Texto (${key})`}
                              </Label>
                              <Input
                                value={textsState[activeAboutLang].about.block2[key]}
                                onChange={(e) =>
                                  updateAboutBlock(activeAboutLang, 'block2', key, e.target.value)
                                }
                              />
                            </FieldWrapper>
                          )
                        )}
                      </LangCard>
                    </LangGrid>
                  </>
                )}

                {feedback && (
                  <FeedbackBanner variant={feedback.variant}>{feedback.message}</FeedbackBanner>
                )}

                <ModalFooter>
                  <PrimarySubmitButton type="submit" disabled={saving}>
                    <Save size={16} />
                    {saving ? 'Salvando...' : 'Salvar Alterações nos 3 Idiomas'}
                  </PrimarySubmitButton>
                </ModalFooter>
              </ModalBody>
            )}
          </ModalDialog>
        </ModalBackdrop>
      )}
    </>
  );
};