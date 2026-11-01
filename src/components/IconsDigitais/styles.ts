import styled from "@emotion/styled";

export const IconsDig = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain; 
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 45px !important;
    height: 45px !important;
    min-width: 45px;
    min-height: 45px;
    aspect-ratio: 1 / 1; 
  }
`;