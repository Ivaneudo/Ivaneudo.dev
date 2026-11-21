export interface StackItem {
  id: string;
  alt: string;
  src: string;
}

export const STACKS_DATA: StackItem[] = [
  { id: 'react', alt: 'react', src: 'https://skillicons.dev/icons?i=react' },
  { id: 'emotion', alt: 'emotion', src: 'https://skillicons.dev/icons?i=emotion' },
  {
    id: 'quarkus',
    alt: 'quarkus',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/quarkus/quarkus-original.svg',
  },
  { id: 'spring', alt: 'springboot', src: 'https://skillicons.dev/icons?i=spring' },
  { id: 'postgres', alt: 'postgreSQL', src: 'https://skillicons.dev/icons?i=postgres' },
  { id: 'docker', alt: 'docker', src: 'https://skillicons.dev/icons?i=docker' },
  { id: 'arch', alt: 'arch', src: 'https://skillicons.dev/icons?i=arch' },
  { id: 'git', alt: 'git', src: 'https://skillicons.dev/icons?i=git' },
];