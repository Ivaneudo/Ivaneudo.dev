import { useState, useEffect } from "react";
import { ThemeProvider, Global } from "@emotion/react";
import { darkTheme, lightTheme } from "./Layout/GlobalTheme";
import { GlobalStyle } from "./Layout/GlobalStyle";
import * as S from "../src/components/conteiner/styles";
import { Home } from "./page/home";
import { Projetos } from "./page/projeto";
import { SobreMim } from "./page/sobre-mim";
import { NavBar } from "./ui/navBar";

export const App = () => {
  // Verifica no navegador se o usuário já escolheu um tema antes; se não, o padrão é true (dark)
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    return savedTheme === 'light' ? false : true;
  });

  // Função que inverte o estado do tema
  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  // Toda vez que isDark mudar, salva a escolha no navegador
  useEffect(() => {
    localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  // Define qual objeto de tema usar com base no estado
  const currentTheme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      {/* O GlobalStyle agora recebe o tema como parâmetro */}
      <Global styles={GlobalStyle(currentTheme)} />
      
      <S.conteinerGlobal>
        <NavBar onToggleTheme={toggleTheme} isDark={isDark} />
        <Home/>
        <Projetos/>
        <SobreMim/>
      </S.conteinerGlobal>
    </ThemeProvider>
  )
}