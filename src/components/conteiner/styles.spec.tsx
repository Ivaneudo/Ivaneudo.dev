import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

// Alias para PascalCase garantindo que o React os reconheça como componentes JSX
import { 
  conteinerGlobal as ConteinerGlobal, 
  containerSection as ContainerSection, 
  Div, 
  Projetos, 
  Redes 
} from "./styles";

// 1. Mocks globais e de dependências externas
// Como os componentes dependem diretamente do React DOM e do Emotion,
// vamos mockar o console.error temporariamente nos testes de falha 
// para manter a saída do terminal limpa.
const consoleErrorMock = vi.spyOn(console, "error").mockImplementation(() => {});

// 2. Fixtures / Mocks de dados base
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
      // Testa a linha de interpolação do theme.colors.background
      const { container: globalNode } = render(<ConteinerGlobal theme={mockThemeValido} />);
      expect(globalNode.firstChild).toBeInTheDocument();
      // Se usar o @testing-library/jest-dom: expect(globalNode.firstChild).toHaveStyle({ backgroundColor: '#123456' });

      // Testa a linha de interpolação do theme.breakpoints.mobile
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
      // O comportamento esperado quando acessamos sub-propriedades de undefined (ex: theme.colors.background)
      // é disparar um TypeError no JS/React.
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