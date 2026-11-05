import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Blocos = styled.div`
  width: 100%;
  padding: 1rem 0;
  display: flex;
  gap: 2rem; 

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    padding: 0; 
    gap: 1.5rem;
  }
`;

export const Bloco = styled.div`
  width: 100%;
  flex: 1;
  padding: 2rem;
  text-align: justify;
  
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  
  animation: ${fadeUp} 0.6s ease-out forwards;

  &:nth-of-type(2) {
    animation-delay: 0.2s;
    opacity: 0;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    border-color: ${({ theme }) => theme.colors.bold};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 1.5rem; 
    border-radius: 12px;
    
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
`;