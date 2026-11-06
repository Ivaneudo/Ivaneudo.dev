import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// =============================================================
// 1. Mocks globais e de dependências externas (no topo do arquivo)
// =============================================================

// Fixtures previsíveis para os 3 arquivos de tradução
const ptFixture = { hello: "Olá", about: { title: "Sobre" } };
const enFixture = { hello: "Hello", about: { title: "About" } };
const esFixture = { hello: "Hola", about: { title: "Acerca" } };

vi.mock("./locales/pt.json", () => ({ default: ptFixture }));
vi.mock("./locales/en.json", () => ({ default: enFixture }));
vi.mock("./locales/es.json", () => ({ default: esFixture }));

// Mock do i18next — capturamos a cadeia .use().use().init()
// e expomos `use` e `init` como spies controláveis.
const mockUse = vi.fn();
const mockInit = vi.fn();

// O objeto mock precisa ser "chainable": use() retorna o próprio i18n mock
const mockI18n = {
  use: mockUse.mockReturnThis(),
  init: mockInit,
};

vi.mock("i18next", () => ({
  default: mockI18n,
}));

// Mocks dos plugins — só validamos que foram registrados, não o comportamento
const mockLanguageDetector = { name: "LanguageDetector" };
const mockInitReactI18next = { name: "initReactI18next" };

vi.mock("i18next-browser-languagedetector", () => ({
  default: mockLanguageDetector,
}));

vi.mock("react-i18next", () => ({
  initReactI18next: mockInitReactI18next,
}));

// =============================================================
// 2. Helpers puros (retornos booleanos explícitos)
// =============================================================

// Cada helper encapsula uma verificação booleana sobre o estado dos mocks.
// Isso evita ternários implícitos nos `expect` e centraliza a lógica.

const initFoiChamado = (): boolean => mockInit.mock.calls.length > 0;

const initFoiChamadoUmaVez = (): boolean => mockInit.mock.calls.length === 1;

const opcoesDoInit = (): Record<string, any> =>
  initFoiChamado() ? mockInit.mock.calls[0][0] : {};

const resourcesContemIdioma = (lng: string): boolean => {
  const opts = opcoesDoInit();
  return Boolean(opts.resources && opts.resources[lng]);
};

const resourcesTemExatamenteOsIdiomasEsperados = (): boolean => {
  const opts = opcoesDoInit();
  if (!opts.resources) return false;
  const chaves = Object.keys(opts.resources).sort();
  return JSON.stringify(chaves) === JSON.stringify(["en", "es", "pt"]);
};

const traducoesDoIdiomaSao = (
  lng: string,
  fixtureEsperada: Record<string, any>
): boolean => {
  const opts = opcoesDoInit();
  const traducao = opts.resources?.[lng]?.translation;
  if (!traducao) return false;
  return JSON.stringify(traducao) === JSON.stringify(fixtureEsperada);
};

const fallbackLngEh = (valor: string): boolean =>
  opcoesDoInit().fallbackLng === valor;

const escapeValueEh = (valor: boolean): boolean =>
  opcoesDoInit().interpolation?.escapeValue === valor;

const pluginFoiRegistrado = (plugin: unknown): boolean =>
  mockUse.mock.calls.some(([p]) => p === plugin);

const totalDePluginsRegistrados = (): number => mockUse.mock.calls.length;

// =============================================================
// 3. Suite de testes
// =============================================================

