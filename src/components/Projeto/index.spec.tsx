import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import { Projeto } from "./index";
import "@testing-library/jest-dom";

vi.mock("react-icons/fa", () => ({
  FaGithub: () => <svg data-testid="icon-github" />,
  FaLink: () => <svg data-testid="icon-link" />
}));

const mockTheme = {
  breakpoints: {
    mobile: "768px",
  },
  colors: {
    bold: "#ffffff", 
  },
  fontSizes: {
    medium: "16px",
  },
  fonts: {
    jetbrains: "monospace",
  }
};

const mockValidoBase = {
  nome: "Projeto Base",
  resumo: "Resumo mínimo exigido do projeto.",
  imagem: "/caminho/imagem.jpg",
  altImg: "Texto alternativo da imagem",
};

const mockValidoCompleto = {
  ...mockValidoBase,
  url: "https://github.com/usuario/projeto",
  link: "https://meuprojeto.com",
  tecnologias: [
    <span data-testid="tech-item" key="1">React</span>, 
    <span data-testid="tech-item" key="2">TypeScript</span>
  ],
};

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={mockTheme}>{ui}</ThemeProvider>);
};

describe("Componente Projeto (index.tsx)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Caminho Feliz (Happy Path)", () => {
    it("valida o payload mínimo obrigatório", () => {
      renderWithTheme(<Projeto {...mockValidoBase} />);

      expect(screen.getByText(mockValidoBase.nome)).toBeDefined();
      expect(screen.getByText(mockValidoBase.resumo)).toBeDefined();
      
      const img = screen.getByRole("img");
      expect(img).toHaveAttribute("src", mockValidoBase.imagem);
      expect(img).toHaveAttribute("alt", mockValidoBase.altImg);

      expect(screen.queryByTestId("icon-github")).toBeNull();
      expect(screen.queryByTestId("icon-link")).toBeNull();
      expect(screen.queryByTestId("tech-item")).toBeNull();
    });

    it("valida o payload completo com dados opcionais", () => {
      renderWithTheme(<Projeto {...mockValidoCompleto} />);

      const links = screen.getAllByRole("link");
      expect(links).toHaveLength(2);
      expect(links[0]).toHaveAttribute("href", mockValidoCompleto.url);
      expect(links[1]).toHaveAttribute("href", mockValidoCompleto.link);

      expect(screen.getByTestId("icon-github")).toBeDefined();
      expect(screen.getByTestId("icon-link")).toBeDefined();

      const techItems = screen.getAllByTestId("tech-item");
      expect(techItems).toHaveLength(2);
    });
  });

  describe("Validação de Campos Opcionais e Borda", () => {
    it("aceita valores vazios e undefined em campos opcionais (não deve quebrar ou renderizar tags vazias)", () => {
      renderWithTheme(
        <Projeto 
          {...mockValidoBase} 
          url={undefined} 
          link="" 
          tecnologias={undefined} 
        />
      );

      expect(screen.queryByRole("link")).toBeNull();
      expect(screen.queryByTestId("icon-github")).toBeNull();
      expect(screen.queryByTestId("icon-link")).toBeNull();
    });

    it("rejeita renderização do TechContainer quando o array de tecnologias for vazio (comprimento 0)", () => {
      renderWithTheme(<Projeto {...mockValidoBase} tecnologias={[]} />);
      expect(screen.queryByTestId("tech-item")).toBeNull();
    });
  });

  describe("Tratamento de Erros e Exceções", () => {
    it("retorna fallback/não quebra quando atributos obrigatórios recebem tipos inesperados (resiliência de runtime)", () => {
      const { container } = renderWithTheme(
        <Projeto 
          //@ts-ignore
          nome={null} 
          //@ts-ignore
          resumo={undefined} 
          imagem="" 
          altImg="" 
        />
      );
      
      const img = container.querySelector("img");
      expect(img).toBeDefined();
    });
    
    it("trata falhas estruturais nos nós do React repassados ao array de tecnologias", () => {
      renderWithTheme(
        <Projeto 
          {...mockValidoBase} 
          //@ts-ignore
          tecnologias={[null, undefined, false, "Texto Solto"]} 
        />
      );

      expect(screen.getByText("Texto Solto")).toBeDefined();
    });
  });
});