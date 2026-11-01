import styled from "@emotion/styled";

export const conteinerGlobal = styled.div `
  width: 100%; /* Corrigido de 100vw */
  min-height: 100vh;
  margin: 0;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${({theme}) => theme.colors.background};
`;

export const containerSection = styled.div `
  width: 100%; /* Corrigido de 100vw */
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const Div = styled.div `
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 5rem;
  padding: 1rem;
  gap: 2rem;
`;

export const Projetos = styled.div `
  display: flex;
  padding: 1rem 2rem;
  gap: 1rem;
`;

export const Redes = styled.div `
  display: flex;
  gap: 1rem;
`;