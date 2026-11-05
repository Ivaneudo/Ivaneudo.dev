import { Descricao } from "../../components/Text/styles";
import { Bloco, Blocos } from "./styles";

interface SobreProps {
  bloco1: React.ReactNode;
  bloco2: React.ReactNode;
}

export const Sobre = ({bloco1, bloco2}: SobreProps) => {
  return (
    <Blocos>
      <Bloco>
        <Descricao>
          {bloco1}
        </Descricao>
      </Bloco>
      <Bloco>
        <Descricao>
          {bloco2}
        </Descricao>
      </Bloco>
    </Blocos>
  )
}
