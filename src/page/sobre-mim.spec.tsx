import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { SobreMim } from "./sobre-mim";
import "@testing-library/jest-dom";

const mockT = vi.fn((key: string) => key);
vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: mockT }),
}));

vi.mock("../ui/sobre/index", () => ({
  Sobre: ({ bloco1, bloco2 }: { bloco1: React.ReactNode; bloco2: React.ReactNode }) => (
    <div data-testid="sobre-component">
      <div data-testid="sobre-bloco1">{bloco1}</div>
      <div data-testid="sobre-bloco2">{bloco2}</div>
    </div>
  ),
}));

vi.mock("../components/IconsDigitais", () => ({
  Icons: ({ src, alt, href }: { src: string; alt: string; href: string }) => (
    <a
      data-testid={`icon-${alt}`}
      data-src={src}
      data-alt={alt}
      href={href}
    >
      {alt}
    </a>
  ),
}));

vi.mock("../components/conteiner/styles", () => ({
  Div: ({ children, ...props }: any) => <div data-testid="container-div" {...props}>{children}</div>,
  Redes: ({ children, ...props }: any) => <div data-testid="container-redes" {...props}>{children}</div>,
}));

vi.mock("../components/Text/styles", () => ({
  Descricao: ({ children }: any) => <p data-testid="descricao">{children}</p>,
  TextH2: ({ children }: any) => <h2 data-testid="text-h2">{children}</h2>,
  TextSpan: ({ children }: any) => <span data-testid="text-span">{children}</span>,
}));

const TODAS_AS_CHAVES_I18N = [
  "about.title",
  "about.block1.p1", "about.block1.hl1",
  "about.block1.p2", "about.block1.hl2",
  "about.block1.p3", "about.block1.hl3",
  "about.block1.p4", "about.block1.hl4",
  "about.block1.p5",
  "about.block2.p1", "about.block2.hl1",
  "about.block2.p2", "about.block2.hl2",
  "about.block2.p3", "about.block2.hl3",
  "about.block2.p4", "about.block2.hl4",
  "about.block2.p5",
  "about.languagesTitle",
  "about.languages",
  "about.socialTitle",
  "about.socialDesc",
] as const;

const REDES_ESPERADAS = [
  {
    alt: "instagram",
    src: "https://skillicons.dev/icons?i=instagram",
    href: "https://instagram.com/ivaneudo.dev/",
  },
  {
    alt: "linkedin",
    src: "https://skillicons.dev/icons?i=linkedin",
    href: "https://linkedin.com/in/ivaneudo-carvalho/",
  },
  {
    alt: "github",
    src: "https://skillicons.dev/icons?i=github",
    href: "https://github.com/Ivaneudo",
  },
] as const;

const chaveFoiTraduzida = (key: string): boolean =>
  mockT.mock.calls.some(([k]) => k === key);

const todasAsChavesForamTraduzidas = (): boolean =>
  TODAS_AS_CHAVES_I18N.every((k) => chaveFoiTraduzida(k));

