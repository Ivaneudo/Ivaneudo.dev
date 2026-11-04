import { useTranslation } from "react-i18next"
import { Div } from "../components/conteiner/styles"
import { Projeto } from "../components/Projeto/index"
import { TextH2 } from "../components/Text/styles"
import raizesDigitaisImg from "../Img/vera-crianca.png"
import limpoImg from "../Img/limpo.png"
import ficaComiog from "../Img/fica-comigo.png"
import arch from "../Img/arch.png"

export const Projetos = () => {
  const { t } = useTranslation();

  return (
    <Div id="projetos">
      <TextH2>{t('projects.title')}</TextH2>
      
      <Projeto 
        nome="Raizes Digitais"
        imagem={raizesDigitaisImg}
        altImg={t('projects.raizes.alt')}
        resumo={t('projects.raizes.summary')}
        url="https://github.com/veracrianca/movimento"
        link="https://movimentoveracrianca.vercel.app/"
        tecnologias={[
          <img key="html" src="https://skillicons.dev/icons?i=html" height="30" alt="html5" />,
          <img key="css" src="https://skillicons.dev/icons?i=css" height="30" alt="css" />,
          <img key="js" src="https://skillicons.dev/icons?i=js" height="30" alt="javascript" />,
        ]}
      />
      
      <Projeto 
        nome="Limpo Serviço"
        imagem={limpoImg}
        altImg={t('projects.limpo.alt')}
        resumo={t('projects.limpo.summary')}
        url="https://github.com/Ivaneudo/Limpo"
        link="https://limpo.vercel.app/"
        tecnologias={[
          <img key="angular" src="https://skillicons.dev/icons?i=angular" height="30" alt="Angular" />,
          <img key="css" src="https://skillicons.dev/icons?i=css" height="30" alt="css" />,
          <img key="ts" src="https://skillicons.dev/icons?i=ts" height="30" alt="typescript" />,
        ]}
      />
      
      <Projeto 
        nome="Fica Comigo"
        imagem={ficaComiog}
        altImg={t('projects.ficaComigo.alt')}
        resumo={t('projects.ficaComigo.summary')}
        url="https://github.com/Ivaneudo/fica-comigo"
        tecnologias={[
          <img key="react" src="https://skillicons.dev/icons?i=react" height="30" alt="react" />,
          <img key="css" src="https://skillicons.dev/icons?i=css" height="30" alt="css" />,
          <img key="ts" src="https://skillicons.dev/icons?i=ts" height="30" alt="typescript" />,
        ]}
      />
      
      <Projeto 
        nome="Arch + Hyprland"
        imagem={arch}
        altImg={t('projects.arch.alt')}
        resumo={t('projects.arch.summary')}
        url="https://github.com/Ivaneudo/Arch-Hyprland"
        tecnologias={[
          <img key="lua" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/lua/lua-original.svg" height="30" alt="Lua" />,
          <img key="css" src="https://skillicons.dev/icons?i=css" height="30" alt="css" />,
        ]}
      />
    </Div>
  )
}