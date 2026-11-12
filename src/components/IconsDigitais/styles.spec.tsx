import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import { IconsDig } from "./styles";
import "@testing-library/jest-dom";

vi.mock("algum-modulo-externo", () => ({})); 

const mockThemeValido = {
  breakpoints: {
    mobile: "768px",
  },
};

const defaultProps = {
  src: "https://exemplo.com/icone.png",
  alt: "Ícone Digital",
};

const renderWithTheme = (ui: React.ReactNode, theme = mockThemeValido) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe("IconsDig (Styled Component)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Caminho Feliz (Happy Path)", () => {
    it("valida a renderização com o payload mínimo obrigatório (apenas tema e src)", () => {
      renderWithTheme(<IconsDig src={defaultProps.src} />);
      
      const imgElement = screen.getByRole("img");
      expect(imgElement).toBeInTheDocument();
      expect(imgElement).toHaveAttribute("src", defaultProps.src);
    });

    it("valida a renderização completa com dados opcionais (alt, title, class)", () => {
      renderWithTheme(
        <IconsDig
          src={defaultProps.src}
          alt={defaultProps.alt}
          title="Título do Ícone"
          className="custom-class"
        />
      );
      
      const imgElement = screen.getByRole("img", { name: defaultProps.alt });
      expect(imgElement).toBeInTheDocument();
      expect(imgElement).toHaveAttribute("title", "Título do Ícone");
      expect(imgElement).toHaveClass("custom-class");
    });
  });

  describe("Validação de Campos Opcionais e Borda", () => {
    it("aceita valores vazios (string vazia) em atributos opcionais como alt", () => {
      renderWithTheme(<IconsDig src={defaultProps.src} alt="" />);
      
      const imgElement = screen.getByRole("presentation");
      
      expect(imgElement).toHaveAttribute("alt", ""); 
    });

    it("lida explicitamente com null e undefined nos atributos da imagem", () => {
      renderWithTheme(<IconsDig src={undefined} alt={null} />);
      
      const imgElement = screen.getByRole("img");
      expect(imgElement).not.toHaveAttribute("src");
      expect(imgElement).not.toHaveAttribute("alt");
    });

    it("lida com o valor 0 (zero) sendo passado para atributos sem quebrar a renderização", () => {
      renderWithTheme(<IconsDig src={defaultProps.src} tabIndex={0} width={0} />);
      
      const imgElement = screen.getByRole("img");
      expect(imgElement).toHaveAttribute("tabIndex", "0");
      expect(imgElement).toHaveAttribute("width", "0");
    });
  });

  describe("Tratamento de Erros e Exceções", () => {
    it("lança erro/falha se o tema fornecido não possuir a estrutura esperada pelo componente", () => {
      const temaInvalido = {};

      expect(() => {
        renderWithTheme(<IconsDig src={defaultProps.src} />, temaInvalido);
      }).toThrowError(/Cannot read properties of undefined/i);
    });

    it("lida de forma segura se a string do breakpoint vier em branco ou malformatada", () => {
      const themeVazio = { breakpoints: { mobile: "" } };
      
      expect(() => {
        renderWithTheme(<IconsDig src={defaultProps.src} />, themeVazio);
      }).not.toThrow();
    });
  });
});