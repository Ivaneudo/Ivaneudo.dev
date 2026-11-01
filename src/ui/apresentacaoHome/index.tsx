import { Icons } from "../../components/IconsDigitais"
import { Cargo, Resumo, TextSpan } from "../../components/Text/styles"
import { Avatar, HomeDiv, StacksDiv } from "./styles"
import ivaneudoImg from "../../Img/ivaneudo.png"

export const ApresentacaoHome = () => {
  return (
    <HomeDiv id="home">
      <Avatar src={ivaneudoImg} alt="" />
      <Cargo>Desenvolvedor <TextSpan>Full-Stack</TextSpan></Cargo>
      <Resumo>Engenheiro de Software Full-Stack focado em criar aplicações web escaláveis, APIs robustas e experiências digitais com impacto real.</Resumo>
      <StacksDiv>
        <Icons 
          src="https://skillicons.dev/icons?i=react" 
          alt="react"
        />
        <Icons 
          src="https://skillicons.dev/icons?i=emotion" 
          alt="emotion"
        />
        <Icons 
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/quarkus/quarkus-original.svg"
          alt="quarkus"
        />
        <Icons 
          src="https://skillicons.dev/icons?i=spring" 
          alt="springboot"
        />
        <Icons 
          src="https://skillicons.dev/icons?i=postgres" 
          alt="postgreSQL"
        />
        <Icons 
          src="https://skillicons.dev/icons?i=docker" 
          alt="docker"
        />
        <Icons 
          src="https://skillicons.dev/icons?i=arch" 
          alt="arch"
        />
        <Icons 
          src="https://skillicons.dev/icons?i=git" 
          alt="git"
        />
      </StacksDiv>
    </HomeDiv>
  )
}
