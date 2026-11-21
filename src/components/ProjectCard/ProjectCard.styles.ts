import styled from '@emotion/styled';

export const CardArticle = styled.article`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
  border-radius: 18px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.colors.shadow};
  backdrop-filter: blur(10px);
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-6px);
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.colors.shadowHover};
  }
`;

export const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.codeBg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
`;

export const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;

  article:hover & {
    transform: scale(1.04);
  }
`;

export const CardBody = styled.div`
  padding: 22px;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 14px;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;

export const ProjectTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.jetbrains};
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.3;
`;

export const ActionLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;

export const IconLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 9px;
  background-color: ${({ theme }) => theme.colors.codeBg};
  border: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    color: #ffffff;
  }
`;

export const ProjectStacks = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
`;

export const SmallStackIcon = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.15);
  }
`;

export const ProjectDescription = styled.p`
  font-size: 15px;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.textMuted};
  flex: 1;
`;