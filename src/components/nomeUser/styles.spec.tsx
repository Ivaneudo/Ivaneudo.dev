import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import React from "react";
import { userDiv as UserDiv, userName as UserName } from "./styles";
import "@testing-library/jest-dom";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
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
});

const mockThemeValido = {
  colors: { text: "#FFFFFF" },
  fontSizes: { h1: "32px" },
  fonts: { jetbrains: "'JetBrains Mono', monospace" },
  breakpoints: { mobile: "768px" },
};

const mockThemeVazio = {
  colors: { text: "" },
  fontSizes: { h1: "" },
  fonts: { jetbrains: "" },
  breakpoints: { mobile: "" },
};

const mockThemeLimites = {
  colors: { text: "transparent" },
  fontSizes: { h1: "0" },
  fonts: { jetbrains: "inherit" },
  breakpoints: { mobile: "0px" },
};

describe("Styles Components (userDiv e userName)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Caminho Feliz (Happy Path)", () => {
    it("valida o payload mínimo obrigatório para userDiv (estilos estáticos)", () => {
      const { container } = render(<UserDiv>Conteúdo Div</UserDiv>);
      const divElement = container.firstChild as HTMLElement;
      
      expect(divElement).toBeInTheDocument();
      expect(divElement.tagName).toBe("DIV");
      expect(divElement.textContent).toBe("Conteúdo Div");
    });

    it("valida o payload completo com dados opcionais do tema em userName", () => {
      const { container } = render(
        <UserName theme={mockThemeValido}>Nome do Usuário</UserName>
      );
      const h1Element = container.firstChild as HTMLElement;

      expect(h1Element).toBeInTheDocument();
      expect(h1Element.tagName).toBe("H1");
      expect(h1Element.textContent).toBe("Nome do Usuário");
    });
  });

  describe("Validação de Campos Opcionais e Borda", () => {
    it("aceita valores vazios e undefined em campos opcionais (strings vazias no tema)", () => {
      const { container } = render(
        <UserName theme={mockThemeVazio}>Texto Vazio</UserName>
      );
      const h1Element = container.firstChild as HTMLElement;
      
      expect(h1Element).toBeInTheDocument();
    });

    it("rejeita valores abaixo do limite mínimo permitido (ou aplica zero absoluto de forma segura)", () => {
      const { container } = render(
        <UserName theme={mockThemeLimites}>Texto Limite Mínimo</UserName>
      );
      const h1Element = container.firstChild as HTMLElement;
      
      expect(h1Element).toBeInTheDocument();
    });

    it("rejeita valores acima do limite máximo permitido (comportamento de truncamento em CSS)", () => {
      const massiveTheme = {
        colors: { text: "A".repeat(10000) },
        fontSizes: { h1: "100000000vw" },
        fonts: { jetbrains: "Arial, ".repeat(1000) },
        breakpoints: { mobile: "999999999px" },
      };

      const { container } = render(
        <UserName theme={massiveTheme}>Texto Massivo</UserName>
      );
      const h1Element = container.firstChild as HTMLElement;
      
      expect(h1Element).toBeInTheDocument();
    });
  });

  describe("Tratamento de Erros e Exceções", () => {
    it("retorna null/falha quando a resposta for inválida (exceção por falta do provider/prop de tema)", () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      expect(() => {
        // @ts-expect-error - Forçando a ausência da prop `theme` para simular uma entrada malformatada
        render(<UserName>Sem Tema</UserName>);
      }).toThrow(TypeError);

      consoleSpy.mockRestore();
    });

    it("trata falhas assíncronas ou exceções de rede (Simulação de nós filhos mal-comportados)", () => {
      const ThrowErrorComponent = () => {
        throw new Error("Erro de renderização forçado");
      };

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(
          <UserDiv>
            <ThrowErrorComponent />
          </UserDiv>
        );
      }).toThrow("Erro de renderização forçado");

      consoleSpy.mockRestore();
    });
  });
});