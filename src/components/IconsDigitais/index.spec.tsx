import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Icons } from "./index";
import "@testing-library/jest-dom";

vi.mock("./styles", () => ({
  IconsDig: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));

const mockValidoBase = {
  src: "/path/to/icon.svg",
  alt: "Ícone Ilustrativo",
};

describe("Componente <Icons />", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Caminho Feliz (Happy Path)", () => {
    it("valida a renderização básica (payload mínimo obrigatório sem href)", () => {
      render(<Icons src={mockValidoBase.src} alt={mockValidoBase.alt} />);

      const imagem = screen.getByRole("img", { name: mockValidoBase.alt });
      
      expect(imagem).toBeInTheDocument();
      expect(imagem).toHaveAttribute("src", mockValidoBase.src);
      expect(screen.queryByRole("link")).not.toBeInTheDocument();
    });

    it("valida a renderização dentro de um link (payload completo com href)", () => {
      const hrefMock = "https://example.com";
      render(
        <Icons
          src={mockValidoBase.src}
          alt={mockValidoBase.alt}
          href={hrefMock}
        />
      );

      const link = screen.getByRole("link");
      const imagem = screen.getByRole("img", { name: mockValidoBase.alt });

      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", hrefMock);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
      expect(link).toContainElement(imagem);
    });
  });

  describe("Validação de Campos Opcionais e Borda", () => {
    it("aceita undefined em href e renderiza apenas a imagem", () => {
      render(
        <Icons
          src={mockValidoBase.src}
          alt={mockValidoBase.alt}
          href={undefined}
        />
      );

      expect(screen.getByRole("img")).toBeInTheDocument();
      expect(screen.queryByRole("link")).not.toBeInTheDocument();
    });

    it("trata href como string vazia (\"\") como falsy e renderiza apenas a imagem", () => {
      render(
        <Icons
          src={mockValidoBase.src}
          alt={mockValidoBase.alt}
          href=""
        />
      );

      expect(screen.getByRole("img")).toBeInTheDocument();
      expect(screen.queryByRole("link")).not.toBeInTheDocument();
    });

    it("trata alt como string vazia (\"\") mantendo a imagem no documento sem acessibilidade por nome", () => {
      render(<Icons src={mockValidoBase.src} alt="" />);

      const imagem = screen.getByAltText("");
      expect(imagem).toBeInTheDocument();
    });

    it("trata src como string vazia (\"\") e repassa para a tag da imagem", () => {
      render(<Icons src="" alt={mockValidoBase.alt} />);

      const imagem = screen.getByRole("img", { name: mockValidoBase.alt });
      expect(imagem).toHaveAttribute("src", "");
    });
  });

  describe("Tratamento de Diferentes Formatos de Links", () => {
    it("suporta links relativos mantendo as propriedades de segurança no <a>", () => {
      const hrefRelativo = "/contato";
      render(
        <Icons
          src={mockValidoBase.src}
          alt={mockValidoBase.alt}
          href={hrefRelativo}
        />
      );

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", hrefRelativo);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });
});