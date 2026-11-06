import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import { navList as NavList, navItem as NavItem, navLink as NavLink } from "./styles";

// 1. Mocks globais
// Mockando o console.error para evitar poluição no terminal durante os testes de exceção (Tratamento de Erros)
const consoleErrorMock = vi.spyOn(console, "error").mockImplementation(() => {});

// 2. Fixtures / Mocks de dados base
const mockTheme = {
  colors: {
    bold: "#ff0000",
    text: "#cccccc",
  },
  fonts: {
    jetbrains: "'JetBrains Mono', monospace",
  },
  fontSizes: {
    medium: "16px",
  },
};

// Função auxiliar para renderizar com o tema
const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={mockTheme}>{ui}</ThemeProvider>);
};

describe("Componentes de Navegação (styles.ts)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Caminho Feliz (Happy Path)", () => {
    it("valida a renderização básica do navList", () => {
      renderWithTheme(<NavList data-testid="nav-list">Itens da Lista</NavList>);
      const list = screen.getByTestId("nav-list");
      
      expect(list).toBeInTheDocument();
      expect(list.tagName).toBe("UL");
    });

    it("valida a renderização básica do navItem", () => {
      renderWithTheme(<NavItem data-testid="nav-item">Item único</NavItem>);
      const item = screen.getByTestId("nav-item");
      
      expect(item).toBeInTheDocument();
      expect(item.tagName).toBe("LI");
    });

    it("valida o payload completo do navLink com dados opcionais passados (isActive = true)", () => {
      renderWithTheme(
        <NavLink href="/sobre" isActive={true} data-testid="nav-link">
          Link Ativo
        </NavLink>
      );
      const link = screen.getByTestId("nav-link");
      
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/sobre");
      // Quando ativo, a cor deve vir de theme.colors.bold
      expect(link).toHaveStyle({ color: mockTheme.colors.bold });
    });
  });

  describe("Validação de Campos Opcionais e Borda", () => {
    it("aceita valores vazios e undefined no campo opcional (isActive = undefined)", () => {
      renderWithTheme(<NavLink data-testid="nav-link-undefined">Link Indefinido</NavLink>);
      const link = screen.getByTestId("nav-link-undefined");
      
      // Se não for passado, por padrão será falso na checagem do styled, adotando theme.colors.text
      expect(link).toBeInTheDocument();
      expect(link).toHaveStyle({ color: mockTheme.colors.text });
    });

    it("testa limites explícitos de tipagem passando isActive = false", () => {
      renderWithTheme(<NavLink isActive={false} data-testid="nav-link-false">Link Inativo</NavLink>);
      const link = screen.getByTestId("nav-link-false");
      
      expect(link).toBeInTheDocument();
      expect(link).toHaveStyle({ color: mockTheme.colors.text });
    });

    it("aceita renderização com strings vazias nos children sem quebrar", () => {
      renderWithTheme(<NavLink isActive={true} data-testid="nav-link-empty">{""}</NavLink>);
      const link = screen.getByTestId("nav-link-empty");
      
      expect(link).toBeInTheDocument();
      expect(link.innerHTML).toBe(""); 
    });
  });

  describe("Tratamento de Erros e Exceções", () => {
    it("trata falhas quando o componente renderiza sem o ThemeProvider providenciado", () => {
      // Remover o theme do contexto deve lançar um erro do Emotion pois ele tentará ler undefined.colors
      expect(() => {
        render(<NavLink isActive={true}>Link Sem Tema</NavLink>);
      }).toThrowError(); // Valida se o sistema interrompe a renderização para evitar falsos positivos
      
      expect(consoleErrorMock).toHaveBeenCalled();
    });

    it("ignora e não aplica atributos inválidos ao DOM HTML base", () => {
      renderWithTheme(
        // @ts-expect-error: Injetando propositalmente uma propriedade inexistente para testar comportamento de borda
        <NavLink isActive={true} propInexistente="falha" data-testid="nav-link-invalid">
          Link Invalido
        </NavLink>
      );
      
      const link = screen.getByTestId("nav-link-invalid");
      expect(link).toBeInTheDocument();
      expect(link).not.toHaveAttribute("propInexistente");
    });
  });
});