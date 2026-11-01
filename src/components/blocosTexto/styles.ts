import styled from "@emotion/styled";

export const Blocos = styled.div `
  width: 100%;
  padding: 1rem;
  display: flex;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    padding: 0; 
    gap: 1rem;
  }
`;

export const Bloco = styled.div `
  width: 100%;
  padding: 1rem;
  text-align: justify;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0; 
    text-align: justify;
  }
`;