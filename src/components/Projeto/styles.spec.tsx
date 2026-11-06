import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import { TechContainer, LinksContainer, Img } from "./styles"; // Ajuste o caminho se necessário

// 1. Mocks globais e de dependências externas
// Não há APIs assíncronas no styles, mas mantemos o padrão de mock para dependências
vi.mock("modulo-externo", () => ({}));

// 2. Fixtures / Mocks de dados base
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
      // TechContainer e LinksContainer não dependem do tema, devem renderizar de forma autônoma
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
      // Mesmo com o breakpoint vazio, o Emotion deve fazer o parse (gerando um @media vazio) sem quebrar a aplicação
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
      // Suprimimos temporariamente o console.error gerado pelo React ao capturar a exceção de renderização
      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      // O componente <Img> faz destructing de `({ theme }) => theme.breakpoints.mobile`.
      // Sem o ThemeProvider, ler `breakpoints` de undefined lançará um TypeError
      expect(() => {
        render(<Img src="image.png" />);
      }).toThrow();

      consoleErrorSpy.mockRestore();
    });

    it("trata falhas e lança erro quando o payload do theme enviado está malformatado", () => {
      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      const temaMalformatado = {}; // Não possui objeto "breakpoints"

      expect(() => {
        render(
          // @ts-ignore - Injetando propositalmente um tipo inválido no Provider
          <ThemeProvider theme={temaMalformatado}>
            <Img src="image.png" />
          </ThemeProvider>
        );
      }).toThrow(); // Irá quebrar ao tentar acessar breakpoints.mobile

      consoleErrorSpy.mockRestore();
    });
  });
});