import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ListNav } from "./index";
import "@testing-library/jest-dom";

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
      render(
        <ListNav href={mockValidoBase.href}>
          {mockValidoBase.children}
        </ListNav>
      );

      const navLink = screen.getByTestId("mock-nav-link");
      
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
      
      fireEvent.click(navLink);
      fireEvent.click(navLink);
      fireEvent.click(navLink);

      expect(onClickMock).toHaveBeenCalledTimes(3);
    });
  });
});