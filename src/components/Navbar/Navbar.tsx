import React, { useEffect, useRef, useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useLanguage, type LanguageCode } from '../../contexts/LanguageContext';
import { useThemeMode } from '../../contexts/ThemeContext';
import {
  BrandHighlight,
  BrandLink,
  HeaderWrapper,
  LanguageButton,
  LanguageMenu,
  MobileDrawer,
  MobileMenuTrigger,
  MobileSectionList,
  MobileUtilityRow,
  NavContainer,
  RightControls,
  SectionLink,
  SectionList,
  ThemeToggleButton,
  UtilityGroup,
} from './Navbar.styles';

const LANGUAGES: { code: LanguageCode; label: string }[] = [
  { code: 'pt', label: 'PT' },
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
];

export const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { themeMode, toggleTheme } = useThemeMode();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      if (mobileMenuOpen) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      if (currentScrollY <= 80) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      const diff = currentScrollY - lastScrollY.current;

      if (diff > 8) {
        setIsVisible(false);
        lastScrollY.current = currentScrollY;
      } else if (diff < -6) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  const navItems = [
    { href: '#home', label: t.nav.home },
    { href: '#projects', label: t.nav.projects },
    { href: '#about', label: t.nav.about },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <HeaderWrapper isVisible={isVisible} isScrolled={isScrolled}>
      <NavContainer>
        <BrandLink href="#home" onClick={handleLinkClick}>
          Ivaneudo <BrandHighlight>C. Rocha</BrandHighlight>
        </BrandLink>

        <RightControls>
          <SectionList>
            {navItems.map((item) => (
              <li key={item.href}>
                <SectionLink href={item.href}>{item.label}</SectionLink>
              </li>
            ))}
          </SectionList>

          <UtilityGroup>
            <LanguageMenu role="group" aria-label="Language selector">
              {LANGUAGES.map((lang) => (
                <LanguageButton
                  key={lang.code}
                  type="button"
                  active={language === lang.code}
                  onClick={() => setLanguage(lang.code)}
                >
                  {lang.label}
                </LanguageButton>
              ))}
            </LanguageMenu>

            <ThemeToggleButton
              type="button"
              onClick={toggleTheme}
              aria-label={themeMode === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              title={themeMode === 'dark' ? 'Light mode' : 'Dark mode'}
            >
              {themeMode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </ThemeToggleButton>
          </UtilityGroup>
        </RightControls>

        <MobileMenuTrigger
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </MobileMenuTrigger>
      </NavContainer>

      <MobileDrawer isOpen={mobileMenuOpen}>
        <MobileSectionList>
          {navItems.map((item) => (
            <li key={item.href}>
              <SectionLink href={item.href} onClick={handleLinkClick}>
                {item.label}
              </SectionLink>
            </li>
          ))}
        </MobileSectionList>

        <MobileUtilityRow>
          <LanguageMenu role="group" aria-label="Language selector">
            {LANGUAGES.map((lang) => (
              <LanguageButton
                key={lang.code}
                type="button"
                active={language === lang.code}
                onClick={() => setLanguage(lang.code)}
              >
                {lang.label}
              </LanguageButton>
            ))}
          </LanguageMenu>

          <ThemeToggleButton
            type="button"
            onClick={toggleTheme}
            aria-label={themeMode === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {themeMode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </ThemeToggleButton>
        </MobileUtilityRow>
      </MobileDrawer>
    </HeaderWrapper>
  );
};