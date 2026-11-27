import React, { useState } from 'react';
import { STACKS_DATA } from '../../data/stacks';
import { useLanguage } from '../../contexts/useLanguage';
import {
  AvatarFallback,
  AvatarFrame,
  AvatarImage,
  HeroContainer,
  RoleHighlight,
  RoleTitle,
  StackBadge,
  StackIcon,
  StacksList,
  SummarySubtitle,
} from './HeroSection.styles';

export const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const [imgError, setImgError] = useState(false);

  return (
    <HeroContainer id="home">
      <AvatarFrame>
        {!imgError ? (
          <AvatarImage
            src="https://github.com/Ivaneudo.png"
            alt="Ivaneudo C. Rocha"
            onError={() => setImgError(true)}
          />
        ) : (
          <AvatarFallback>IR</AvatarFallback>
        )}
      </AvatarFrame>

      <RoleTitle>
        {t.home.rolePrefix}
        <RoleHighlight>{t.home.roleHighlight}</RoleHighlight>
        {t.home.roleSuffix}
      </RoleTitle>

      <SummarySubtitle>{t.home.summary}</SummarySubtitle>

      <StacksList>
        {STACKS_DATA.map((stack) => (
          <StackBadge key={stack.id} title={stack.alt}>
            <StackIcon src={stack.src} alt={stack.alt} loading="lazy" />
          </StackBadge>
        ))}
      </StacksList>
    </HeroContainer>
  );
};