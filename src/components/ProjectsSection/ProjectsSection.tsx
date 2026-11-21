import React from 'react';
import { PROJECTS_DATA } from '../../data/projects';
import { useLanguage } from '../../contexts/LanguageContext';
import { ProjectCard } from '../ProjectCard/ProjectCard';
import {
  ProjectsContainer,
  ProjectsGrid,
  SectionHeadingWrapper,
  SectionTitle,
} from './ProjectsSection.styles';

export const ProjectsSection: React.FC = () => {
  const { t } = useLanguage();

  const projectsWithPhoto = PROJECTS_DATA.filter((project) => Boolean(project.image));

  return (
    <ProjectsContainer id="projects">
      <SectionHeadingWrapper>
        <SectionTitle>{t.projects.title}</SectionTitle>
      </SectionHeadingWrapper>

      <ProjectsGrid>
        {projectsWithPhoto.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </ProjectsGrid>
    </ProjectsContainer>
  );
};