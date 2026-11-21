import styled from '@emotion/styled';

export const ProjectsContainer = styled.section`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 88px 24px;
  scroll-margin-top: 72px;
`;

export const SectionHeadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 48px;
  text-align: center;
`;

export const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.jetbrains};
  font-size: ${({ theme }) => theme.fontSizes.h2};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  position: relative;
  padding-bottom: 12px;

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: 64px;
    height: 4px;
    border-radius: 999px;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 28px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 22px;
  }
`;