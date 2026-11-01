import styled from "@emotion/styled";

export const userDiv = styled.div `
  background-color: transparent;
  display: flex;
  padding: 1rem;
`;

export const userName = styled.h1 `
  color: ${({theme}) => theme.colors.text};
  font-size: ${({theme}) => theme.fontSizes.h1};
  font-family: ${({theme}) => theme.fonts.jetbrains};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 22px; /* Reduz drasticamente para o celular */
    white-space: nowrap; /* Tenta forçar a ficar na mesma linha se houver espaço */
  }
`;