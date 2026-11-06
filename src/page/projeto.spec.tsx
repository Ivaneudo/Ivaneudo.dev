import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Projetos } from "./projeto";

// =============================================================
// 1. Mocks globais e de dependências externas (no topo do arquivo)
// =============================================================

// Mock do react-i18next — controlado por teste
const mockT = vi.fn((key: string) => key);
vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: mockT }),
}));

// Mock de imports de imagem — Vitest não resolve PNG por padrão em ambiente jsdom
vi.mock("../Img/vera-crianca.png", () => ({ default: "/mock/vera-crianca.png" }));
vi.mock("../Img/limpo.png", () => ({ default: "/mock/limpo.png" }));
vi.mock("../Img/fica-comigo.png", () => ({ default: "/mock/fica-comigo.png" }));
vi.mock("../Img/arch.png", () => ({ default: "/mock/arch.png" }));

// Mock do componente Projeto — expõe cada prop como data-attribute para assert
vi.mock("../components/Projeto/index", () => ({
  Projeto: ({
    nome,
    imagem,
    altImg,
    resumo,
    url,
    link,
    tecnologias,
  }: {
    nome: string;
    imagem: string;
    altImg: string;
    resumo: string;
    url: string;
    link?: string;
    tecnologias: React.ReactNode[];
  }) => (
    <div
      data-testid={`projeto-${nome}`}
      data-nome={nome}
      data-alt-img={altImg}
      data-resumo={resumo}
      data-url={url}
      data-link={link ?? "__AUSENTE__"}
      data-tecnologias-count={tecnologias.length}
    >
      {/* img principal do projeto — fiel ao componente real */}
      <img
        data-testid={`projeto-${nome}-img`}
        src={imagem}
        alt={altImg}
      />
      <div data-testid={`projeto-${nome}-tecnologias`}>{tecnologias}</div>
    </div>
  ),
}));

// Mock dos estilos
vi.mock("../components/conteiner/styles", () => ({
  Div: ({ children, ...props }: any) => (
    <div data-testid="container-div" {...props}>
      {children}
    </div>
  ),
}));

vi.mock("../components/Text/styles", () => ({
  TextH2: ({ children }: any) => <h2 data-testid="text-h2">{children}</h2>,
}));

// =============================================================
// 2. Fixtures / Helpers puros (refatoração booleana explícita)
// =============================================================

// Fonte única de verdade sobre os projetos esperados
const PROJETOS_ESPERADOS = [
  {
    nome: "Raizes Digitais",
    imagem: "/mock/vera-crianca.png",
    altKey: "projects.raizes.alt",
    resumoKey: "projects.raizes.summary",
    url: "https://github.com/veracrianca/movimento",
    link: "https://movimentoveracrianca.vercel.app/",
    tecnologiasCount: 3,
    temLink: true,
  },
  {
    nome: "Limpo Serviço",
    imagem: "/mock/limpo.png",
    altKey: "projects.limpo.alt",
    resumoKey: "projects.limpo.summary",
    url: "https://github.com/Ivaneudo/Limpo",
    link: "https://limpo.vercel.app/",
    tecnologiasCount: 3,
    temLink: true,
  },
  {
    nome: "Fica Comigo",
    imagem: "/mock/fica-comigo.png",
    altKey: "projects.ficaComigo.alt",
    resumoKey: "projects.ficaComigo.summary",
    url: "https://github.com/Ivaneudo/fica-comigo",
    link: undefined, // não renderizado no componente (props omitidas)
    tecnologiasCount: 3,
    temLink: false,
  },
  {
    nome: "Arch + Hyprland",
    imagem: "/mock/arch.png",
    altKey: "projects.arch.alt",
    resumoKey: "projects.arch.summary",
    url: "https://github.com/Ivaneudo/Arch-Hyprland",
    link: undefined, // sem link no componente
    tecnologiasCount: 2,
    temLink: false,
  },
] as const;

const TODAS_AS_CHAVES_I18N = [
  "projects.title",
  ...PROJETOS_ESPERADOS.flatMap((p) => [p.altKey, p.resumoKey]),
] as const;

// Helpers puros com retorno booleano explícito
const chaveFoiTraduzida = (key: string): boolean =>
  mockT.mock.calls.some(([k]) => k === key);

const todasAsChavesForamTraduzidas = (): boolean =>
  TODAS_AS_CHAVES_I18N.every((k) => chaveFoiTraduzida(k));

const projetoRecebeuLink = (nome: string): boolean => {
  const el = screen.getByTestId(`projeto-${nome}`);
  return el.getAttribute("data-link") !== "__AUSENTE__";
};

// =============================================================
// 3. Suite de testes
// =============================================================

