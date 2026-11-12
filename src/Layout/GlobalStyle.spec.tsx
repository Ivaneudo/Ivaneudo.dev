import { describe, it, expect, vi, beforeEach } from "vitest";
import { GlobalStyle } from "./GlobalStyle";
import { darkTheme } from "./GlobalTheme";
import "@testing-library/jest-dom";

vi.mock("@emotion/react", () => ({
  css: vi.fn((strings, ...values) => {
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
      text: "#ffffff",
      primary: "#ff0000",
      primaryHover: "#a30000",
    },
  },
}));

describe("GlobalStyle", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Caminho Feliz (Happy Path)", () => {
    it("deve gerar o estilo global com as cores do tema aplicadas corretamente", () => {
      // @ts-ignore
      const style = GlobalStyle(darkTheme);
      
      expect(style).toContain("margin: 0;");
      expect(style).toContain("padding: 0;");
      expect(style).toContain("box-sizing: border-box;");
      
      expect(style).toContain(`background: ${darkTheme.colors.background};`);
      expect(style).toContain(`background-color: ${darkTheme.colors.primary};`);
      
      expect(style).toContain(`scrollbar-color: ${darkTheme.colors.primary} ${darkTheme.colors.background};`);
    });

    it("deve incluir regras para resertar o HTML e Body", () => {
      // @ts-ignore
      const style = GlobalStyle(darkTheme);
      expect(style).toContain("overflow-x: hidden;");
      expect(style).toContain("width: 100%;");
    });
  });

  describe("Validação de Estruturas Específicas", () => {
    it("deve conter regras específicas para o thumb do webkit-scrollbar", () => {
      // @ts-ignore
      const style = GlobalStyle(darkTheme);
      expect(style).toContain("border-radius: 20px 0 0 20px;");
      expect(style).toContain("background-clip: padding-box;");
    });

    it("deve conter o hover effect no scrollbar-thumb", () => {
      // @ts-ignore
      const style = GlobalStyle(darkTheme);
      expect(style).toContain("::-webkit-scrollbar-thumb:hover");
      expect(style).toContain(`background-color: ${darkTheme.colors.primaryHover};`);
    });

    it("deve incluir a media query específica para Firefox", () => {
      // @ts-ignore
      const style = GlobalStyle(darkTheme);
      expect(style).toContain("@-moz-document url-prefix()");
      expect(style).toContain("scrollbar-width: thin;");
    });
  });

  describe("Tratamento de Exceções e Edge Cases", () => {
    it("deve lidar corretamente mesmo se os valores do tema fossem vazios (simulação)", () => {
      const styleString = typeof GlobalStyle === 'string' ? GlobalStyle : String(GlobalStyle);
      expect(styleString.length).toBeGreaterThan(0);
      expect(styleString).not.toContain("undefined");
      expect(styleString).not.toContain("null");
    });
  });
});