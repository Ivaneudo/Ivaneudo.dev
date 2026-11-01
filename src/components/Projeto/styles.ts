import styled from '@emotion/styled';

export const TechContainer = styled.div`
  display: flex;
  gap: 8px; 
  margin: 10px 0;
  color: white; 
`;

export const LinksContainer = styled.div`
  display: flex;
  gap: 16px; 
  margin-top: 20px;
  
  a {
    transition: opacity 0.2s;
    &:hover {
      opacity: 0.7;
    }
  }
`;

export const Img = styled.img `
  width: 900px;
  border-radius: 10px; 
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    max-width: 900px; /* Impede que fique gigante em telas super largas */
    height: auto;
    border-radius: 10px; /* Um leve arredondamento deixa o design mais polido */
    object-fit: cover;
    border-radius: 8px; /* Ajuste sutil para o celular */
  }
`;