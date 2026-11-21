import React from 'react';
import { FooterHighlight, FooterText, FooterWrapper } from './Footer.styles';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterWrapper>
      <FooterText>
        © {currentYear} Ivaneudo <FooterHighlight>C. Rocha</FooterHighlight>
      </FooterText>
    </FooterWrapper>
  );
};