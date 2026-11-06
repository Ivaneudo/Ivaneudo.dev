import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import { HomeDiv, Avatar, StacksDiv } from "./styles";

// 1. Mocks globais e de dependências externas
// Mockando o console.error para suprimir mensagens esperadas nos testes de exceção
const originalConsoleError = console.error;
vi.spyOn(console, "error").mockImplementation((...args) => {
  if (typeof args[0] === "string" && args[0].includes("The above error occurred")) return;
  originalConsoleError(...args);
});

// 2. Fixtures / Mocks de dados base
const mockThemeValido = {
  breakpoints: {
    mobile: "768px",
  },
};

const mockThemeBorda = {
  breakpoints: {
    mobile: "0px", // Limite exato inferior
  },
};

const mockThemeVazio = {
  breakpoints: {
    mobile: "", // Testando string vazia explicitamente
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
      // HomeDiv não espera props específicas, mas enviamos valores vazios/nulos 
      // para garantir que atributos HTML e o render do React não quebrem.
      const { container } = render(
        <HomeDiv id="" title={undefined} aria-label={null as unknown as string} />
      );
      
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe("Tratamento de Erros e Exceções", () => {
    it("trata e lança exceção (falha) quando renderizado sem o ThemeProvider e a desestruturação do theme falha no Avatar", () => {
      // Como o Emotion tenta acessar ${({ theme }) => theme.breakpoints.mobile}, 
      // renderizar sem o ThemeProvider deve lançar um TypeError por 'breakpoints' ser undefined
      expect(() => render(<Avatar />)).toThrow();
    });

    it("trata e lança exceção (falha) quando renderizado sem o ThemeProvider no StacksDiv", () => {
      expect(() => render(<StacksDiv />)).toThrow();
    });

    it("trata falhas estruturais de payload malformatado no Theme (prop faltando)", () => {
      const themeMalFormatado = {
        breakpoints: {} // mobile está explicitamente faltando (undefined)
      } as any;

      const { getByTestId } = render(
        <ThemeProvider theme={themeMalFormatado}>
          <Avatar data-testid="avatar-malformatado" />
        </ThemeProvider>
      );
      
      // Embora o CSS gerado vá ficar malformado (`@media (max-width: )`), 
      // no lado do React ele deve sobreviver e retornar o DOM element sem crashar a execução javascript.
      expect(getByTestId("avatar-malformatado")).toBeInTheDocument();
    });
  });
});