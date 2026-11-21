import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const HeroContainer = styled.section`
  position: relative;
  z-index: 1;
  min-height: 100vh;
  max-width: 1000px;
  margin: 0 auto;
  padding: 112px 24px 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  scroll-margin-top: 72px;
  animation: ${fadeUp} 0.7s ease-out;
`;

export const AvatarFrame = styled.div`
  width: 196px;
  height: 196px;
  border-radius: 50%;
  padding: 4px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, transparent 75%);
  box-shadow: ${({ theme }) => theme.colors.shadow};
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 160px;
    height: 160px;
  }
`;

export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${({ theme }) => theme.colors.background};
`;

export const AvatarFallback = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.colors.background};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.jetbrains};
  font-size: 48px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RoleTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.jetbrains};
  font-size: ${({ theme }) => theme.fontSizes.h1};
  font-weight: 800;
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 18px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 28px;
  }
`;

export const RoleHighlight = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

export const SummarySubtitle = styled.p`
  max-width: 720px;
  font-size: ${({ theme }) => theme.fontSizes.small};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 40px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 17px;
    margin-bottom: 32px;
  }
`;

export const StacksList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 16px;
  max-width: 680px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 12px;
  }
`;

export const StackBadge = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
  box-shadow: ${({ theme }) => theme.colors.shadowSm};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.colors.shadowHover};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 48px;
    height: 48px;
  }
`;

export const StackIcon = styled.img`
  width: 34px;
  height: 34px;
  object-fit: contain;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 28px;
    height: 28px;
  }
`;