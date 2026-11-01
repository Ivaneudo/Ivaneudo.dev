import styled from '@emotion/styled';

export const TechContainer = styled.div`
  display: flex;
  gap: 8px; /* Espaço entre os ícones das tecnologias */
  margin: 10px 0;
  color: white; /* ou a cor base que preferir */
`;

export const LinksContainer = styled.div`
  display: flex;
  gap: 16px; /* Espaço entre o ícone do Github e do Link */
  margin-top: 20px;
  
  a {
    transition: opacity 0.2s;
    &:hover {
      opacity: 0.7;
    }
  }
`;

export const Img = styled.img `
  width: 100%;
  max-width: 900px; /* Impede que fique gigante em telas super largas */
  height: auto;
  border-radius: 10px; /* Um leve arredondamento deixa o design mais polido */
  object-fit: cover;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    border-radius: 8px; /* Ajuste sutil para o celular */
  }
`;