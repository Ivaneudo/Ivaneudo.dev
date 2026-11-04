import styled from "@emotion/styled";

interface NavListProps {
  isOpen: boolean;
}

export const navDiv = styled.div`
  width: 100%;
  padding: 1rem 2rem;
  border: 1px solid ${({theme}) => theme.colors.border};
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 10px; 
  z-index: 999;
  background-color: ${({ theme }) => theme.colors.background};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 1rem;
    border-radius: 0; 
    top: 0; 
    border-left: none;
    border-right: none;
    border-top: none;
  }
`;

export const HamburgerButton = styled.button`
  display: none; 
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.bold};
  font-size: 2rem;
  cursor: pointer;
  z-index: 1000;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: block; 
  }
`;

export const navList = styled.ul<NavListProps>`
  display: flex;
  align-items: center; 
  gap: 1.5rem;
  list-style: none;
  padding: 0; 
  margin: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.background};
    max-height: ${({ isOpen }) => (isOpen ? '500px' : '0')};
    padding: ${({ isOpen }) => (isOpen ? '2rem 0' : '0')};
    overflow: hidden;
    transition: max-height 0.3s ease, padding 0.3s ease;
    
    border-bottom: none; 
    border-radius: 0 0 20px 20px;
  }
`;

export const SwitcherWrapper = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
`;