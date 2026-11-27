import type { StackItem } from './stacks';
import type { TranslationSchema } from '../contexts/LanguageContext';
import projectsJson from './projects.json';

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