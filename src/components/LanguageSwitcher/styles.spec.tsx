import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import { Container, TriggerButton, DropdownMenu, MenuItem } from "./styles";
import "@testing-library/jest-dom";

vi.mock("@emotion/styled", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
  };
});

const mockTheme = {
  colors: {
    border: "#e5e5e5",
    text: "#333333",
    bold: "#000000",
    background: "#ffffff",
  },
  fonts: {
    jetbrains: "'JetBrains Mono', monospace",
  },
  fontSizes: {
    medium: "16px",
  },
  breakpoints: {
    mobile: "768px",
  },
};

const renderWithTheme = (ui: React.ReactNode) => {
  return render(<ThemeProvider theme={mockTheme}>{ui}</ThemeProvider>);
};

describe("Styles Components (styles.ts)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Caminho Feliz (Happy Path)", () => {
    it("renderiza o Container corretamente com o payload mínimo", () => {
      renderWithTheme(<Container data-testid="container">Conteúdo</Container>);
      const container = screen.getByTestId("container");
      expect(container).toBeInTheDocument();
    });

    it("renderiza o TriggerButton com as propriedades do tema corretamente", () => {
      renderWithTheme(<TriggerButton data-testid="trigger">Botão</TriggerButton>);
      const button = screen.getByTestId("trigger");
      expect(button).toBeInTheDocument();
      expect(button.tagName).toBe("BUTTON");
    });

    it("renderiza o DropdownMenu aberto (isOpen = true)", () => {
      renderWithTheme(<DropdownMenu isOpen={true} data-testid="dropdown">Menu</DropdownMenu>);
      const dropdown = screen.getByTestId("dropdown");
      expect(dropdown).toBeInTheDocument();
      expect(dropdown).toHaveStyle({ display: 'block' }); 
    });

    it("renderiza o MenuItem ativo (isActive = true)", () => {
      renderWithTheme(<MenuItem isActive={true} data-testid="menuitem">Item Ativo</MenuItem>);
      const menuItem = screen.getByTestId("menuitem");
      expect(menuItem).toBeInTheDocument();
      expect(menuItem).toHaveStyle({ fontWeight: '700' });
      expect(menuItem).toHaveStyle({ color: mockTheme.colors.bold });
    });
  });

  describe("Validação de Campos Opcionais e Borda", () => {
    it("renderiza o DropdownMenu fechado (isOpen = false)", () => {
      renderWithTheme(<DropdownMenu isOpen={false} data-testid="dropdown">Menu</DropdownMenu>);
      const dropdown = screen.getByTestId("dropdown");
      expect(dropdown).toHaveStyle({ display: 'none' });
    });

    it("renderiza o MenuItem inativo (isActive = false)", () => {
      renderWithTheme(<MenuItem isActive={false} data-testid="menuitem">Item Inativo</MenuItem>);
      const menuItem = screen.getByTestId("menuitem");
      expect(menuItem).toHaveStyle({ fontWeight: '400' });
      expect(menuItem).toHaveStyle({ color: mockTheme.colors.text });
    });

    it("aceita valores falsy não booleanos graciosamente (Edge cases / undefined handling)", () => {
      renderWithTheme(
        <DropdownMenu isOpen={undefined as unknown as boolean} data-testid="dropdown-falsy">
          Menu Falsy
        </DropdownMenu>
      );
      const dropdown = screen.getByTestId("dropdown-falsy");
      expect(dropdown).toHaveStyle({ display: 'none' }); 

      renderWithTheme(
        <MenuItem isActive={0 as unknown as boolean} data-testid="menuitem-falsy">
          Item Falsy
        </MenuItem>
      );
      const menuItem = screen.getByTestId("menuitem-falsy");
      expect(menuItem).toHaveStyle({ fontWeight: '400' });
    });
  });

  describe("Tratamento de Erros e Exceções", () => {
    it("não quebra ao receber string vazia como children nos componentes base", () => {
      expect(() => {
        renderWithTheme(<Container data-testid="empty-container">{""}</Container>);
        renderWithTheme(<TriggerButton>{""}</TriggerButton>);
        renderWithTheme(<DropdownMenu isOpen={true}>{""}</DropdownMenu>);
        renderWithTheme(<MenuItem isActive={true}>{""}</MenuItem>);
      }).not.toThrow();
    });
  });
});