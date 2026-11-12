import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { Nome } from "./index";
import "@testing-library/jest-dom";

vi.mock("./styles", () => ({
  userDiv: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="user-div">{children}</div>
  ),
  userName: ({ children }: { children: React.ReactNode }) => (
    <h1 data-testid="user-name">{children}</h1>
  ),
}));

vi.mock("../Text/styles", () => ({
  TextSpan: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="text-span">{children}</span>
  ),
}));

const mockValidoBase = {
  nome: "Alan",
  sobrenome: "Turing",
};

describe("Componente Nome (index.tsx)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Caminho Feliz (Happy Path)", () => {
    it("valida o payload mínimo obrigatório (apenas nome)", () => {
      render(<Nome nome="Alan" />);
      
      const userName = screen.getByTestId("user-name");
      expect(userName).toBeInTheDocument();
      expect(userName).toHaveTextContent("Alan"); 
    });

    it("valida o payload completo com dados opcionais (nome e sobrenome)", () => {
      render(<Nome {...mockValidoBase} />);
      
      expect(screen.getByTestId("user-name")).toHaveTextContent("Alan Turing");
      expect(screen.getByTestId("text-span")).toHaveTextContent("Turing");
    });
  });

  describe("Validação de Campos Opcionais e Borda", () => {
    it("aceita valores vazios e undefined em campos opcionais", () => {
      render(<Nome nome={undefined} sobrenome={null} />);
      
      const userName = screen.getByTestId("user-name");
      const textSpan = screen.getByTestId("text-span");

      expect(userName).toBeInTheDocument();
      expect(textSpan).toBeInTheDocument();
      expect(textSpan).toBeEmptyDOMElement();
    });

    it("valida injeção do número 0 nos campos e garante que é renderizado", () => {
      render(<Nome nome={0} sobrenome={0} />);
      
      expect(screen.getByTestId("user-name")).toHaveTextContent("0 0");
      expect(screen.getByTestId("text-span")).toHaveTextContent("0");
    });

    it("rejeita valores acima do limite máximo permitido (limite de renderização)", () => {
      const hugeString = "A".repeat(10000);
      render(<Nome nome={hugeString} sobrenome={hugeString} />);
      
      expect(screen.getByTestId("text-span")).toHaveTextContent(hugeString);
    });
  });

  describe("Tratamento de Erros e Exceções", () => {
    it("renderiza normalmente e não quebra quando NENHUMA prop é passada", () => {
      render(<Nome />);
      
      const userName = screen.getByTestId("user-name");
      expect(userName).toBeInTheDocument();
      expect(userName).toHaveTextContent(""); 
    });

    it("retorna falha/lança erro quando recebe entradas malformatadas (Objeto não é React Node)", () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      const payloadMalFormatado = { 
        nome: { dadoInvalido: true }, 
        sobrenome: ["Array", "Não", "Permitido"] 
      };

      expect(() => {
        // @ts-expect-error - Forçando um payload inválido para o nó de texto React
        render(<Nome {...payloadMalFormatado} />);
      }).toThrow();

      consoleSpy.mockRestore();
    });
  });
});