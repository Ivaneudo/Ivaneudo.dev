import { useTranslation } from "react-i18next";
import { Sobre } from "../components/blocosTexto";
import * as S from "../components/conteiner/styles";
import { Icons } from "../components/IconsDigitais";
import { Descricao, TextH2, TextSpan } from "../components/Text/styles";

export const SobreMim = () => {
  const { t } = useTranslation();

  const REDES_DATA = [
    { id: "instagram", alt: "instagram", src: "https://skillicons.dev/icons?i=instagram", href: "https://instagram.com/ivaneudo.dev/" },
    { id: "linkedin", alt: "linkedin", src: "https://skillicons.dev/icons?i=linkedin", href: "https://linkedin.com/in/ivaneudo-carvalho/" },
    { id: "github", alt: "github", src: "https://skillicons.dev/icons?i=github", href: "https://github.com/Ivaneudo" }
  ];

  return (
    <S.Div id="sobre-mim">
      <TextH2>{t('about.title')}</TextH2>
      
      <Sobre 
        bloco1={
          <>
            {t('about.block1.p1')}<TextSpan>{t('about.block1.hl1')}</TextSpan>
            {t('about.block1.p2')}<TextSpan>{t('about.block1.hl2')}</TextSpan>
            {t('about.block1.p3')}<TextSpan>{t('about.block1.hl3')}</TextSpan>
            {t('about.block1.p4')}<TextSpan>{t('about.block1.hl4')}</TextSpan>{t('about.block1.p5')}
          </>
        }
        bloco2={
          <>
            {t('about.block2.p1')}<TextSpan>{t('about.block2.hl1')}</TextSpan>
            {t('about.block2.p2')}<TextSpan>{t('about.block2.hl2')}</TextSpan>
            {t('about.block2.p3')}<TextSpan>{t('about.block2.hl3')}</TextSpan>
            {t('about.block2.p4')}<TextSpan>{t('about.block2.hl4')}</TextSpan>{t('about.block2.p5')}
          </>
        }
      />

      <TextH2><TextSpan>{t('about.languagesTitle')}</TextSpan></TextH2>
      <Descricao>{t('about.languages')}</Descricao>

      <TextH2><TextSpan>{t('about.socialTitle')}</TextSpan></TextH2>
      <Descricao>{t('about.socialDesc')}</Descricao>
      
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
  );
};