import styled from '@emotion/styled';

interface HeaderWrapperProps {
  isVisible: boolean;
  isScrolled: boolean;
}

export const HeaderWrapper = styled('header', {
  shouldForwardProp: (prop) => prop !== 'isVisible' && prop !== 'isScrolled',
})<HeaderWrapperProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.navbarBg};
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid
    ${({ isScrolled, theme }) => (isScrolled ? theme.colors.surfaceBorder : 'transparent')};
  box-shadow: ${({ isScrolled, theme }) => (isScrolled ? theme.colors.shadowSm : 'none')};
  transform: ${({ isVisible }) => (isVisible ? 'translateY(0)' : 'translateY(-100%)')};
  transition:
    transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
    background-color 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
`;

export const NavContainer = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

export const BrandLink = styled.a`
  font-family: ${({ theme }) => theme.fonts.jetbrains};
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 18px;
  }
`;

export const BrandHighlight = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

export const RightControls = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

export const SectionList = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const SectionLink = styled.a`
  font-family: ${({ theme }) => theme.fonts.jetbrains};
  font-size: 15px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textMuted};
  position: relative;
  padding: 4px 0;
  transition: color 0.2s ease;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 0;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.primary};
    transition: width 0.25s ease;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }

  &:hover::after {
    width: 100%;
  }
`;

export const UtilityGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding-left: 16px;
  border-left: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
`;

export const LanguageMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
  border-radius: 10px;
  padding: 4px;
`;

export const LanguageButton = styled('button', {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>`
  font-family: ${({ theme }) => theme.fonts.jetbrains};
  font-size: 12px;
  font-weight: 700;
  padding: 5px 8px;
  border-radius: 7px;
  color: ${({ active, theme }) => (active ? '#FFFFFF' : theme.colors.textMuted)};
  background-color: ${({ active, theme }) => (active ? theme.colors.primary : 'transparent')};
  transition: all 0.2s ease;

  &:hover {
    color: ${({ active, theme }) => (active ? '#FFFFFF' : theme.colors.text)};
  }
`;

export const ThemeToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-1px);
  }
`;

export const MobileMenuTrigger = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: flex;
  }
`;

export const MobileDrawer = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isOpen',
})<{ isOpen: boolean }>`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    gap: 18px;
    padding: 20px 24px 24px;
    background-color: ${({ theme }) => theme.colors.backgroundSecondary};
    border-top: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
  }
`;

export const MobileSectionList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const MobileUtilityRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 14px;
  border-top: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
`;