describe("i18n (configuração)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Restaura comportamento chainable de use()
    mockUse.mockReturnThis();
    // Reimporta o módulo para reexecutar i18n.init() a cada teste
    vi.resetModules();
  });

  afterEach(() => {
    vi.resetModules();
  });

  // Helper local: importa o módulo (dispara init) e devolve o default export
  const importarModulo = async () => {
    const mod = await import("./i18n");
    return mod.default;
  };

  // -----------------------------------------------------------
  describe("Caminho Feliz (Happy Path)", () => {
    it("exporta o objeto i18n como default", async () => {
      const i18n = await importarModulo();
      expect(i18n).toBe(mockI18n);
    });

    it("chama init() exatamente 1 vez no import", async () => {
      await importarModulo();
      expect(initFoiChamadoUmaVez()).toBe(true);
    });

    it("inicializa sem lançar exceção", async () => {
      await expect(importarModulo()).resolves.toBeDefined();
    });
  });

  // -----------------------------------------------------------
  describe("Registro de plugins (.use())", () => {
    it("registra o LanguageDetector", async () => {
      await importarModulo();
      expect(pluginFoiRegistrado(mockLanguageDetector)).toBe(true);
    });

    it("registra o initReactI18next", async () => {
      await importarModulo();
      expect(pluginFoiRegistrado(mockInitReactI18next)).toBe(true);
    });

    it("registra exatamente 2 plugins (nenhum a mais, nenhum a menos)", async () => {
      await importarModulo();
      expect(totalDePluginsRegistrados()).toBe(2);
    });

    it("registra o LanguageDetector ANTES do initReactI18next (ordem importa)", async () => {
      await importarModulo();
      const plugins = mockUse.mock.calls.map(([p]) => p);
      expect(plugins.indexOf(mockLanguageDetector)).toBeLessThan(
        plugins.indexOf(mockInitReactI18next)
      );
    });
  });

  // -----------------------------------------------------------
  describe("Configuração de resources (traduções)", () => {
    it("define resources para pt, en e es", async () => {
      await importarModulo();
      expect(resourcesContemIdioma("pt")).toBe(true);
      expect(resourcesContemIdioma("en")).toBe(true);
      expect(resourcesContemIdioma("es")).toBe(true);
    });

    it("resources tem exatamente os 3 idiomas esperados (sem extras)", async () => {
      await importarModulo();
      expect(resourcesTemExatamenteOsIdiomasEsperados()).toBe(true);
    });

    it("resources.pt.translation recebe ptTranslation", async () => {
      await importarModulo();
      expect(traducoesDoIdiomaSao("pt", ptFixture)).toBe(true);
    });

    it("resources.en.translation recebe enTranslation", async () => {
      await importarModulo();
      expect(traducoesDoIdiomaSao("en", enFixture)).toBe(true);
    });

    it("resources.es.translation recebe esTranslation", async () => {
      await importarModulo();
      expect(traducoesDoIdiomaSao("es", esFixture)).toBe(true);
    });
  });

  // -----------------------------------------------------------
  describe("Configuração de fallback e interpolação", () => {
    it("define fallbackLng como 'pt' (branch de idioma não suportado)", async () => {
      await importarModulo();
      expect(fallbackLngEh("pt")).toBe(true);
    });

    it("desativa escapeValue (interpolation.escapeValue === false)", async () => {
      await importarModulo();
      expect(escapeValueEh(false)).toBe(true);
    });

    it("escapeValue é explicitamente false, não undefined/0/''", async () => {
      await importarModulo();
      const opts = opcoesDoInit();
      expect(opts.interpolation?.escapeValue).toBe(false);
      expect(opts.interpolation?.escapeValue).not.toBe(undefined);
      expect(opts.interpolation?.escapeValue).not.toBe(0);
      expect(opts.interpolation?.escapeValue).not.toBe("");
    });
  });

  // -----------------------------------------------------------
  describe("Validação de valores vazios e edge cases", () => {
    it("não passa opções extras não documentadas para init()", async () => {
      await importarModulo();
      const opts = opcoesDoInit();
      const chavesEsperadas = ["resources", "fallbackLng", "interpolation"];
      const chavesExtras = Object.keys(opts).filter(
        (k) => !chavesEsperadas.includes(k)
      );
      expect(chavesExtras).toEqual([]);
    });

    it("init() recebe um objeto (nunca null/undefined/vazio)", async () => {
      await importarModulo();
      const opts = opcoesDoInit();
      expect(opts).toBeTypeOf("object");
      expect(opts).not.toBeNull();
      expect(Object.keys(opts).length).toBeGreaterThan(0);
    });

    it("resources é um objeto (não array, não null)", async () => {
      await importarModulo();
      const opts = opcoesDoInit();
      expect(opts.resources).toBeTypeOf("object");
      expect(Array.isArray(opts.resources)).toBe(false);
      expect(opts.resources).not.toBeNull();
    });
  });

  // -----------------------------------------------------------
  describe("Tratamento de Erros e Exceções", () => {
    it("propaga erro se init() falhar (config não silencia falhas)", async () => {
      mockInit.mockImplementationOnce(() => {
        throw new Error("init failed");
      });
      await expect(importarModulo()).rejects.toThrow("init failed");
    });

    it("propaga erro se LanguageDetector lançar no registro", async () => {
      mockUse.mockImplementationOnce(() => {
        throw new Error("detector crash");
      });
      await expect(importarModulo()).rejects.toThrow("detector crash");
    });

    it("propaga erro se initReactI18next lançar no registro", async () => {
      // 1ª chamada (LanguageDetector) passa, 2ª (initReactI18next) falha
      mockUse
        .mockReturnThis()
        .mockImplementationOnce(() => mockI18n)
        .mockImplementationOnce(() => {
          throw new Error("react-i18next crash");
        });
      await expect(importarModulo()).rejects.toThrow("react-i18next crash");
    });
  });

  // -----------------------------------------------------------
  describe("Idempotência e reimportação", () => {
    it("reimportar sem resetModules NÃO reinicializa (module cache)", async () => {
      await importarModulo();
      const chamadasAposPrimeiro = mockInit.mock.calls.length;
      await importarModulo(); // segundo import usa cache
      expect(mockInit.mock.calls.length).toBe(chamadasAposPrimeiro);
    });

    it("após resetModules, reimportar dispara init() novamente", async () => {
      await importarModulo();
      expect(mockInit.mock.calls.length).toBe(1);
      vi.resetModules();
      await importarModulo();
      expect(mockInit.mock.calls.length).toBe(2);
    });
  });
});