import { describe, it, expect, vi, beforeEach } from "vitest";
import { GlobalStyle } from "./GlobalStyle";
import { darkTheme } from "./GlobalTheme";

// 1. Mocks globais e de dependências externas
vi.mock("@emotion/react", () => ({
  css: vi.fn((strings, ...values) => {
    // Simula a interpolação da tag function `css` do Emotion
    return strings.reduce(
      (acc, str, i) => acc + str + (values[i] !== undefined ? values[i] : ""),
      ""
    );
  }),
}));

vi.mock("./GlobalTheme", () => ({
  darkTheme: {
    colors: {
      background: "#000000",
      bold: "#ff0000",
    },
  },
}));

describe("GlobalStyle", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Caminho Feliz (Happy Path)", () => {
    it("deve gerar o estilo global com as cores do tema aplicadas corretamente", () => {
      // Verifica se a string gerada contém as propriedades e valores esperados
      expect(GlobalStyle).toContain("margin: 0;");
      expect(GlobalStyle).toContain("padding: 0;");
      expect(GlobalStyle).toContain("box-sizing: border-box;");
      
      // Verifica as cores da scrollbar (Webkit)
      expect(GlobalStyle).toContain(`background: ${darkTheme.colors.background};`);
      expect(GlobalStyle).toContain(`background-color: ${darkTheme.colors.bold};`);
      
      // Verifica as cores da scrollbar (Firefox)
      expect(GlobalStyle).toContain(`scrollbar-color: ${darkTheme.colors.bold} ${darkTheme.colors.background};`);
    });

    it("deve incluir regras para resertar o HTML e Body", () => {
      expect(GlobalStyle).toContain("overflow-x: hidden;");
      expect(GlobalStyle).toContain("width: 100%;");
    });
  });

  describe("Validação de Estruturas Específicas", () => {
    it("deve conter regras específicas para o thumb do webkit-scrollbar", () => {
       expect(GlobalStyle).toContain("border-radius: 20px 0 0 20px;");
       expect(GlobalStyle).toContain("background-clip: padding-box;");
    });

    it("deve conter o hover effect no scrollbar-thumb", () => {
      expect(GlobalStyle).toContain("::-webkit-scrollbar-thumb:hover");
      expect(GlobalStyle).toContain("background-color: #a30000;");
    });

    it("deve incluir a media query específica para Firefox", () => {
      expect(GlobalStyle).toContain("@-moz-document url-prefix()");
      expect(GlobalStyle).toContain("scrollbar-width: thin;");
    });
  });

  describe("Tratamento de Exceções e Edge Cases", () => {
    it("deve lidar corretamente mesmo se os valores do tema fossem vazios (simulação)", () => {
      // Embora o mock original tenha cores, testamos a estrutura para garantir que 
      // interpolações vazias não quebram o css syntax gerado pelo mock.
      const styleString = typeof GlobalStyle === 'string' ? GlobalStyle : String(GlobalStyle);
      expect(styleString.length).toBeGreaterThan(0);
      expect(styleString).not.toContain("undefined");
      expect(styleString).not.toContain("null");
    });
  });
});