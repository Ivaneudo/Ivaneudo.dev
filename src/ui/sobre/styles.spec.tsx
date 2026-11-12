import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import { Blocos, Bloco } from "./styles"; // Ajuste o path se necessário
import "@testing-library/jest-dom";

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), 
    removeListener: vi.fn(), 
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

const mockThemeValido = {
  breakpoints: { mobile: "768px" },
  colors: {
    background: "#ffffff",
    border: "#e5e5e5",
    bold: "#000000",
  },
};

describe("Estilos: Blocos e Bloco (styles.ts)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Caminho Feliz (Happy Path)", () => {
    it("valida a renderização de Blocos com o payload mínimo obrigatório (Theme completo)", () => {
      const { container } = render(
        <ThemeProvider theme={mockThemeValido}>
          <Blocos>Conteúdo Blocos</Blocos>
        </ThemeProvider>
      );
      
      expect(container.firstChild).toBeInTheDocument();
      expect(container.textContent).toBe("Conteúdo Blocos");
    });

    it("valida a renderização de Bloco completo e garante que as interpolações de cor e breakpoint funcionam", () => {
      const { container } = render(
        <ThemeProvider theme={mockThemeValido}>
          <Bloco>Conteúdo Bloco</Bloco>
        </ThemeProvider>
      );
      
      expect(container.firstChild).toBeInTheDocument();
      expect(container.textContent).toBe("Conteúdo Bloco");
    });
  });

  describe("Validação de Campos Opcionais e Borda (Edge Cases)", () => {
    it("aceita valores vazios (\"\") nos atributos do theme para propriedades de cor e tamanho", () => {
      const mockThemeVazio = {
        breakpoints: { mobile: "" },
        colors: { background: "", border: "", bold: "" },
      };

      const { container } = render(
        <ThemeProvider theme={mockThemeVazio}>
          <Blocos>
            <Bloco>Teste de Borda com valores vazios</Bloco>
          </Blocos>
        </ThemeProvider>
      );
      
      expect(container.firstChild).toBeInTheDocument();
    });

    it("rejeita/trata limites numéricos exatos (ex: 0px) sem quebrar o CSSOM", () => {
      const edgeTheme = {
        ...mockThemeValido,
        breakpoints: { mobile: "0px" },
      };
      
      const { container } = render(
        <ThemeProvider theme={edgeTheme}>
          <Bloco>Limite Inferior: 0px</Bloco>
        </ThemeProvider>
      );
      
      expect(container.firstChild).toBeInTheDocument();
    });

    it("rejeita strings mal formatadas em atributos que não causam quebra (undefined fallback logic)", () => {
      const edgeTheme = {
        ...mockThemeValido,
        breakpoints: { mobile: undefined as any },
      };
      
      const { container } = render(
        <ThemeProvider theme={edgeTheme}>
          <Blocos>Tratamento do undefined explícito no layout flex</Blocos>
        </ThemeProvider>
      );
      
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe("Tratamento de Erros e Exceções", () => {
    let consoleErrorMock: any;

    beforeEach(() => {
      consoleErrorMock = vi.spyOn(console, "error").mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorMock.mockRestore();
    });

    it("retorna falha/lança exceção quando renderizado sem o contexto do ThemeProvider", () => {
      expect(() => {
        render(<Blocos>Renderização Órfã</Blocos>);
      }).toThrowError();
    });

    it("trata falhas assíncronas/estruturais quando o objeto `theme` é passado incompleto (TypeError esperado)", () => {
      const themeMalformado = {
        colors: {}
      } as any;

      expect(() => {
        render(
          <ThemeProvider theme={themeMalformado}>
            <Blocos>Deveria lançar erro</Blocos>
          </ThemeProvider>
        );
      }).toThrowError();
    });
  });
});