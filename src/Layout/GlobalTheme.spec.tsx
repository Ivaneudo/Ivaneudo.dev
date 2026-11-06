import { describe, it, expect, vi, beforeEach } from "vitest";
import { darkTheme, theme } from "./GlobalTheme";

describe("GlobalTheme", () => {
  beforeEach(() => {
    // Como é um arquivo de constantes, não há mocks de rede para limpar,
    // mas mantemos o padrão estabelecido pelo template de testes.
    vi.clearAllMocks();
  });

  describe("Caminho Feliz (Happy Path)", () => {
    it("valida o payload completo das propriedades obrigatórias do darkTheme", () => {
      expect(darkTheme).toBeDefined();
      expect(darkTheme).toHaveProperty("fonts");
      expect(darkTheme).toHaveProperty("colors");
      expect(darkTheme).toHaveProperty("fontSizes");
      expect(darkTheme).toHaveProperty("breakpoints");
    });

    it("valida que a exportação `theme` é um alias exato e compartilha a mesma referência de `darkTheme`", () => {
      expect(theme).toBe(darkTheme); // Checa a referência de memória
      expect(theme).toEqual(darkTheme); // Checa os valores internos
    });
  });

  describe("Validação de Campos e Valores Estritos", () => {
    it("valida as propriedades e limites exatos da tipografia (fonts)", () => {
      expect(darkTheme.fonts.jetbrains).toBe("'JetBrains Mono', monospace");
      expect(darkTheme.fonts.arial).toBe("Arial, sans-serif");
    });

    it("valida as propriedades e paleta hexadecimal exata de cores (colors)", () => {
      expect(darkTheme.colors.background).toBe("#191A1B");
      expect(darkTheme.colors.backgroundCard).toBe("#D9D9D9");
      expect(darkTheme.colors.text).toBe("#fff");
      expect(darkTheme.colors.bold).toBe("#C90000");
      expect(darkTheme.colors.border).toBe("#C90000");
    });

    it("valida a escala e as unidades exatas dos tamanhos de fonte (fontSizes)", () => {
      expect(darkTheme.fontSizes.small).toBe("22px");
      expect(darkTheme.fontSizes.medium).toBe("24px");
      expect(darkTheme.fontSizes.large).toBe("26px");
      expect(darkTheme.fontSizes.h1).toBe("38px");
      expect(darkTheme.fontSizes.h2).toBe("26px");
    });
  });

  describe("Casos de Borda e Validações Regulares (Edge Cases)", () => {
    it("rejeita valores de breakpoint que não contenham o sufixo 'px' (limites de tela)", () => {
      const pxRegex = /^\d+px$/;
      
      expect(darkTheme.breakpoints.mobile).toMatch(pxRegex);
      expect(darkTheme.breakpoints.mobile).toBe("768px");
      
      expect(darkTheme.breakpoints.tablet).toMatch(pxRegex);
      expect(darkTheme.breakpoints.tablet).toBe("1024px");
    });
  });

  describe("Tratamento de Vazios/Opcionais", () => {
    it("garante que nenhum valor de configuração no tema é undefined, null, string vazia ou zero", () => {
      // Extrai todas as categorias do tema (fonts, colors, etc.)
      const themeCategories = Object.values(darkTheme);
      
      themeCategories.forEach((category) => {
        // Extrai todos os valores internos de cada categoria
        const categoryValues = Object.values(category);
        
        categoryValues.forEach((value) => {
          expect(value).not.toBeNull();
          expect(value).not.toBeUndefined();
          expect(value).not.toBe("");
          expect(value).not.toBe(0);
        });
      });
    });
  });
});