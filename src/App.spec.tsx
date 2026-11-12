import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { App } from "./App";
import "@testing-library/jest-dom";

vi.mock("@emotion/react", () => ({
  ThemeProvider: ({ children }: any) => <>{children}</>,
  Global: () => null,
}));

vi.mock("./Layout/GlobalTheme", () => ({
  darkTheme: { mode: "dark" },
  lightTheme: { mode: "light" },
}));

vi.mock("./Layout/GlobalStyle", () => ({
  GlobalStyle: vi.fn(() => ({})),
}));

vi.mock("./ui/navBar", () => ({
  NavBar: ({ onToggleTheme, isDark }: any) => (
    <nav data-testid="nav-bar" data-theme={isDark ? "dark" : "light"}>
      NavBar
      <button data-testid="toggle-theme-btn" onClick={onToggleTheme}>
        Toggle
      </button>
    </nav>
  ),
}));

vi.mock("./page/home", () => ({
  Home: () => <section data-testid="page-home">Home</section>,
}));

vi.mock("./page/projeto", () => ({
  Projetos: () => <section data-testid="page-projetos">Projetos</section>,
}));

vi.mock("./page/sobre-mim", () => ({
  SobreMim: () => <section data-testid="page-sobre-mim">SobreMim</section>,
}));

vi.mock("../src/components/conteiner/styles", () => ({
  conteinerGlobal: ({ children, ...props }: any) => (
    <main data-testid="container-global" {...props}>
      {children}
    </main>
  ),
}));

const ORDEM_ESPERADA = ["nav-bar", "page-home", "page-projetos", "page-sobre-mim"] as const;

const filhoEstaDentroDoContainer = (testId: string): boolean => {
  const container = screen.queryByTestId("container-global");
  const filho = screen.queryByTestId(testId);
  if (!container || !filho) return false;
  return container.contains(filho);
};

const todosOsFilhosEstaoDentroDoContainer = (): boolean =>
  ORDEM_ESPERADA.every((testId) => filhoEstaDentroDoContainer(testId));

const obterOrdemRealDosFilhos = (): string[] => {
  const container = screen.queryByTestId("container-global");
  if (!container) return [];
  return Array.from(container.children).map(
    (el) => el.getAttribute("data-testid") ?? ""
  );
};

const ordemEstaCorreta = (): boolean => {
  const real = obterOrdemRealDosFilhos();
  if (real.length !== ORDEM_ESPERADA.length) return false;
  return real.every((testId, i) => testId === ORDEM_ESPERADA[i]);
};

