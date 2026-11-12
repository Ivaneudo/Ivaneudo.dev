import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Sobre } from "./index";
import "@testing-library/jest-dom";

vi.mock("../../components/Text/styles", () => ({
  Descricao: ({ children }: { children: React.ReactNode }) => (
    <p data-testid="mock-descricao">{children}</p>
  ),
}));

vi.mock("./styles", () => ({
  Blocos: ({ children }: { children: React.ReactNode }) => (
    <section data-testid="mock-blocos">{children}</section>
  ),
  Bloco: ({ children }: { children: React.ReactNode }) => (
    <article data-testid="mock-bloco">{children}</article>
  ),
}));

const mockValidoBase = {
  bloco1: "Conteúdo do primeiro bloco",
  bloco2: <span>Conteúdo em formato Node</span>,
};

describe("Componente <Sobre />", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Caminho Feliz (Happy Path)", () => {
    it("valida o payload mínimo obrigatório renderizando textos simples", () => {
      render(<Sobre bloco1={mockValidoBase.bloco1} bloco2="Texto simples 2" />);
      
      const blocosWrapper = screen.getByTestId("mock-blocos");
      expect(blocosWrapper).toBeInTheDocument();
      
      const descricoes = screen.getAllByTestId("mock-descricao");
      expect(descricoes).toHaveLength(2);
      expect(descricoes[0]).toHaveTextContent("Conteúdo do primeiro bloco");
      expect(descricoes[1]).toHaveTextContent("Texto simples 2");
    });

    it("valida o payload completo com dados ricos (ReactNode)", () => {
      render(<Sobre bloco1={mockValidoBase.bloco1} bloco2={mockValidoBase.bloco2} />);
      
      expect(screen.getByText("Conteúdo em formato Node")).toBeInTheDocument();
    });
  });

  describe("Validação de Campos Opcionais e Borda", () => {
    it("aceita valores vazios (\"\") e não renderiza nós de texto extras", () => {
      render(<Sobre bloco1="" bloco2="" />);
      
      const descricoes = screen.getAllByTestId("mock-descricao");
      expect(descricoes[0]).toBeEmptyDOMElement();
      expect(descricoes[1]).toBeEmptyDOMElement();
    });

    it("aceita valores numéricos limítrofes como 0 sem quebrar a árvore React", () => {
      render(<Sobre bloco1={0} bloco2={-1} />);
      
      const descricoes = screen.getAllByTestId("mock-descricao");
      expect(descricoes[0]).toHaveTextContent("0");
      expect(descricoes[1]).toHaveTextContent("-1");
    });

    it("lida pacificamente com valores null e undefined (comportamento nativo do React)", () => {
      render(<Sobre bloco1={null as any} bloco2={undefined as any} />);
      
      const descricoes = screen.getAllByTestId("mock-descricao");
      expect(descricoes[0]).toBeEmptyDOMElement();
      expect(descricoes[1]).toBeEmptyDOMElement();
    });
  });

  describe("Tratamento de Erros e Exceções", () => {
    let consoleErrorMock: any;

    beforeEach(() => {
      consoleErrorMock = vi.spyOn(console, "error").mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorMock.mockRestore();
    });

    it("retorna falha/lança erro quando recebe um payload malformatado (ex: Objeto puro não serializável)", () => {
      const payloadInvalido = { titulo: "Isto vai quebrar o React" } as any;

      expect(() => {
        render(<Sobre bloco1={payloadInvalido} bloco2="Valido" />);
      }).toThrowError(/Objects are not valid as a React child/i);
    });
  });
});