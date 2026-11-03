import { Sobre } from "../components/blocosTexto"
import * as S from "../components/conteiner/styles"
import { Icons } from "../components/IconsDigitais"
import { Descricao, TextH2, TextSpan } from "../components/Text/styles"

export const SobreMim = () => {

  const REDES_DATA = [
    { id: "instagram", alt: "instagram", src: "https://skillicons.dev/icons?i=instagram", href: "https://instagram.com/ivaneudo.dev/" },
    { id: "linkedin", alt: "linkedin", src: "https://skillicons.dev/icons?i=linkedin", href: "https://linkedin.com/in/ivaneudo-carvalho/" },
    { id: "github", alt: "github", src: "https://skillicons.dev/icons?i=github", href: "https://github.com/Ivaneudo" }
  ]

  return (
    <S.Div id="sobre-mim">
      <TextH2>Sobre-mim</TextH2>
      <Sobre 
        bloco1={
          <>
            👋 Fala, pessoal! Sou o Ivaneudo, <TextSpan>Técnico em Informática</TextSpan> e graduando em <TextSpan>Engenharia de Software</TextSpan> no INBEC com bolsa integral. Atualmente, atuo como Desenvolvedor B2G, Pesquisador Acadêmico e Líder de Turma do curso. Sou entusiasta do ecossistema <TextSpan>Linux</TextSpan> 🐧 e <TextSpan>Voluntário no Movimento Vera Criança</TextSpan> desde 2023.
          </>
        }
        bloco2={
          <>
            Costumo dizer que sou um cara de Humanas me aventurando no mundo da tecnologia. Antes de chegar ao meu <TextSpan>ensino médio Técnico</TextSpan>, eu era apaixonado por História e pensava em seguir carreira como professor, porém ao conhecer o mundo do desenvolvimento, minha vida mudou completamente. <TextSpan>Hoje meu objetivo principal</TextSpan> é <TextSpan>melhorar minhas aplicações</TextSpan> e <TextSpan>ajudar as pessoas</TextSpan>.
          </>
        }
      />

      <TextH2><TextSpan>Idiomas:</TextSpan></TextH2>
      <Descricao>🇧🇷 Português (Nativo) | 🇪🇦 Español (Intermediário) |  🇨🇦 Inglês (Básico)</Descricao>

      <TextH2><TextSpan>Minhas redes sociais</TextSpan></TextH2>
      <Descricao>Para saber mais sobre mim, acesse as minhas redes sociais:</Descricao>
      <S.Redes>
        {REDES_DATA.map((rede) => (
          <Icons 
            key={rede.id} 
            src={rede.src} 
            alt={rede.alt} 
            href={rede.href} 
          />
        ))}
      </S.Redes>
    </S.Div>
  )
}
