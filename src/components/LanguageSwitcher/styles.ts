import styled from "@emotion/styled";

interface MenuProps {
  isOpen: boolean;
}

interface MenuItemProps {
  isActive: boolean;
}

export const Container = styled.div`
  position: relative;
  display: inline-block;
`;

export const TriggerButton = styled.button`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.jetbrains};
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: ${({ theme }) => theme.colors.bold};
    color: ${({ theme }) => theme.colors.bold};
  }
`;

export const DropdownMenu = styled.ul<MenuProps>`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  padding: 4px 0;
  margin: 0;
  list-style: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  z-index: 1001;
  min-width: 120px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    position: relative; /* Deixa de ser flutuante e empurra o conteúdo */
    top: 8px;
    right: auto;
    width: 100%;
    box-shadow: none;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }
`;

export const MenuItem = styled.li<MenuItemProps>`
  padding: 8px 16px;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.jetbrains};
  font-size: 0.875rem;
  color: ${({ theme, isActive }) => (isActive ? theme.colors.bold : theme.colors.text)};
  font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    text-align: center; /* Centraliza os idiomas no mobile */
    padding: 12px 16px; /* Aumenta a área de clique */
  }
`;