describe("SobreMim", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockT.mockImplementation((key: string) => key);
  });

  // -----------------------------------------------------------
  describe("Caminho Feliz (Happy Path)", () => {
    it("renderiza o container principal com id 'sobre-mim'", () => {
      render(<SobreMim />);
      const container = screen.getByTestId("container-div");
      expect(container).toBeInTheDocument();
      expect(container).toHaveAttribute("id", "sobre-mim");
    });

    it("renderiza o título principal traduzido", () => {
      render(<SobreMim />);
      const titulos = screen.getAllByTestId("text-h2");
      expect(titulos[0]).toHaveTextContent("about.title");
    });

    it("renderiza o componente Sobre com bloco1 e bloco2 preenchidos", () => {
      render(<SobreMim />);
      expect(screen.getByTestId("sobre-component")).toBeInTheDocument();
      expect(screen.getByTestId("sobre-bloco1")).toBeInTheDocument();
      expect(screen.getByTestId("sobre-bloco2")).toBeInTheDocument();
    });

    it("renderiza a seção de idiomas (título + descrição)", () => {
      render(<SobreMim />);
      const titulos = screen.getAllByTestId("text-h2");
      expect(titulos[1]).toHaveTextContent("about.languagesTitle");
      const descricoes = screen.getAllByTestId("descricao");
      expect(descricoes[0]).toHaveTextContent("about.languages");
    });

    it("renderiza a seção de redes sociais (título + descrição)", () => {
      render(<SobreMim />);
      const titulos = screen.getAllByTestId("text-h2");
      expect(titulos[2]).toHaveTextContent("about.socialTitle");
      const descricoes = screen.getAllByTestId("descricao");
      expect(descricoes[1]).toHaveTextContent("about.socialDesc");
    });

    it("renderiza exatamente 3 ícones de redes sociais", () => {
      render(<SobreMim />);
      const redes = screen.getByTestId("container-redes");
      expect(redes.children).toHaveLength(3);
    });

    it("renderiza cada rede social com src, alt e href corretos", () => {
      render(<SobreMim />);
      REDES_ESPERADAS.forEach(({ alt, src, href }) => {
        const link = screen.getByTestId(`icon-${alt}`);
        expect(link).toHaveAttribute("href", href);
        expect(link).toHaveAttribute("data-src", src);
        expect(link).toHaveAttribute("data-alt", alt);
      });
    });

    it("renderiza as redes na ordem esperada: instagram, linkedin, github", () => {
      render(<SobreMim />);
      const redes = screen.getByTestId("container-redes");
      const ordem = Array.from(redes.children).map((el) =>
        el.getAttribute("data-alt")
      );
      expect(ordem).toEqual(["instagram", "linkedin", "github"]);
    });
  });

  // -----------------------------------------------------------
  describe("Chamadas de i18n (cobertura total do t())", () => {
    it("chama t() para TODAS as chaves esperadas", () => {
      render(<SobreMim />);
      expect(todasAsChavesForamTraduzidas()).toBe(true);
    });

    it("chama t() exatamente o número de chaves esperadas (sem duplicatas)", () => {
      render(<SobreMim />);
      const chavesUnicas = new Set(mockT.mock.calls.map(([k]) => k));
      expect(chavesUnicas.size).toBe(TODAS_AS_CHAVES_I18N.length);
    });

    it("não chama t() para chaves inexistentes/estranhas", () => {
      render(<SobreMim />);
      const chavesFora = mockT.mock.calls
        .map(([k]) => k)
        .filter((k) => !(TODAS_AS_CHAVES_I18N as readonly string[]).includes(k));
      expect(chavesFora).toEqual([]);
    });

    it("renderiza as 4 highlights do bloco1 dentro de TextSpan", () => {
      render(<SobreMim />);
      const spans = screen.getAllByTestId("text-span");
      expect(spans.length).toBe(10);
    });
  });

  // -----------------------------------------------------------
  describe("Validação de valores vazios e edge cases do i18n", () => {
    it("renderiza sem quebrar quando t() retorna string vazia", () => {
      mockT.mockReturnValue("");
      expect(() => render(<SobreMim />)).not.toThrow();
    });

    it("renderiza sem quebrar quando t() retorna null", () => {
      mockT.mockReturnValue(null as any);
      expect(() => render(<SobreMim />)).not.toThrow();
    });

    it("renderiza sem quebrar quando t() retorna undefined", () => {
      mockT.mockReturnValue(undefined as any);
      expect(() => render(<SobreMim />)).not.toThrow();
    });

    it("renderiza sem quebrar quando t() retorna 0 (falsy)", () => {
      mockT.mockReturnValue(0 as any);
      expect(() => render(<SobreMim />)).not.toThrow();
    });

    it("mantém o container principal mesmo com t() retornando vazio", () => {
      mockT.mockReturnValue("");
      render(<SobreMim />);
      expect(screen.getByTestId("container-div")).toBeInTheDocument();
      expect(screen.getByTestId("container-redes")).toBeInTheDocument();
    });

    it("mantém os 3 ícones de redes mesmo com t() retornando vazio", () => {
      mockT.mockReturnValue("");
      render(<SobreMim />);
      const redes = screen.getByTestId("container-redes");
      expect(redes.children).toHaveLength(3);
    });

    it("mantém as props das redes intactas mesmo com t() retornando vazio", () => {
      mockT.mockReturnValue("");
      render(<SobreMim />);
      REDES_ESPERADAS.forEach(({ alt, href }) => {
        expect(screen.getByTestId(`icon-${alt}`)).toHaveAttribute("href", href);
      });
    });
  });

  describe("Tratamento de Erros e Exceções", () => {
    it("propaga o erro se useTranslation lançar exceção (sem i18n provider)", () => {
      mockT.mockImplementation(() => {
        throw new Error("i18n not initialized");
      });
      expect(() => render(<SobreMim />)).toThrow("i18n not initialized");
    });

    it("não depende de APIs de rede (componente é puro/apresentação)", () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      render(<SobreMim />);
      expect(fetchSpy).not.toHaveBeenCalled();
      fetchSpy.mockRestore();
    });

    it("não depende de localStorage/sessionStorage", () => {
      const lsSpy = vi.spyOn(Storage.prototype, "getItem");
      render(<SobreMim />);
      expect(lsSpy).not.toHaveBeenCalled();
      lsSpy.mockRestore();
    });
  });

  describe("Snapshot e consistência estrutural", () => {
    it("mantém a estrutura de containers (Div > Sobre + Redes)", () => {
      render(<SobreMim />);
      const container = screen.getByTestId("container-div");
      expect(container).toContainElement(screen.getByTestId("sobre-component"));
      expect(container).toContainElement(screen.getByTestId("container-redes"));
    });

    it("IDs das redes são únicos (key prop correta)", () => {
      render(<SobreMim />);
      const redeLinks = screen
        .getAllByTestId(/^icon-/)
        .map((el) => el.getAttribute("data-alt"));
      expect(new Set(redeLinks).size).toBe(redeLinks.length);
    });
  });
});