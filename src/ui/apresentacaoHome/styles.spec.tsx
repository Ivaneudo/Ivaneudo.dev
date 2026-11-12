import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import { HomeDiv, Avatar, StacksDiv } from "./styles";
import "@testing-library/jest-dom";

const originalConsoleError = console.error;
vi.spyOn(console, "error").mockImplementation((...args) => {
  if (typeof args[0] === "string" && args[0].includes("The above error occurred")) return;
  originalConsoleError(...args);
});

const mockThemeValido = {
  breakpoints: {
    mobile: "768px",
  },
};

const mockThemeBorda = {
  breakpoints: {
    mobile: "0px", 
  },
};

const mockThemeVazio = {
  breakpoints: {
    mobile: "",
  },
};

describe("ApresentacaoHome Styles", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Caminho Feliz (Happy Path)", () => {
    it("renderiza o componente HomeDiv corretamente (sem dependência de props/theme)", () => {
      const { container } = render(<HomeDiv data-testid="home-div" />);
      const element = container.firstChild as HTMLElement;
      
      expect(element).toBeInTheDocument();
      expect(element.tagName.toLowerCase()).toBe("div");
    });

    it("renderiza o componente Avatar recebendo o payload completo e válido do tema", () => {
      const { getByTestId } = render(
        <ThemeProvider theme={mockThemeValido}>
          <Avatar data-testid="avatar" src="teste.jpg" alt="Foto de perfil" />
        </ThemeProvider>
      );
      
      const element = getByTestId("avatar");
      expect(element).toBeInTheDocument();
      expect(element).toHaveAttribute("src", "teste.jpg");
    });

    it("renderiza o componente StacksDiv recebendo o payload completo e válido do tema", () => {
      const { container } = render(
        <ThemeProvider theme={mockThemeValido}>
          <StacksDiv>
            <a href="#">Link</a>
          </StacksDiv>
        </ThemeProvider>
      );
      
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe("Validação de Campos Opcionais e Borda", () => {
    it("aceita valores limite exatos (0px) para o breakpoint mobile no Avatar", () => {
      const { getByTestId } = render(
        <ThemeProvider theme={mockThemeBorda}>
          <Avatar data-testid="avatar-borda" />
        </ThemeProvider>
      );
      
      expect(getByTestId("avatar-borda")).toBeInTheDocument();
    });

    it("aceita strings vazias explícitas no breakpoint sem quebrar o componente StacksDiv", () => {
      const { container } = render(
        <ThemeProvider theme={mockThemeVazio}>
          <StacksDiv data-testid="stacks-vazio" />
        </ThemeProvider>
      );
      
      expect(container.firstChild).toBeInTheDocument();
    });
    
    it("rejeita quebras passando prop vazia no HomeDiv (componente sem props dinâmicas)", () => {
      const { container } = render(
        <HomeDiv id="" title={undefined} aria-label={null as unknown as string} />
      );
      
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe("Tratamento de Erros e Exceções", () => {
    it("trata e lança exceção (falha) quando renderizado sem o ThemeProvider e a desestruturação do theme falha no Avatar", () => {
      expect(() => render(<Avatar />)).toThrow();
    });

    it("trata e lança exceção (falha) quando renderizado sem o ThemeProvider no StacksDiv", () => {
      expect(() => render(<StacksDiv />)).toThrow();
    });

    it("trata falhas estruturais de payload malformatado no Theme (prop faltando)", () => {
      const themeMalFormatado = {
        breakpoints: {} 
      } as any;

      const { getByTestId } = render(
        <ThemeProvider theme={themeMalFormatado}>
          <Avatar data-testid="avatar-malformatado" />
        </ThemeProvider>
      );
      
      expect(getByTestId("avatar-malformatado")).toBeInTheDocument();
    });
  });
});