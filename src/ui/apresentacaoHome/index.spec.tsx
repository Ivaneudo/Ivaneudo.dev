import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import { ApresentacaoHome } from "./index";

// 1. Mocks globais e de dependências externas

// Mock do hook de tradução
const mockUseTranslation = vi.fn();
vi.mock("react-i18next", () => ({
  useTranslation: () => mockUseTranslation(),
}));

// Mock do asset de imagem
vi.mock("../../Img/ivaneudo.png", () => ({
  default: "mocked-ivaneudo-img.png",
}));

// Mock do componente Icons
vi.mock("../../components/IconsDigitais", () => ({
  Icons: ({ src, alt }: { src: string; alt: string }) => (
    <img data-testid="mock-icon" src={src} alt={alt} />
  ),
}));

// Mock dos componentes de texto estilizados para isolamento
vi.mock("../../components/Text/styles", () => ({
  Cargo: ({ children }: { children: React.ReactNode }) => <h1>{children}</h1>,
  Resumo: ({ children }: { children: React.ReactNode }) => <p>{children}</p>,
  TextSpan: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}));

// 2. Fixtures / Mocks de dados base
const mockTheme = {
  breakpoints: {
    mobile: "768px",
  },
  colors: {
    text: "#000000",
  },
  fontSizes: {
    h1: "2rem",
  },
  fonts: {
    jetbrains: "JetBrains Mono, monospace",
  },
};

const mockTranslationsValidas = (key: string) => {
  const translations: Record<string, string> = {
    "home.rolePrefix": "Desenvolvedor ",
    "home.roleHighlight": "Full Stack",
    "home.roleSuffix": " Sênior",
    "home.summary": "Resumo profissional de teste.",
  };
  return translations[key] || key;
};

// Utilitário para renderizar com o ThemeProvider
const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={mockTheme}>{ui}</ThemeProvider>);
};

describe("ApresentacaoHome Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Configuração padrão do mock de tradução para o Caminho Feliz
    mockUseTranslation.mockReturnValue({
      t: vi.fn().mockImplementation(mockTranslationsValidas),
    });
  });

  describe("Caminho Feliz (Happy Path)", () => {
    it("renderiza o payload mínimo obrigatório com avatar, textos traduzidos e estrutura", () => {
      renderWithTheme(<ApresentacaoHome />);
      
      // Valida Avatar
      const avatar = screen.getByAltText("Avatar do Ivaneudo");
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute("src", "mocked-ivaneudo-img.png");

      // Valida Textos da Tradução (Cargo e Resumo) usando regex parcial ou ignorando espaços nas pontas
      expect(screen.getByText(/Desenvolvedor/i)).toBeInTheDocument();
      expect(screen.getByText("Full Stack")).toBeInTheDocument();
      expect(screen.getByText(/Sênior/i)).toBeInTheDocument();
      expect(screen.getByText("Resumo profissional de teste.")).toBeInTheDocument();
    });

    it("valida o payload completo renderizando a lista estática de Stacks exata (8 itens)", () => {
      renderWithTheme(<ApresentacaoHome />);
      
      const icons = screen.getAllByTestId("mock-icon");
      
      // Verifica limite exato do array estático (N = 8)
      expect(icons).toHaveLength(8);
      
      // Verifica integridade dos dados repassados ao componente filho
      expect(icons[0]).toHaveAttribute("alt", "react");
      expect(icons[0]).toHaveAttribute("src", "https://skillicons.dev/icons?i=react");
      
      expect(icons[7]).toHaveAttribute("alt", "git");
      expect(icons[7]).toHaveAttribute("src", "https://skillicons.dev/icons?i=git");
    });
  });

  describe("Validação de Campos Opcionais e Borda", () => {
    it("aceita valores vazios e undefined retornados pelo sistema de tradução sem quebrar a UI", () => {
      mockUseTranslation.mockReturnValue({
        t: vi.fn().mockReturnValue(""),
      });

      const { container } = renderWithTheme(<ApresentacaoHome />);
      
      expect(container).toBeInTheDocument();
      const icons = screen.getAllByTestId("mock-icon");
      expect(icons.length).toBe(8); 
    });

    it("aceita retornos nulos nas traduções simulando dados ausentes no JSON de idioma", () => {
      mockUseTranslation.mockReturnValue({
        t: vi.fn().mockReturnValue(null), 
      });

      const { container } = renderWithTheme(<ApresentacaoHome />);
      
      expect(container.firstChild).toBeInTheDocument();
      expect(screen.getByAltText("Avatar do Ivaneudo")).toBeInTheDocument();
    });
  });

  describe("Tratamento de Erros e Exceções", () => {
    it("trata falhas assíncronas ou exceções de contexto (ex: erro crítico no hook useTranslation)", () => {
      mockUseTranslation.mockImplementation(() => {
        throw new Error("I18nextProvider missing");
      });

      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      expect(() => renderWithTheme(<ApresentacaoHome />)).toThrowError("I18nextProvider missing");
      
      consoleSpy.mockRestore();
    });

    it("retorna renderização segura mesmo se o mock de imagem falhar ao carregar src vazio", () => {
      vi.doMock("../../Img/ivaneudo.png", () => ({ default: "" }));
      
      const { getByAltText } = renderWithTheme(<ApresentacaoHome />);
      const avatar = getByAltText("Avatar do Ivaneudo");
      
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute("src"); 
    });
  });
});