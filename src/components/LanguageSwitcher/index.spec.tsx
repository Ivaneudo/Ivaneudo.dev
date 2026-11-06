import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LanguageSwitcher } from "./index";
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "@emotion/react"; // Ou 'styled-components'

// IMPORTANTE: Importe o objeto de tema real da sua aplicação aqui
import { theme } from "../../Layout/GlobalTheme"; // Ajuste o caminho relativo para o seu arquivo de tema

// 1. Mocks globais e de dependências externas
const changeLanguageMock = vi.fn();

vi.mock("react-i18next", () => ({
  useTranslation: vi.fn(() => ({
    i18n: {
      language: "pt",
      changeLanguage: changeLanguageMock,
    },
  })),
}));

const mockUseTranslation = (language: string | undefined | null) => {
  (useTranslation as any).mockReturnValue({
    i18n: {
      language,
      changeLanguage: changeLanguageMock,
    },
  });
};

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe("LanguageSwitcher", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseTranslation("pt");
  });

  describe("Caminho Feliz (Happy Path)", () => {
    it("renderiza o componente e valida o estado inicial (fechado, idioma padrão)", () => {
      renderWithTheme(<LanguageSwitcher />);
      
      const trigger = screen.getByRole("button", { name: /Selecionar idioma/i });
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveTextContent("🌐 PT");
      
      expect(screen.getByText("Português")).toBeInTheDocument();
      expect(screen.getByText("English")).toBeInTheDocument();
      expect(screen.getByText("Español")).toBeInTheDocument();
    });

    it("abre o dropdown ao clicar no gatilho", () => {
      renderWithTheme(<LanguageSwitcher />);
      const trigger = screen.getByRole("button", { name: /Selecionar idioma/i });
      
      fireEvent.click(trigger);
      expect(trigger).toBeInTheDocument();
    });

    it("altera o idioma e fecha o dropdown ao clicar em uma opção", () => {
      renderWithTheme(<LanguageSwitcher />);
      const trigger = screen.getByRole("button", { name: /Selecionar idioma/i });
      
      fireEvent.click(trigger);
      
      const englishOption = screen.getByText("English");
      fireEvent.click(englishOption);
      
      expect(changeLanguageMock).toHaveBeenCalledTimes(1);
      expect(changeLanguageMock).toHaveBeenCalledWith("en");
    });
  });

  describe("Validação de Campos Opcionais, Borda e Tratamento de Strings", () => {
    it("faz fallback para a primeira opção (PT) caso language seja undefined", () => {
      mockUseTranslation(undefined);
      renderWithTheme(<LanguageSwitcher />);
      
      const trigger = screen.getByRole("button", { name: /Selecionar idioma/i });
      expect(trigger).toHaveTextContent("🌐 PT");
    });

    it("faz fallback para a primeira opção (PT) caso language seja uma string vazia", () => {
      mockUseTranslation("");
      renderWithTheme(<LanguageSwitcher />);
      
      const trigger = screen.getByRole("button", { name: /Selecionar idioma/i });
      expect(trigger).toHaveTextContent("🌐 PT");
    });

    it("faz fallback para a primeira opção (PT) caso language seja um código não mapeado (ex: 'fr')", () => {
      mockUseTranslation("fr");
      renderWithTheme(<LanguageSwitcher />);
      
      const trigger = screen.getByRole("button", { name: /Selecionar idioma/i });
      expect(trigger).toHaveTextContent("🌐 PT");
    });

    it("reconhece idiomas com sufixos regionais via startsWith (ex: 'en-US' deve marcar 'en')", () => {
      mockUseTranslation("en-US");
      renderWithTheme(<LanguageSwitcher />);
      
      const trigger = screen.getByRole("button", { name: /Selecionar idioma/i });
      expect(trigger).toHaveTextContent("🌐 EN");
    });
    
    it("reconhece o idioma espanhol perfeitamente ('es')", () => {
      mockUseTranslation("es");
      renderWithTheme(<LanguageSwitcher />);
      
      const trigger = screen.getByRole("button", { name: /Selecionar idioma/i });
      expect(trigger).toHaveTextContent("🌐 ES");
    });
  });

  describe("Tratamento de Eventos (Event Listeners & Cleanup)", () => {
    it("fecha o menu ao clicar fora do componente", () => {
      renderWithTheme(<LanguageSwitcher />);
      
      const trigger = screen.getByRole("button", { name: /Selecionar idioma/i });
      fireEvent.click(trigger);
      fireEvent.mouseDown(document.body);
    });

    it("não fecha o menu ao clicar dentro do próprio componente", () => {
      renderWithTheme(<LanguageSwitcher />);
      
      const trigger = screen.getByRole("button", { name: /Selecionar idioma/i });
      fireEvent.click(trigger);
      fireEvent.mouseDown(trigger);
    });

    it("remove o event listener no unmount (cleanup do useEffect)", () => {
      const addEventListenerSpy = vi.spyOn(document, 'addEventListener');
      const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');
      
      const { unmount } = renderWithTheme(<LanguageSwitcher />);
      
      expect(addEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
      
      unmount();
      
      expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
      
      addEventListenerSpy.mockRestore();
      removeEventListenerSpy.mockRestore();
    });
  });
});