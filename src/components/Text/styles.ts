import styled from "@emotion/styled";

export const TextSpan = styled.span `
  color: ${({theme}) => theme.colors.bold};
`;

export const Cargo = styled.h1 `
  color: ${({theme}) => theme.colors.text};
  font-size: ${({theme}) => theme.fontSizes.h1};
  font-family: ${({theme}) => theme.fonts.jetbrains};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 26px; /* Ajuste para caber em uma linha, ou deixe quebrar de forma mais natural */
  }
`;

export const TextH2 = styled.h2 `
  color: ${({theme}) => theme.colors.text};
  font-size: ${({theme}) => theme.fontSizes.h2};
  font-family: ${({theme}) => theme.fonts.jetbrains};
`;

export const Resumo = styled.p `
  color: ${({theme}) => theme.colors.text};
  font-size: ${({theme}) => theme.fontSizes.medium};
  font-family: ${({theme}) => theme.fonts.arial};
  font-weight: bold;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 16px; 
    line-height: 1.4;
  }
`;

export const Descricao = styled.p `
  color: ${({theme}) => theme.colors.text};
  font-size: ${({theme}) => theme.fontSizes.small};
  font-family: ${({theme}) => theme.fonts.arial};
  font-weight: bold;
  text-align: left; /* Garante alinhamento à esquerda */

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 15px; /* Tamanho confortável para leitura de textos longos no mobile */
    line-height: 1.5;
    font-weight: normal; /* Em parágrafos pequenos, normal melhora a legibilidade */
  }
`;

export const TituloProjeto = styled.p `
  color: ${({theme}) => theme.colors.bold};
  font-size: ${({theme}) => theme.fontSizes.medium};
  font-family: ${({theme}) => theme.fonts.jetbrains};
  text-align: left;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 20px;
    margin-bottom: 0.5rem;
  }
`;