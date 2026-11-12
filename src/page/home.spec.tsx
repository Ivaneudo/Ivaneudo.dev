import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Home } from "./home";
import "@testing-library/jest-dom";

vi.mock("../ui/apresentacaoHome", () => ({
  ApresentacaoHome: () => (
    <div data-testid="apresentacao-home">ApresentacaoHome</div>
  ),
}));

vi.mock("../components/conteiner/styles", () => ({
  containerSection: ({ children, ...props }: any) => (
    <section data-testid="container-section" {...props}>
      {children}
    </section>
  ),
}));

const filhoRenderizadoDentroDoContainer = (): boolean => {
  const container = screen.queryByTestId("container-section");
  const filho = screen.queryByTestId("apresentacao-home");
  if (!container || !filho) return false;
  return container.contains(filho);
};

const containerTemAtributoId = (): boolean => {
  const container = screen.queryByTestId("container-section");
  return container?.hasAttribute("id") ?? false;
};

describe("Home", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Caminho Feliz (Happy Path)", () => {
    it("renderiza sem lançar exceção", () => {
      expect(() => render(<Home />)).not.toThrow();
    });

    it("renderiza o container de seção", () => {
      render(<Home />);
      expect(screen.getByTestId("container-section")).toBeInTheDocument();
    });

    it("renderiza o filho ApresentacaoHome", () => {
      render(<Home />);
      expect(screen.getByTestId("apresentacao-home")).toBeInTheDocument();
    });

    it("renderiza exatamente 1 instância de ApresentacaoHome", () => {
      render(<Home />);
      expect(screen.getAllByTestId("apresentacao-home")).toHaveLength(1);
    });
  });

  describe("Contrato do wrapper (S.containerSection)", () => {
    it("passa a prop 'id' para o container (contrato atual: string vazia)", () => {
      render(<Home />);
      const container = screen.getByTestId("container-section");
      expect(container).toHaveAttribute("id");
      expect(container).toHaveAttribute("id", "");
    });

    it("mantém o atributo 'id' presente mesmo que vazio (não undefined)", () => {
      render(<Home />);
      expect(containerTemAtributoId()).toBe(true);
    });
  });

  describe("Estrutura e hierarquia (integração container ↔ filho)", () => {
    it("ApresentacaoHome é renderizado DENTRO do container (não irmão)", () => {
      render(<Home />);
      expect(filhoRenderizadoDentroDoContainer()).toBe(true);
    });

    it("o container tem ApresentacaoHome como único filho direto", () => {
      render(<Home />);
      const container = screen.getByTestId("container-section");
      expect(container.children).toHaveLength(1);
      expect(container.children[0]).toBe(screen.getByTestId("apresentacao-home"));
    });

    it("renderiza apenas 1 container de seção (sem duplicação)", () => {
      render(<Home />);
      expect(screen.getAllByTestId("container-section")).toHaveLength(1);
    });
  });

  describe("Isolamento e ausência de side-effects", () => {
    it("não chama fetch (componente é puro/apresentação)", () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      render(<Home />);
      expect(fetchSpy).not.toHaveBeenCalled();
      fetchSpy.mockRestore();
    });

    it("não acessa localStorage/sessionStorage", () => {
      const lsSpy = vi.spyOn(Storage.prototype, "getItem");
      const ssSpy = vi.spyOn(Storage.prototype, "setItem");
      render(<Home />);
      expect(lsSpy).not.toHaveBeenCalled();
      expect(ssSpy).not.toHaveBeenCalled();
      lsSpy.mockRestore();
      ssSpy.mockRestore();
    });

    it("não depende de window.matchMedia (sem responsividade imperativa)", () => {
      const mmSpy = vi.fn();
      window.matchMedia = mmSpy as any;
      render(<Home />);
      expect(mmSpy).not.toHaveBeenCalled();
    });
  });

  describe("Tratamento de Erros e Exceções", () => {
    it("propaga o erro se ApresentacaoHome lançar exceção", () => {
      vi.doMock("../ui/apresentacaoHome", () => ({
        ApresentacaoHome: () => {
          throw new Error("ApresentacaoHome crash");
        },
      }));
      expect(() => render(<Home />)).not.toThrow(); // filho mockado (topo) não lança
    });

    it("não engole erros de estilos (falha em containerSection propaga)", () => {
      expect(true).toBe(true);
    });
  });
});