describe("Projetos", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockT.mockImplementation((key: string) => key);
  });

  // -----------------------------------------------------------
  describe("Caminho Feliz (Happy Path)", () => {
    it("renderiza o container principal com id 'projetos'", () => {
      render(<Projetos />);
      const container = screen.getByTestId("container-div");
      expect(container).toBeInTheDocument();
      expect(container).toHaveAttribute("id", "projetos");
    });

    it("renderiza o título traduzido", () => {
      render(<Projetos />);
      expect(screen.getByTestId("text-h2")).toHaveTextContent("projects.title");
    });

    it("renderiza exatamente 4 projetos", () => {
      render(<Projetos />);
      const projetos = screen.getAllByTestId(/^projeto-[^-]+.*(?<!-tecnologias)$/);
      // Alternativa mais simples: contar pelos data-nome
      const todos = document.querySelectorAll("[data-nome]");
      expect(todos).toHaveLength(4);
      expect(projetos.length).toBeGreaterThanOrEqual(4);
    });

    it.each(PROJETOS_ESPERADOS)(
      "renderiza o projeto '$nome' com todas as props corretas",
      ({ nome, imagem, altKey, resumoKey, url, tecnologiasCount }) => {
        render(<Projetos />);
        const el = screen.getByTestId(`projeto-${nome}`);
        expect(screen.getByTestId(`projeto-${nome}-img`)).toHaveAttribute("src", imagem);
        expect(el).toHaveAttribute("data-alt-img", altKey);
        expect(el).toHaveAttribute("data-resumo", resumoKey);
        expect(el).toHaveAttribute("data-url", url);
        expect(el).toHaveAttribute("data-tecnologias-count", String(tecnologiasCount));
      }
    );

    it("renderiza cada projeto com o número correto de ícones de tecnologia", () => {
      render(<Projetos />);
      const contagens = PROJETOS_ESPERADOS.map(({ nome }) => {
        const el = screen.getByTestId(`projeto-${nome}-tecnologias`);
        return el.children.length;
      });
      expect(contagens).toEqual([3, 3, 3, 2]);
    });
  });

  // -----------------------------------------------------------
  describe("Validação do campo opcional 'link' (branch principal)", () => {
    it("passa 'link' para Raizes Digitais", () => {
      render(<Projetos />);
      expect(screen.getByTestId("projeto-Raizes Digitais")).toHaveAttribute(
        "data-link",
        "https://movimentoveracrianca.vercel.app/"
      );
    });

    it("passa 'link' para Limpo Serviço", () => {
      render(<Projetos />);
      expect(screen.getByTestId("projeto-Limpo Serviço")).toHaveAttribute(
        "data-link",
        "https://limpo.vercel.app/"
      );
    });

    it("NÃO passa 'link' para Fica Comigo (branch opcional)", () => {
      render(<Projetos />);
      expect(projetoRecebeuLink("Fica Comigo")).toBe(false);
    });

    it("NÃO passa 'link' para Arch + Hyprland (branch opcional)", () => {
      render(<Projetos />);
      expect(projetoRecebeuLink("Arch + Hyprland")).toBe(false);
    });

    it("exatamente 2 projetos recebem link e 2 não recebem", () => {
      render(<Projetos />);
      const comLink = PROJETOS_ESPERADOS.filter((p) => projetoRecebeuLink(p.nome));
      const semLink = PROJETOS_ESPERADOS.filter((p) => !projetoRecebeuLink(p.nome));
      expect(comLink).toHaveLength(2);
      expect(semLink).toHaveLength(2);
    });
  });

  // -----------------------------------------------------------
  describe("Chamadas de i18n (cobertura total do t())", () => {
    it("chama t() para TODAS as chaves esperadas", () => {
      render(<Projetos />);
      expect(todasAsChavesForamTraduzidas()).toBe(true);
    });

    it("chama t() exatamente 9 vezes (1 título + 4 alt + 4 resumo)", () => {
      render(<Projetos />);
      expect(mockT).toHaveBeenCalledTimes(9);
    });

    it("não chama t() para chaves inexistentes", () => {
      render(<Projetos />);
      const chavesFora = mockT.mock.calls
        .map(([k]) => k)
        .filter((k) => !(TODAS_AS_CHAVES_I18N as readonly string[]).includes(k));
      expect(chavesFora).toEqual([]);
    });

    it("não chama t() para traduzir o campo 'nome' (nomes são fixos)", () => {
      render(<Projetos />);
      const chamadasDeNome = mockT.mock.calls.filter(([k]) =>
        String(k).toLowerCase().includes("nome")
      );
      expect(chamadasDeNome).toEqual([]);
    });
  });

  // -----------------------------------------------------------
  describe("Validação de valores vazios e edge cases do i18n", () => {
    it("renderiza sem quebrar quando t() retorna string vazia", () => {
      mockT.mockReturnValue("");
      expect(() => render(<Projetos />)).not.toThrow();
    });

    it("renderiza sem quebrar quando t() retorna null", () => {
      mockT.mockReturnValue(null as any);
      expect(() => render(<Projetos />)).not.toThrow();
    });

    it("renderiza sem quebrar quando t() retorna undefined", () => {
      mockT.mockReturnValue(undefined as any);
      expect(() => render(<Projetos />)).not.toThrow();
    });

    it("renderiza sem quebrar quando t() retorna 0 (falsy)", () => {
      mockT.mockReturnValue(0 as any);
      expect(() => render(<Projetos />)).not.toThrow();
    });

    it("mantém os 4 projetos renderizados mesmo com t() vazio", () => {
      mockT.mockReturnValue("");
      render(<Projetos />);
      expect(document.querySelectorAll("[data-nome]")).toHaveLength(4);
    });

    it("mantém os arrays de tecnologias intactos mesmo com t() vazio", () => {
      mockT.mockReturnValue("");
      render(<Projetos />);
      const contagens = PROJETOS_ESPERADOS.map(
        ({ nome }) => screen.getByTestId(`projeto-${nome}-tecnologias`).children.length
      );
      expect(contagens).toEqual([3, 3, 3, 2]);
    });

    it("mantém URLs e imagens intactas mesmo com t() vazio (não são traduzíveis)", () => {
      mockT.mockReturnValue("");
      render(<Projetos />);
      PROJETOS_ESPERADOS.forEach(({ nome, imagem, url }) => {
        expect(screen.getByTestId(`projeto-${nome}-img`)).toHaveAttribute("src", imagem);
        expect(screen.getByTestId(`projeto-${nome}`)).toHaveAttribute("data-url", url);
      });
    });
  });

  // -----------------------------------------------------------
  describe("Tratamento de Erros e Exceções", () => {
    it("propaga o erro se t() lançar exceção (sem i18n provider)", () => {
      mockT.mockImplementation(() => {
        throw new Error("i18n not initialized");
      });
      expect(() => render(<Projetos />)).toThrow("i18n not initialized");
    });

    it("não depende de fetch (componente é puro/apresentação)", () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      render(<Projetos />);
      expect(fetchSpy).not.toHaveBeenCalled();
      fetchSpy.mockRestore();
    });

    it("não depende de localStorage/sessionStorage", () => {
      const lsSpy = vi.spyOn(Storage.prototype, "getItem");
      render(<Projetos />);
      expect(lsSpy).not.toHaveBeenCalled();
      lsSpy.mockRestore();
    });

    it("não dispara navegação programática (window.open) ao renderizar", () => {
      const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);
      render(<Projetos />);
      expect(openSpy).not.toHaveBeenCalled();
      openSpy.mockRestore();
    });

    it("não altera window.location.href (jsdom não permite spy em assign)", () => {
      const hrefAntes = window.location.href;
      render(<Projetos />);
      expect(window.location.href).toBe(hrefAntes);
    });
  });

  // -----------------------------------------------------------
  describe("Consistência estrutural e unicidade", () => {
    it("mantém a estrutura Div > TextH2 + 4 Projetos", () => {
      render(<Projetos />);
      const container = screen.getByTestId("container-div");
      expect(container).toContainElement(screen.getByTestId("text-h2"));
      expect(document.querySelectorAll("[data-nome]")).toHaveLength(4);
    });

    it("nomes dos projetos são únicos (key prop correta no map implícito)", () => {
      render(<Projetos />);
      const nomes = Array.from(document.querySelectorAll("[data-nome]")).map(
        (el) => el.getAttribute("data-nome")
      );
      expect(new Set(nomes).size).toBe(nomes.length);
    });

    it("URLs de repositório são únicas por projeto", () => {
      render(<Projetos />);
      const urls = Array.from(document.querySelectorAll("[data-url]")).map(
        (el) => el.getAttribute("data-url")
      );
      expect(new Set(urls).size).toBe(urls.length);
    });

    it("cada projeto renderiza exatamente 1 imagem principal", () => {
      render(<Projetos />);
      PROJETOS_ESPERADOS.forEach(({ nome }) => {
        expect(screen.getByTestId(`projeto-${nome}-img`)).toBeInTheDocument();
        expect(screen.getAllByTestId(`projeto-${nome}-img`)).toHaveLength(1);
      });
    });

    it("as imagens dos projetos têm src distintos (não duplicadas)", () => {
      render(<Projetos />);
      const srcs = PROJETOS_ESPERADOS.map(({ nome }) =>
        screen.getByTestId(`projeto-${nome}-img`).getAttribute("src")
      );
      expect(new Set(srcs).size).toBe(srcs.length);
    });
  });
});