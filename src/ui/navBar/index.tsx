import { useState } from 'react';
import { ListNav } from '../../components/navList';
import { Nome } from '../../components/nomeUser';
import * as S from './styles';

export const NavBar = () => {
  const [activeLink, setActiveLink] = useState('#home');
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Controle do menu mobile

  const links = [
    { label: 'Início',    href: '#home' },
    { label: 'Projetos',  href: '#projetos' },
    { label: 'Sobre mim', href: '#sobre-mim' },
  ];

  const handleLinkClick = (href: string) => {
    setActiveLink(href);
    setIsMenuOpen(false); // Fecha o menu no mobile após clicar
  };

  return (
    <S.navDiv>
      <Nome nome="Ivaneudo" sobrenome="C. Rocha"/>

      {/* Botão visível apenas no mobile */}
      <S.HamburgerButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? '✕' : '☰'}
      </S.HamburgerButton>

      {/* Passamos o estado isOpen para o CSS saber quando mostrar a lista */}
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
      </S.navList>
    </S.navDiv>
  )
}