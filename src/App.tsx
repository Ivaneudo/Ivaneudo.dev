import React from 'react';
import { Global } from '@emotion/react';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { GlobalStyle } from './styles/GlobalStyle';
import { BackgroundAnimation } from './components/BackgroundAnimation/BackgroundAnimation';
import { Navbar } from './components/Navbar/Navbar';
import { HeroSection } from './components/HeroSection/HeroSection';
import { ProjectsSection } from './components/ProjectsSection/ProjectsSection';
import { AboutSection } from './components/AboutSection/AboutSection';
import { Footer } from './components/Footer/Footer';

export const App: React.FC = () => {
  return (
    <ThemeContextProvider>
      <LanguageProvider>
        <Global styles={GlobalStyle} />
        <BackgroundAnimation />
        <Navbar />
        <main>
          <HeroSection />
          <ProjectsSection />
          <AboutSection />
        </main>
        <Footer />
      </LanguageProvider>
    </ThemeContextProvider>
  );
};

export default App;