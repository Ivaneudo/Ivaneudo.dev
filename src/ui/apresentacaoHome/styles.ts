// ./apresentacaoHome/styles.ts
import styled from "@emotion/styled";

export const HomeDiv = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  gap: 1rem;
  width: 100%;
  max-width: 650px; 
`;

export const Avatar = styled.img`
  width: 250px; /* Tamanho base da foto */
  height: 250px;
  border-radius: 50%; /* Garante que fique redonda */
  object-fit: cover;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 200px; /* Reduz levemente no celular */
    height: 200px;
  }
`;

export const StacksDiv = styled.div`
  width: 100%;
  gap: 1rem;
  display: flex; 
  align-items: center;
  justify-content: center;
  padding: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem; 
    align-items: center;    
    justify-items: center;  
    padding: 0 1rem;
    
    a {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;