import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Paintbrush } from 'lucide-react';
import { ListNav } from '../../components/navList';
import { Nome } from '../../components/nomeUser';
import { LanguageSwitcher } from '../../components/LanguageSwitcher';
import * as S from './styles';

interface NavBarProps {
  onToggleTheme: () => void;
  isDark?: boolean; // Usado para mudar o 'title' do botão
}

export const NavBar = ({ onToggleTheme, isDark }: NavBarProps) => {
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
        
        <S.SwitcherWrapper>
          <LanguageSwitcher />
          
          {/* Botão padronizado com o seu outro projeto */}
          <S.IconButton 
            onClick={onToggleTheme} 
            title={isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
          >
            <Paintbrush size={30} />
          </S.IconButton>
        </S.SwitcherWrapper>

      </S.navList>
    </S.navDiv>
  );
};