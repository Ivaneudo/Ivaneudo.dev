import { useTranslation } from "react-i18next";
import { Icons } from "../../components/IconsDigitais";
import { Cargo, Resumo, TextSpan } from "../../components/Text/styles";
import { Avatar, HomeDiv, StacksDiv } from "./styles";
import ivaneudoImg from "../../Img/ivaneudo.png";

export const ApresentacaoHome = () => {
  const { t } = useTranslation();

  const STACKS_DATA = [
    { id: "react", alt: "react", src: "https://skillicons.dev/icons?i=react" },
    { id: "emotion", alt: "emotion", src: "https://skillicons.dev/icons?i=emotion" },
    { id: "quarkus", alt: "quarkus", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/quarkus/quarkus-original.svg" },
    { id: "spring", alt: "springboot", src: "https://skillicons.dev/icons?i=spring" },
    { id: "postgres", alt: "postgreSQL", src: "https://skillicons.dev/icons?i=postgres" },
    { id: "docker", alt: "docker", src: "https://skillicons.dev/icons?i=docker" },
    { id: "arch", alt: "arch", src: "https://skillicons.dev/icons?i=arch" },
    { id: "git", alt: "git", src: "https://skillicons.dev/icons?i=git" },
  ];

  return (
    <HomeDiv id="home">
      <Avatar src={ivaneudoImg} alt="Avatar do Ivaneudo" />
      
      <Cargo>
        {t('home.rolePrefix')}
        <TextSpan>{t('home.roleHighlight')}</TextSpan>
        {t('home.roleSuffix')}
      </Cargo>
      
      <Resumo>{t('home.summary')}</Resumo>
      
      <StacksDiv>
        {STACKS_DATA.map((stack) => (
          <Icons 
            key={stack.id} 
            alt={stack.alt} 
            src={stack.src} 
          />
        ))}
      </StacksDiv>
    </HomeDiv>
  );
};