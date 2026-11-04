import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './styles';

const languages = [
  { code: 'pt', label: 'Português', short: 'PT' },
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'es', label: 'Español', short: 'ES' },
];

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  const currentLang = languages.find((lang) => i18n.language?.startsWith(lang.code)) || languages[0];

  return (
    <S.Container ref={containerRef}>
      <S.TriggerButton onClick={() => setIsOpen(!isOpen)} aria-label="Selecionar idioma">
        🌐 {currentLang.short}
      </S.TriggerButton>
      <S.DropdownMenu isOpen={isOpen}>
        {languages.map((lang) => (
          <S.MenuItem
            key={lang.code}
            isActive={currentLang.code === lang.code}
            onClick={() => handleLanguageChange(lang.code)}
          >
            {lang.label}
          </S.MenuItem>
        ))}
      </S.DropdownMenu>
    </S.Container>
  );
};