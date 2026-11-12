import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { 
  conteinerGlobal as ConteinerGlobal, 
  containerSection as ContainerSection, 
  Div, 
  Projetos, 
  Redes 
} from "./styles";

const consoleErrorMock = vi.spyOn(console, "error").mockImplementation(() => {});

const mockThemeValido = {
  colors: { background: "#123456" },
  breakpoints: { mobile: "768px" },
};

const mockThemeVazioOuOpcional = {
  colors: { background: "" },
  breakpoints: { mobile: 0 },
};

describe("Styles Components (styles.ts)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Caminho Feliz (Happy Path)", () => {
    it("valida o payload mínimo obrigatório (componentes estáticos sem dependência de tema)", () => {
      const { container: containerSectionNode } = render(<ContainerSection />);
      expect(containerSectionNode.firstChild).toBeInTheDocument();

      const { container: divNode } = render(<Div />);
      expect(divNode.firstChild).toBeInTheDocument();

      const { container: redesNode } = render(<Redes />);
      expect(redesNode.firstChild).toBeInTheDocument();
    });

    it("valida o payload completo com dados opcionais injetando o tema nos componentes dinâmicos", () => {
      const { container: globalNode } = render(<ConteinerGlobal theme={mockThemeValido} />);
      expect(globalNode.firstChild).toBeInTheDocument();

      const { container: projetosNode } = render(<Projetos theme={mockThemeValido} />);
      expect(projetosNode.firstChild).toBeInTheDocument();
    });
  });

  describe("Validação de Campos Opcionais e Borda", () => {
    it("aceita valores vazios e falsy (0, '') em campos de tema dependentes", () => {
      const { container: globalNode } = render(<ConteinerGlobal theme={mockThemeVazioOuOpcional} />);
      expect(globalNode.firstChild).toBeInTheDocument();

      const { container: projetosNode } = render(<Projetos theme={mockThemeVazioOuOpcional} />);
      expect(projetosNode.firstChild).toBeInTheDocument();
    });

    it("rejeita (sem quebrar a renderização) valores undefined, inserindo estilos nulos fallback", () => {
      const themeComUndefined = {
        colors: { background: undefined },
        breakpoints: { mobile: undefined },
      };
      
      const { container: globalNode } = render(<ConteinerGlobal theme={themeComUndefined as any} />);
      expect(globalNode.firstChild).toBeInTheDocument();
    });

    it("testa limites exatos injetando null de forma segura na formatação", () => {
      const themeComNull = {
        colors: { background: null },
        breakpoints: { mobile: null },
      };

      const { container: projetosNode } = render(<Projetos theme={themeComNull as any} />);
      expect(projetosNode.firstChild).toBeInTheDocument();
    });
  });

  describe("Tratamento de Erros e Exceções", () => {
    it("retorna falha (lança exceção) quando o objeto de theme é malformatado ou ausente", () => {

      const themeInvalido = {} as any;

      expect(() => {
        render(<ConteinerGlobal theme={themeInvalido} />);
      }).toThrow();

      expect(() => {
        render(<Projetos theme={themeInvalido} />);
      }).toThrow();
    });

    it("trata falhas ao receber explicitamente 'null' no lugar do objeto Theme", () => {
      expect(() => {
        render(<ConteinerGlobal theme={null as any} />);
      }).toThrow();
      
      expect(() => {
        render(<Projetos theme={null as any} />);
      }).toThrow();
    });
  });
});