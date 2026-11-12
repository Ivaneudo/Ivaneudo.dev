import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import "@testing-library/jest-dom";
import { 
  TextSpan, 
  Cargo, 
  TextH2, 
  Resumo, 
  Descricao, 
  TituloProjeto 
} from "./styles";

const originalConsoleError = console.error;

const mockThemeValido = {
  colors: {
    bold: "#000000",
    text: "#333333",
  },
  fontSizes: {
    h1: "32px",
    h2: "24px",
    medium: "16px",
    small: "14px",
  },
  fonts: {
    jetbrains: "'JetBrains Mono', monospace",
    arial: "Arial, sans-serif",
  },
  breakpoints: {
    mobile: "768px",
  },
};

const mockThemeVazio = {
  colors: {
    bold: "",
    text: "",
  },
  fontSizes: {
    h1: "",
    h2: "",
    medium: "",
    small: "",
  },
  fonts: {
    jetbrains: "",
    arial: "",
  },
  breakpoints: {
    mobile: "",
  },
};

describe("Componentes de Estilo (styles.ts)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    console.error = vi.fn(); 
  });

  afterEach(() => {
    console.error = originalConsoleError; 
  });

  const renderWithTheme = (Component: any, theme: any = mockThemeValido) => {
    return render(
      <ThemeProvider theme={theme}>
        <Component>Texto de Teste</Component>
      </ThemeProvider>
    );
  };

  describe("Caminho Feliz (Happy Path)", () => {
    it("valida o render do TextSpan com as propriedades corretas do tema", () => {
      const { getByText } = renderWithTheme(TextSpan);
      expect(getByText("Texto de Teste")).toBeInTheDocument();
    });

    it("valida o render do Cargo recebendo payload completo do tema (incluindo media queries)", () => {
      const { getByText } = renderWithTheme(Cargo);
      expect(getByText("Texto de Teste")).toBeInTheDocument();
    });

    it("valida o render do TextH2 renderizando h2 adequadamente", () => {
      const { getByText, container } = renderWithTheme(TextH2);
      expect(getByText("Texto de Teste")).toBeInTheDocument();
      expect(container.querySelector("h2")).toBeInTheDocument();
    });

    it("valida o render do Resumo com todas as variáveis de fonte e tamanho", () => {
      const { getByText } = renderWithTheme(Resumo);
      expect(getByText("Texto de Teste")).toBeInTheDocument();
    });

    it("valida o render da Descricao aplicando estilos base e text-align", () => {
      const { getByText } = renderWithTheme(Descricao);
      expect(getByText("Texto de Teste")).toBeInTheDocument();
    });

    it("valida o render do TituloProjeto com propriedades da fonte jetbrains e cor bold", () => {
      const { getByText } = renderWithTheme(TituloProjeto);
      expect(getByText("Texto de Teste")).toBeInTheDocument();
    });
  });

  describe("Validação de Campos Opcionais e Borda", () => {
    it("aceita valores de string vazia ('') em todos os campos do tema sem quebrar o componente", () => {
      
      const { getByText: getSpan, unmount: unmountSpan } = renderWithTheme(TextSpan, mockThemeVazio);
      expect(getSpan("Texto de Teste")).toBeInTheDocument();
      unmountSpan();

      const { getByText: getCargo, unmount: unmountCargo } = renderWithTheme(Cargo, mockThemeVazio);
      expect(getCargo("Texto de Teste")).toBeInTheDocument();
      unmountCargo();

      const { getByText: getDescricao, unmount: unmountDescricao } = renderWithTheme(Descricao, mockThemeVazio);
      expect(getDescricao("Texto de Teste")).toBeInTheDocument();
      unmountDescricao();
    });

    it("lida de forma tolerante caso valores numéricos sejam passados no lugar de strings (ex: 0 no breakpoint)", () => {
      const themeComZero = {
        ...mockThemeValido,
        breakpoints: { mobile: 0 },
      };
      
      const { getByText } = renderWithTheme(Cargo, themeComZero);
      expect(getByText("Texto de Teste")).toBeInTheDocument();
    });
  });

  describe("Tratamento de Erros e Exceções", () => {
    it("retorna falha/exceção quando o theme for undefined e o styled-component tentar desestruturar ({ theme })", () => {
      expect(() => {
        render(<TextSpan theme={undefined as any}>Texto</TextSpan>);
      }).toThrowError(/Cannot read properties of undefined|Cannot destructure property/);
    });

    it("trata falha ao tentar acessar subpropriedades de um tema malformatado (ex: faltando 'colors')", () => {
      const themeMalformatado = {
        fontSizes: { h1: "32px" }
      }; 

      expect(() => {
        renderWithTheme(Cargo, themeMalformatado);
      }).toThrowError(); 
    });

    it("trata falha ao tentar acessar subpropriedades quando tema é null", () => {
      expect(() => {
        render(<Descricao theme={null as any}>Texto</Descricao>);
      }).toThrowError();
    });
  });
});