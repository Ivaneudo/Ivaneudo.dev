import styled from '@emotion/styled';

export const FooterWrapper = styled.footer`
  position: relative;
  z-index: 1;
  border-top: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
  background-color: ${({ theme }) => theme.colors.navbarBg};
  padding: 24px;
  text-align: center;
`;

export const FooterText = styled.p`
  font-family: ${({ theme }) => theme.fonts.jetbrains};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const FooterHighlight = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
`;