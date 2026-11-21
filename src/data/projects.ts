import type { StackItem } from './stacks';

export type ProjectTranslationKey =
  | 'raizes'
  | 'ivaneandome'
  | 'limpo'
  | 'ficaComigo'
  | 'arch';

export interface ProjectItem {
  id: ProjectTranslationKey;
  title: string;
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  stacks: StackItem[];
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'raizes',
    title: 'Movimento Vera Criança',
    image: '/images/projects/raizes.png',
    liveUrl: 'https://movimentoveracrianca.vercel.app/',
    githubUrl: 'https://github.com/veracrianca/movimento',
    stacks: [
      { id: 'react', alt: 'React', src: 'https://skillicons.dev/icons?i=react' },
      { id: 'ts', alt: 'TypeScript', src: 'https://skillicons.dev/icons?i=ts' },
      { id: 'tailwind', alt: 'Tailwind CSS', src: 'https://skillicons.dev/icons?i=tailwind' },
    ],
  },
  {
    id: 'ivaneandome',
    title: 'Ivaneando.me',
    image: '/images/projects/ivaneandome.png',
    liveUrl: 'https://ivaneandome.vercel.app/',
    githubUrl: 'https://github.com/Ivaneudo/Ivaneando.me',
    stacks: [
      { id: 'react', alt: 'React', src: 'https://skillicons.dev/icons?i=react' },
      { id: 'nextjs', alt: 'Next.js', src: 'https://skillicons.dev/icons?i=nextjs' },
      { id: 'tailwind', alt: 'Tailwind CSS', src: 'https://skillicons.dev/icons?i=tailwind' },
    ],
  },
  {
    id: 'limpo',
    title: 'Limpo Serviços',
    image: '/images/projects/limpo.png',
    liveUrl: 'https://limpo.vercel.app/',
    githubUrl: 'https://github.com/Ivaneudo/Limpo',
    // Sem liveUrl -> o ícone de link externo não será exibido
    stacks: [
      { id: 'angular', alt: 'Angular', src: 'https://skillicons.dev/icons?i=angular' },
      { id: 'ts', alt: 'TypeScript', src: 'https://skillicons.dev/icons?i=ts' },
    ],
  },
  {
    id: 'ficaComigo',
    title: 'Fica Comigo',
    image: '/images/projects/fica-comigo.png',
    githubUrl: 'https://github.com/Ivaneudo/fica-comigo',
    stacks: [
      { id: 'react', alt: 'React', src: 'https://skillicons.dev/icons?i=react' },
      { id: 'spring', alt: 'Spring Boot', src: 'https://skillicons.dev/icons?i=spring' },
      { id: 'postgres', alt: 'PostgreSQL', src: 'https://skillicons.dev/icons?i=postgres' },
    ],
  },
  {
    id: 'arch',
    title: 'Arch Linux & Hyprland Dotfiles',
    image: '/images/projects/arch.png',
    githubUrl: 'https://github.com/Ivaneudo/Arch-Hyprland',
    stacks: [
      { id: 'arch', alt: 'Arch Linux', src: 'https://skillicons.dev/icons?i=arch' },
      { id: 'linux', alt: 'Linux', src: 'https://skillicons.dev/icons?i=linux' },
      { id: 'bash', alt: 'Bash', src: 'https://skillicons.dev/icons?i=bash' },
    ],
  },
];