import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ListNav } from '../../components/navList';
import { Nome } from '../../components/nomeUser';
import { LanguageSwitcher } from '../../components/LanguageSwitcher';
import * as S from './styles';

export const NavBar = () => {
  const { t } = useTranslation();
  const [activeLink, setActiveLink] = useState('#home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { label: t('nav.home'), href: '#home' },
    { label: t('nav.projects'), href: '#projetos' },
    { label: t('nav.about'), href: '#sobre-mim' },
  ];

  const handleLinkClick = (href: string) => {
    setActiveLink(href);
    setIsMenuOpen(false);
  };

  return (
    <S.navDiv>
      <Nome nome="Ivaneudo" sobrenome="C. Rocha" />

      {/* Botão visível apenas no mobile */}
      <S.HamburgerButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? '✕' : '☰'}
      </S.HamburgerButton>

      <S.navList isOpen={isMenuOpen}>
        {links.map((link) => (
          <ListNav
            key={link.href}
            href={link.href}
            isActive={activeLink === link.href}
            onClick={() => handleLinkClick(link.href)}
          >
            {link.label}
          </ListNav>
        ))}
        
        {/* Seletor de Idiomas inserido na NavBar */}
        <S.SwitcherWrapper>
          <LanguageSwitcher />
        </S.SwitcherWrapper>
      </S.navList>
    </S.navDiv>
  );
};