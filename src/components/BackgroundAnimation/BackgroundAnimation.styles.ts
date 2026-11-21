import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const floatOrbOne = keyframes`
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(60px, -40px) scale(1.08);
  }
  66% {
    transform: translate(-30px, 50px) scale(0.95);
  }
`;

const floatOrbTwo = keyframes`
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(-70px, -50px) scale(1.12);
  }
`;

const pulseLine = keyframes`
  0%, 100% {
    opacity: 0.25;
  }
  50% {
    opacity: 0.55;
  }
`;

export const BackdropContainer = styled.div`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
`;

export const SubtleGrid = styled.div`
  position: absolute;
  inset: 0;
  background-image: radial-gradient(${({ theme }) => theme.colors.primaryGlow} 1.2px, transparent 1.2px);
  background-size: 36px 36px;
  animation: ${pulseLine} 8s ease-in-out infinite;
`;

export const RedOrbTopLeft = styled.div`
  position: absolute;
  top: -120px;
  left: -120px;
  width: 480px;
  height: 480px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    ${({ theme }) => theme.colors.primaryGlow} 0%,
    transparent 70%
  );
  filter: blur(45px);
  animation: ${floatOrbOne} 18s ease-in-out infinite;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 300px;
    height: 300px;
  }
`;

export const RedOrbBottomRight = styled.div`
  position: absolute;
  bottom: -140px;
  right: -100px;
  width: 540px;
  height: 540px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    ${({ theme }) => theme.colors.primaryGlow} 0%,
    transparent 70%
  );
  filter: blur(55px);
  animation: ${floatOrbTwo} 22s ease-in-out infinite;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 320px;
    height: 320px;
  }
`;

export const RedOrbCenter = styled.div`
  position: absolute;
  top: 45%;
  left: 55%;
  width: 360px;
  height: 360px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    ${({ theme }) => theme.colors.primaryGlow} 0%,
    transparent 72%
  );
  filter: blur(60px);
  animation: ${floatOrbOne} 25s ease-in-out infinite reverse;
`;