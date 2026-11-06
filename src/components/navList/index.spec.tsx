import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ListNav } from "./index";

// 1. Mocks globais e de dependências externas
// Mockamos o módulo de estilos para isolar a lógica do ListNav
// e garantir que ele está repassando as props corretamente.
vi.mock("./styles", () => ({
  navItem: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-nav-item">{children}</div>
  ),
  navLink: ({ children, href, isActive, onClick }: any) => (
    <a
      data-testid="mock-nav-link"
      href={href}
      data-isactive={isActive !== undefined ? String(isActive) : "undefined"}
      onClick={onClick}
    >
      {children}
    </a>
  ),
}));

// 2. Fixtures / Mocks de dados base
const mockValidoBase = {
  href: "/dashboard",
  children: "Dashboard",
};

describe("ListNav", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Caminho Feliz (Happy Path)", () => {
    it("valida o payload mínimo obrigatório", () => {
      render(
        <ListNav href={mockValidoBase.href}>
          {mockValidoBase.children}
        </ListNav>
      );

      const navLink = screen.getByTestId("mock-nav-link");
      
      expect(screen.getByTestId("mock-nav-item")).toBeInTheDocument();
      expect(navLink).toBeInTheDocument();
      expect(navLink).toHaveAttribute("href", "/dashboard");
      expect(navLink).toHaveTextContent("Dashboard");
      // Verifica repasse do opcional como undefined no mínimo obrigatório
      expect(navLink).toHaveAttribute("data-isactive", "undefined"); 
    });

    it("valida o payload completo com dados opcionais", () => {
      const onClickMock = vi.fn();
      
      render(
        <ListNav 
          href="/settings" 
          isActive={true} 
          onClick={onClickMock}
        >
          Configurações
        </ListNav>
      );

      const navLink = screen.getByTestId("mock-nav-link");
      
      expect(navLink).toHaveAttribute("href", "/settings");
      expect(navLink).toHaveAttribute("data-isactive", "true");
      expect(navLink).toHaveTextContent("Configurações");

      // Validando a ação do payload completo
      fireEvent.click(navLink);
      expect(onClickMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("Validação de Campos Opcionais e Borda", () => {
    it("aceita valores vazios (string vazia) no href e children", () => {
      render(<ListNav href="">{""}</ListNav>);

      const navLink = screen.getByTestId("mock-nav-link");
      expect(navLink).toHaveAttribute("href", "");
      expect(navLink).toBeEmptyDOMElement();
    });

    it("aceita valores undefined/falsy explícitos em campos opcionais", () => {
      render(
        <ListNav 
          href={mockValidoBase.href} 
          isActive={false} 
          onClick={undefined}
        >
          {mockValidoBase.children}
        </ListNav>
      );

      const navLink = screen.getByTestId("mock-nav-link");
      expect(navLink).toHaveAttribute("data-isactive", "false");
    });
    
    it("renderiza children complexos (nós HTML/ReactNode)", () => {
      render(
        <ListNav href="/profile">
          <span data-testid="child-span">Ícone</span>
        </ListNav>
      );

      expect(screen.getByTestId("child-span")).toBeInTheDocument();
      expect(screen.getByTestId("child-span")).toHaveTextContent("Ícone");
    });
  });

  describe("Tratamento de Erros e Exceções", () => {
    it("não quebra a aplicação ao clicar em um link sem a prop onClick (fallback implícito)", () => {
      // Como o onClick é opcional, garantir que o componente lida bem 
      // quando um clique acontece mas a função não foi passada.
      render(
        <ListNav href={mockValidoBase.href}>
          {mockValidoBase.children}
        </ListNav>
      );

      const navLink = screen.getByTestId("mock-nav-link");
      
      // A ação de clique não deve lançar erros
      expect(() => fireEvent.click(navLink)).not.toThrow();
    });

    it("rejeita comportamentos inesperados ao simular múltiplos cliques acidentais rápidos", () => {
      const onClickMock = vi.fn();
      render(
        <ListNav href={mockValidoBase.href} onClick={onClickMock}>
          {mockValidoBase.children}
        </ListNav>
      );

      const navLink = screen.getByTestId("mock-nav-link");
      
      // Simula double click / triple click rápidos
      fireEvent.click(navLink);
      fireEvent.click(navLink);
      fireEvent.click(navLink);

      // O componente deve repassar todos os cliques fielmente, 
      // delegando o tratamento de debounce para o pai, se existir.
      expect(onClickMock).toHaveBeenCalledTimes(3);
    });
  });
});