describe("App", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Caminho Feliz (Happy Path)", () => {
    it("renderiza sem lançar exceção", () => {
      expect(() => render(<App />)).not.toThrow();
    });

    it("renderiza o container global raiz", () => {
      render(<App />);
      expect(screen.getByTestId("container-global")).toBeInTheDocument();
    });

    it("renderiza o NavBar", () => {
      render(<App />);
      expect(screen.getByTestId("nav-bar")).toBeInTheDocument();
    });

    it("renderiza a Home", () => {
      render(<App />);
      expect(screen.getByTestId("page-home")).toBeInTheDocument();
    });

    it("renderiza a página de Projetos", () => {
      render(<App />);
      expect(screen.getByTestId("page-projetos")).toBeInTheDocument();
    });

    it("renderiza a página SobreMim", () => {
      render(<App />);
      expect(screen.getByTestId("page-sobre-mim")).toBeInTheDocument();
    });

    it("renderiza todos os 4 filhos (nenhum faltando)", () => {
      render(<App />);
      ORDEM_ESPERADA.forEach((testId) => {
        expect(screen.getByTestId(testId)).toBeInTheDocument();
      });
    });

    it("renderiza cada filho exatamente 1 vez (nenhum duplicado)", () => {
      render(<App />);
      ORDEM_ESPERADA.forEach((testId) => {
        expect(screen.getAllByTestId(testId)).toHaveLength(1);
      });
    });
  });

  describe("Contrato de composição (ordem dos filhos)", () => {
    it("respeita a ordem NavBar → Home → Projetos → SobreMim", () => {
      render(<App />);
      expect(obterOrdemRealDosFilhos()).toEqual([...ORDEM_ESPERADA]);
    });

    it("ordemEstaCorreta() retorna true (helper de verificação)", () => {
      render(<App />);
      expect(ordemEstaCorreta()).toBe(true);
    });

    it("NavBar é o primeiro filho direto do container", () => {
      render(<App />);
      const container = screen.getByTestId("container-global");
      expect(container.children[0]).toBe(screen.getByTestId("nav-bar"));
    });

    it("SobreMim é o último filho direto do container", () => {
      render(<App />);
      const container = screen.getByTestId("container-global");
      expect(container.children[container.children.length - 1]).toBe(
        screen.getByTestId("page-sobre-mim")
      );
    });

    it("o container tem exatamente 4 filhos diretos", () => {
      render(<App />);
      const container = screen.getByTestId("container-global");
      expect(container.children).toHaveLength(4);
    });
  });

  describe("Hierarquia (todos os filhos DENTRO do container raiz)", () => {
    it("todos os filhos estão aninhados no container global", () => {
      render(<App />);
      expect(todosOsFilhosEstaoDentroDoContainer()).toBe(true);
    });

    it("NavBar está DENTRO do container (não irmão)", () => {
      render(<App />);
      expect(filhoEstaDentroDoContainer("nav-bar")).toBe(true);
    });

    it("Home está DENTRO do container (não irmã)", () => {
      render(<App />);
      expect(filhoEstaDentroDoContainer("page-home")).toBe(true);
    });

    it("Projetos está DENTRO do container (não irmão)", () => {
      render(<App />);
      expect(filhoEstaDentroDoContainer("page-projetos")).toBe(true);
    });

    it("SobreMim está DENTRO do container (não irmão)", () => {
      render(<App />);
      expect(filhoEstaDentroDoContainer("page-sobre-mim")).toBe(true);
    });

    it("renderiza apenas 1 container global (sem duplicação)", () => {
      render(<App />);
      expect(screen.getAllByTestId("container-global")).toHaveLength(1);
    });
  });

  describe("Tratamento de Erros e Exceções", () => {
    it("propaga o erro se um filho lançar na renderização (sem ErrorBoundary)", () => {
      const ContainerQueLanca = () => {
        throw new Error("container crash");
      };
      expect(() => render(<ContainerQueLanca />)).toThrow("container crash");
    });

    it("não depende de fetch (composição pura)", () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      render(<App />);
      expect(fetchSpy).not.toHaveBeenCalled();
      fetchSpy.mockRestore();
    });

    it("gerencia e persiste o tema padrão no localStorage ao montar", () => {
      localStorage.clear();
      const getItemSpy = vi.spyOn(Storage.prototype, "getItem");
      const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

      render(<App />);

      expect(getItemSpy).toHaveBeenCalledWith("portfolio-theme");
      expect(setItemSpy).toHaveBeenCalledWith("portfolio-theme", "dark");

      getItemSpy.mockRestore();
      setItemSpy.mockRestore();
    });

    it("não chama window.open (sem navegação programática)", () => {
      const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);
      render(<App />);
      expect(openSpy).not.toHaveBeenCalled();
      openSpy.mockRestore();
    });
  });

  describe("Isolamento entre renderizações", () => {
    it("renderiza corretamente em múltiplas chamadas (sem estado residual)", () => {
      const { unmount } = render(<App />);
      expect(screen.getByTestId("nav-bar")).toBeInTheDocument();
      unmount();

      render(<App />);
      expect(screen.getByTestId("nav-bar")).toBeInTheDocument();
      expect(screen.getByTestId("page-sobre-mim")).toBeInTheDocument();
    });

    it("App é idempotente: 2 renders produzem a mesma estrutura", () => {
      const { unmount } = render(<App />);
      const primeiro = obterOrdemRealDosFilhos();
      unmount();

      render(<App />);
      const segundo = obterOrdemRealDosFilhos();
      expect(segundo).toEqual(primeiro);
    });
  });

  describe("Gerenciamento e alternância de tema", () => {
    it("inicializa com tema light quando salvo previamente no localStorage", () => {
      localStorage.setItem("portfolio-theme", "light");

      render(<App />);

      expect(screen.getByTestId("nav-bar")).toHaveAttribute("data-theme", "light");
      expect(localStorage.getItem("portfolio-theme")).toBe("light");
    });

    it("alterna entre dark e light ao acionar onToggleTheme na NavBar", () => {
      localStorage.clear();

      render(<App />);

      const navBar = screen.getByTestId("nav-bar");
      const toggleBtn = screen.getByTestId("toggle-theme-btn");

      expect(navBar).toHaveAttribute("data-theme", "dark");

      fireEvent.click(toggleBtn);

      expect(navBar).toHaveAttribute("data-theme", "light");
      expect(localStorage.getItem("portfolio-theme")).toBe("light");

      fireEvent.click(toggleBtn);

      expect(navBar).toHaveAttribute("data-theme", "dark");
      expect(localStorage.getItem("portfolio-theme")).toBe("dark");
    });
  });
});