import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import { TechContainer, LinksContainer, Img } from "./styles"; // Ajuste o caminho se necessário
import "@testing-library/jest-dom";

vi.mock("modulo-externo", () => ({}));

const mockThemeValido = {
  breakpoints: {
    mobile: "768px",
  },
};

const mockThemeVazio = {
  breakpoints: {
    mobile: "",
  },
};

describe("Styles - Componentes Estilizados", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Caminho Feliz (Happy Path)", () => {
    it("valida o payload mínimo obrigatório (renderização sem props adicionais)", () => {
      const { container: techContainer } = render(<TechContainer />);
      expect(techContainer.firstChild).toBeDefined();
      expect(techContainer.firstChild?.nodeName).toBe("DIV");

      const { container: linksContainer } = render(<LinksContainer />);
      expect(linksContainer.firstChild).toBeDefined();
      expect(linksContainer.firstChild?.nodeName).toBe("DIV");
    });

    it("valida o payload completo com dados opcionais (children e atributos de âncora)", () => {
      const { getByText, container } = render(
        <LinksContainer id="links-container">
          <a href="/teste">Link Teste</a>
          <span>Conteúdo extra</span>
        </LinksContainer>
      );
      
      expect(getByText("Link Teste")).toBeDefined();
      expect(getByText("Conteúdo extra")).toBeDefined();
      expect(container.querySelector("a")).toHaveAttribute("href", "/teste");
    });

    it("renderiza perfeitamente o componente Img recebendo o ThemeProvider corretamente", () => {
      const { container } = render(
        <ThemeProvider theme={mockThemeValido}>
          <Img src="image.png" alt="Happy Path Image" />
        </ThemeProvider>
      );
      
      const img = container.querySelector("img");
      expect(img).toBeDefined();
      expect(img).toHaveAttribute("src", "image.png");
    });
  });

  describe("Validação de Campos Opcionais e Borda", () => {
    it("aceita valores vazios e strings vazias no theme.breakpoints.mobile", () => {
      const { container } = render(
        <ThemeProvider theme={mockThemeVazio}>
          <Img src="image.png" alt="Edge Case Image" />
        </ThemeProvider>
      );
      expect(container.firstChild).toBeDefined();
    });

    it("aceita valores undefined ou null repassados aos atributos nativos do HTML", () => {
      const { container } = render(
        <ThemeProvider theme={mockThemeValido}>
          {/* @ts-ignore - Forçando props nativas inválidas/vazias para garantir que o styled component é resiliente */}
          <Img src={undefined} alt={null} className="" id={0} />
        </ThemeProvider>
      );
      expect(container.firstChild).toBeDefined();
    });
  });

  describe("Tratamento de Erros e Exceções", () => {
    it("lança falha e rejeita renderização quando a propriedade theme está ausente (exceção de injeção)", () => {
      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      expect(() => {
        render(<Img src="image.png" />);
      }).toThrow();

      consoleErrorSpy.mockRestore();
    });

    it("trata falhas e lança erro quando o payload do theme enviado está malformatado", () => {
      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      const temaMalformatado = {}; 

      expect(() => {
        render(
          // @ts-ignore - Injetando propositalmente um tipo inválido no Provider
          <ThemeProvider theme={temaMalformatado}>
            <Img src="image.png" />
          </ThemeProvider>
        );
      }).toThrow();

      consoleErrorSpy.mockRestore();
    });
  });
});