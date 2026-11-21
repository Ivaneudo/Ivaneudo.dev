import styled from '@emotion/styled';

export const AboutContainer = styled.section`
  position: relative;
  z-index: 1;
  max-width: 1000px;
  margin: 0 auto;
  padding: 88px 24px 100px;
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

export const AboutContentCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
  border-radius: 20px;
  padding: 36px;
  box-shadow: ${({ theme }) => theme.colors.shadow};
  backdrop-filter: blur(12px);
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 24px 20px;
    gap: 20px;
  }
`;

export const BioParagraph = styled.p`
  font-size: 18px;
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 16px;
  }
`;

export const RedHighlight = styled.strong`
  color: ${({ theme }) => theme.colors.bold};
  font-weight: 700;
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
`;

export const InfoMetaBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const MetaTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.jetbrains};
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const MetaText = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.6;
`;

export const SocialRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 8px;
`;

export const SocialButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.codeBg};
  border: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
  font-family: ${({ theme }) => theme.fonts.jetbrains};
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.22s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primary};
    color: #ffffff;
    transform: translateY(-2px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    justify-content: center;
  }
`;