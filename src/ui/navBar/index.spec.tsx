import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "@emotion/react";
import { NavBar } from "./index";
import "@testing-library/jest-dom";

vi.mock("react-i18next", () => ({
  useTranslation: vi.fn(),
}));

const mockOnToggleTheme = vi.fn();

const renderWithTheme = (ui: React.ReactNode) => {
  return render(<ThemeProvider theme={mockTheme}>{ui}</ThemeProvider>);
};

vi.mock("../../components/navList", () => ({
  ListNav: ({ children, href, isActive, onClick }: any) => (
    <li
      data-testid={`list-nav-${href.replace("#", "")}`}
      data-active={isActive}
      onClick={onClick}
    >
      {children}
    </li>
  ),
}));

vi.mock("../../components/nomeUser", () => ({
  Nome: ({ nome, sobrenome }: any) => (
    <div data-testid="nome-user">{`${nome} ${sobrenome}`}</div>
  ),
}));

vi.mock("../../components/LanguageSwitcher", () => ({
  LanguageSwitcher: () => <div data-testid="language-switcher">Lang</div>,
}));

const mockTheme = {
  colors: {
    border: "#e0e0e0",
    background: "#ffffff",
    bold: "#000000",
  },
  breakpoints: {
    mobile: "768px",
  },
};

describe("NavBar", () => {
  const mockT = vi.fn((key: string) => key);

  beforeEach(() => {
    vi.clearAllMocks();
    
    (useTranslation as Mock).mockReturnValue({
      t: mockT,
    });
  });

  describe("Caminho Feliz (Happy Path)", () => {
    it("renderiza o componente com todos os filhos essenciais e estado inicial correto", () => {
      renderWithTheme(<NavBar />);

      expect(screen.getByTestId("nome-user")).toHaveTextContent("Ivaneudo C. Rocha");
      expect(screen.getByTestId("language-switcher")).toBeInTheDocument();

      expect(screen.getByTestId("list-nav-home")).toHaveTextContent("nav.home");
      expect(screen.getByTestId("list-nav-projetos")).toHaveTextContent("nav.projects");
      expect(screen.getByTestId("list-nav-sobre-mim")).toHaveTextContent("nav.about");
      
      const hamburgerBtn = screen.getByText("☰");
      expect(hamburgerBtn).toBeInTheDocument();
    });

    it("altera o link ativo e fecha o menu ao clicar em um item da navegação", () => {
      renderWithTheme(<NavBar />);
      
      const linkProjetos = screen.getByTestId("list-nav-projetos");
      const hamburgerBtn = screen.getByText("☰");

      fireEvent.click(hamburgerBtn);
      expect(screen.getByText("✕")).toBeInTheDocument();

      fireEvent.click(linkProjetos);

      expect(linkProjetos).toHaveAttribute("data-active", "true");
      
      expect(screen.getByText("☰")).toBeInTheDocument();
      expect(screen.queryByText("✕")).not.toBeInTheDocument();
    });
  });

  describe("Validação de Campos Opcionais e Borda (Edge Cases)", () => {
    it("alterna corretamente o estado de abertura/fechamento do menu (Toggle)", () => {
      renderWithTheme(<NavBar onToggleTheme={mockOnToggleTheme} />);

      const hamburgerBtn = screen.getByText("☰");

      fireEvent.click(hamburgerBtn);
      expect(hamburgerBtn).toHaveTextContent("✕");

      fireEvent.click(hamburgerBtn);
      expect(hamburgerBtn).toHaveTextContent("☰");
    });

    it("mantém a estabilidade mesmo se o hook de tradução retornar strings vazias", () => {
      (useTranslation as Mock).mockReturnValue({
        t: () => "",
      });

      renderWithTheme(<NavBar />);
      
      const linkHome = screen.getByTestId("list-nav-home");
      expect(linkHome.textContent).toBe("");
      expect(linkHome).toBeInTheDocument(); 
    });
  });

  describe("Tratamento de Erros e Exceções", () => {
    it("suporta retornos undefined do translation fallback sem quebrar a iteração do map", () => {
      (useTranslation as Mock).mockReturnValue({
        t: () => undefined,
      });

      const { container } = renderWithTheme(<NavBar />);
      
      expect(screen.getByTestId("list-nav-projetos")).toBeInTheDocument();
      expect(container.innerHTML).toBeTruthy();
    });
  });

  describe("Integração e Alternância de Tema", () => {
    it("exibe o título 'Mudar para tema escuro' e aciona onToggleTheme ao clicar", () => {
      renderWithTheme(<NavBar onToggleTheme={mockOnToggleTheme} />);
      
      const themeBtn = screen.getByTitle("Mudar para tema escuro");
      expect(themeBtn).toBeInTheDocument();

      fireEvent.click(themeBtn);
      expect(mockOnToggleTheme).toHaveBeenCalled();
    });

    it("exibe o título 'Mudar para tema claro' quando isDark for true", () => {
      renderWithTheme(<NavBar onToggleTheme={mockOnToggleTheme} isDark={true} />);
      
      const themeBtn = screen.getByTitle("Mudar para tema claro");
      expect(themeBtn).toBeInTheDocument();
    });
  });
});