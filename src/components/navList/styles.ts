import styled from "@emotion/styled";

interface NavLinkProps {
  isActive?: boolean;
}

export const navList = styled.ul`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 1.5rem;
  
  list-style: none;
  padding: 0; 
  margin: 0;

`;

export const navItem = styled.li`
  list-style: none !important;
  list-style-type: none !important;
  margin: 0;
  padding: 0;
`;

export const navLink = styled.a<NavLinkProps>`
  color: ${({ theme, isActive }) => isActive ? theme.colors.bold : theme.colors.text};
  text-decoration: none;
  
  font-weight: bold;
  font-family: ${({ theme }) => theme.fonts.jetbrains};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  
  display: flex; 
  align-items: center;
  gap: 1rem;
  height: 100%;
  cursor: pointer; 

  &:active {
    color: ${({ theme }) => theme.colors.bold};
  }
`;