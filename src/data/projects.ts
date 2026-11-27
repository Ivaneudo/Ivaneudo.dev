import type { StackItem } from './stacks';
import projectsJson from './projects.json';
import type { TranslationSchema } from '../contexts/useLanguage';

export type ProjectTranslationKey = Exclude<keyof TranslationSchema['projects'], 'title'>;

export interface ProjectItem {
  id: ProjectTranslationKey;
  title: string;
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  stacks: StackItem[];
}

export const PROJECTS_DATA: ProjectItem[] = projectsJson as ProjectItem[];