import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "@emotion/react";
import { NavBar } from "./index";

// 1. Mocks globais e de dependências externas
vi.mock("react-i18next", () => ({
  useTranslation: vi.fn(),
}));

// Mockando os componentes filhos para isolar a responsabilidade da NavBar
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

// 2. Mock do Tema do Emotion para os styled-components
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

// Helper para renderizar com o tema injetado
const renderWithTheme = (ui: React.ReactNode) => {
  return render(<ThemeProvider theme={mockTheme}>{ui}</ThemeProvider>);
};

describe("NavBar", () => {
  const mockT = vi.fn((key: string) => key);

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Configuração base do hook de tradução para os testes
    (useTranslation as Mock).mockReturnValue({
      t: mockT,
    });
  });

  describe("Caminho Feliz (Happy Path)", () => {
    it("renderiza o componente com todos os filhos essenciais e estado inicial correto", () => {
      renderWithTheme(<NavBar />);

      // Verifica se o Nome e LanguageSwitcher estão presentes
      expect(screen.getByTestId("nome-user")).toHaveTextContent("Ivaneudo C. Rocha");
      expect(screen.getByTestId("language-switcher")).toBeInTheDocument();

      // Verifica se os links foram renderizados usando as chaves de tradução
      expect(screen.getByTestId("list-nav-home")).toHaveTextContent("nav.home");
      expect(screen.getByTestId("list-nav-projetos")).toHaveTextContent("nav.projects");
      expect(screen.getByTestId("list-nav-sobre-mim")).toHaveTextContent("nav.about");
      
      // Verifica o estado inicial do Hamburger Button (Fechado)
      // Como a query é por texto, o hidden não afeta
      const hamburgerBtn = screen.getByText("☰");
      expect(hamburgerBtn).toBeInTheDocument();
    });

    it("altera o link ativo e fecha o menu ao clicar em um item da navegação", () => {
      renderWithTheme(<NavBar />);
      
      const linkProjetos = screen.getByTestId("list-nav-projetos");
      const hamburgerBtn = screen.getByText("☰");

      // Abre o menu
      fireEvent.click(hamburgerBtn);
      expect(screen.getByText("✕")).toBeInTheDocument();

      // Clica em um link
      fireEvent.click(linkProjetos);

      // O link clicado deve se tornar ativo
      expect(linkProjetos).toHaveAttribute("data-active", "true");
      
      // O menu deve fechar após o clique
      expect(screen.getByText("☰")).toBeInTheDocument();
      expect(screen.queryByText("✕")).not.toBeInTheDocument();
    });
  });

  describe("Validação de Campos Opcionais e Borda (Edge Cases)", () => {
    it("alterna corretamente o estado de abertura/fechamento do menu (Toggle)", () => {
      renderWithTheme(<NavBar />);
      
      // CORREÇÃO AQUI: Adicionado { hidden: true } para acessar o botão que tem display: none no desktop
      const hamburgerBtn = screen.getByRole("button", { hidden: true });
      
      // Click 1 -> Abre
      fireEvent.click(hamburgerBtn);
      expect(hamburgerBtn).toHaveTextContent("✕");

      // Click 2 -> Fecha
      fireEvent.click(hamburgerBtn);
      expect(hamburgerBtn).toHaveTextContent("☰");
    });

    it("mantém a estabilidade mesmo se o hook de tradução retornar strings vazias", () => {
      // Simulando falha/falta de chaves no i18n retornando string vazia
      (useTranslation as Mock).mockReturnValue({
        t: () => "",
      });

      renderWithTheme(<NavBar />);
      
      const linkHome = screen.getByTestId("list-nav-home");
      expect(linkHome.textContent).toBe("");
      expect(linkHome).toBeInTheDocument(); // O componente não deve quebrar
    });
  });

  describe("Tratamento de Erros e Exceções", () => {
    it("suporta retornos undefined do translation fallback sem quebrar a iteração do map", () => {
      (useTranslation as Mock).mockReturnValue({
        t: () => undefined,
      });

      const { container } = renderWithTheme(<NavBar />);
      
      // O componente deve renderizar com sucesso mesmo que os labels sejam undefined
      expect(screen.getByTestId("list-nav-projetos")).toBeInTheDocument();
      expect(container.innerHTML).toBeTruthy();
    });
  });
});