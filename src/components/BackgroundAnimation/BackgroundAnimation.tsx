import React from 'react';
import {
  BackdropContainer,
  RedOrbBottomRight,
  RedOrbCenter,
  RedOrbTopLeft,
  SubtleGrid,
} from './BackgroundAnimation.styles';

export const BackgroundAnimation: React.FC = () => {
  return (
    <BackdropContainer aria-hidden="true">
      <SubtleGrid />
      <RedOrbTopLeft />
      <RedOrbCenter />
      <RedOrbBottomRight />
    </BackdropContainer>
  );
};