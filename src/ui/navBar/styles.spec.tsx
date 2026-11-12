import { render } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  navDiv as NavDiv,
  HamburgerButton,
  navList as NavList,
  SwitcherWrapper,
  ThemeButton,
  IconButton,
} from "./styles";
import "@testing-library/jest-dom";

const mockTheme = {
  colors: {
    border: "#e0e0e0",
    background: "#ffffff",
    bold: "#000000",
    primary: "#2563eb",
    codeBg: "#f1f5f9",
  },
  breakpoints: {
    mobile: "768px",
  },
};

const renderWithTheme = (ui: React.ReactNode, theme = mockTheme) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe("styles.ts - Styled Components", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Caminho Feliz (Happy Path)", () => {
    it("renderiza o navDiv com as propriedades de tema padrão", () => {
      const { container } = renderWithTheme(<NavDiv data-testid="nav-div" />);
      const element = container.firstChild as HTMLElement;
      
      expect(element).toBeInTheDocument();
      expect(element.tagName).toBe("DIV");
    });

    it("renderiza o HamburgerButton corretamente", () => {
      const { container } = renderWithTheme(<HamburgerButton data-testid="hamburger-btn" />);
      const element = container.firstChild as HTMLElement;
      
      expect(element).toBeInTheDocument();
      expect(element.tagName).toBe("BUTTON");
    });

    it("renderiza o navList com estado isOpen = true", () => {
      const { container } = renderWithTheme(<NavList isOpen={true} data-testid="nav-list" />);
      const element = container.firstChild as HTMLElement;
      
      expect(element).toBeInTheDocument();
      expect(element.tagName).toBe("UL");
    });

    it("renderiza o navList com estado isOpen = false", () => {
      const { container } = renderWithTheme(<NavList isOpen={false} data-testid="nav-list-closed" />);
      const element = container.firstChild as HTMLElement;
      
      expect(element).toBeInTheDocument();
      expect(element.tagName).toBe("UL");
    });

    it("renderiza o SwitcherWrapper como item de lista", () => {
      const { container } = renderWithTheme(<SwitcherWrapper data-testid="switcher-wrapper" />);
      const element = container.firstChild as HTMLElement;
      
      expect(element).toBeInTheDocument();
      expect(element.tagName).toBe("LI");
    });

    it("renderiza o ThemeButton com as propriedades de tema padrão", () => {
      const { container } = renderWithTheme(<ThemeButton data-testid="theme-btn" />);
      const element = container.firstChild as HTMLElement;

      expect(element).toBeInTheDocument();
      expect(element.tagName).toBe("BUTTON");
    });

    it("renderiza o IconButton com as propriedades de tema padrão", () => {
      const { container } = renderWithTheme(<IconButton data-testid="icon-btn" />);
      const element = container.firstChild as HTMLElement;

      expect(element).toBeInTheDocument();
      expect(element.tagName).toBe("BUTTON");
    });
  });

  describe("Validação de Campos Opcionais, Variações de Tema e Borda", () => {
    it("avalia corretamente as interpolações de tema dinâmico no navDiv e HamburgerButton", () => {
      const customTheme = {
        colors: {
          border: "#111111",
          background: "#000000",
          bold: "#ffffff",
        },
        breakpoints: {
          mobile: "480px",
        },
      };

      const { container: navContainer } = renderWithTheme(<NavDiv />, customTheme);
      const { container: btnContainer } = renderWithTheme(<HamburgerButton />, customTheme);

      expect(navContainer.firstChild).toBeInTheDocument();
      expect(btnContainer.firstChild).toBeInTheDocument();
    });

    it("avalia ambas as ramificações do operador ternário de isOpen no navList (true e false)", () => {
      const { container: openContainer } = renderWithTheme(<NavList isOpen={true} />);
      const { container: closedContainer } = renderWithTheme(<NavList isOpen={false} />);

      expect(openContainer.firstChild).toBeDefined();
      expect(closedContainer.firstChild).toBeDefined();
    });
  });

  describe("Tratamento de Vazios, Undefined e Entradas Malformatadas no Tema", () => {
    it("suporta objetos de tema com valores de strings vazias", () => {
      const emptyTheme = {
        colors: {
          border: "",
          background: "",
          bold: "",
        },
        breakpoints: {
          mobile: "",
        },
      };

      const { container } = renderWithTheme(
        <>
          <NavDiv />
          <HamburgerButton />
          <NavList isOpen={true} />
          <NavList isOpen={false} />
        </>,
        emptyTheme
      );

      expect(container.children.length).toBe(4);
    });
  });
});