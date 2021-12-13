import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../Context/Store";
import * as C from "./style";
import Header from "../Header";
import Texto from "./Texto";
import FraseAFrase from "./FraseAFrase";
import Player from "./Player";
import { getTextos } from "../../services/Api";
import DadosDoTexto from "./DataTextos";
import HeaderLinkMenu from "../HeaderLinkMenu";

function TextoComponent({ texto }: any) {
  const { thema } = useContext(AppContext);
  const [DataTexto, setDataTexto] = useState(DadosDoTexto);

  useEffect(() => {
    getTextos().then((response) => setDataTexto(response));
  }, []);

  return (
    <C.TextoLayoutContainer thema={thema}>
      <Header
        MenuBars={true}
        DadosDoTexto={DataTexto}
        TitleOfText={DataTexto[texto].titulo}
      >
        {DataTexto.map((elem: any, i: number) => (
          <HeaderLinkMenu key={i} texto={i} TitleMenu={DataTexto[i].titulo} />
        ))}
      </Header>

      <Texto DataTextoAudio={DataTexto[texto].textos} />
      <FraseAFrase DataFraseAFrase={DataTexto[texto].fraseAFraseDoTexto} />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Player DataTextoAudio={DataTexto[texto].textos} />
    </C.TextoLayoutContainer>
  );
}

export default TextoComponent;
