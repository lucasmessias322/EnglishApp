import React, { useContext, useState, useEffect } from "react";
import * as C from "./style";
import { AuthContext } from "../../Context/AuthContext";
import Header from "../Header";
import Texto from "./Texto";
import FraseAFrase from "./FraseAFrase";
import Player from "./Player";
import { getTextos, getUnicTexto } from "../../services/Api";

const DadosDoTexto = {
  titulo: "Carregando",
  textos: [
    {
      AudioPathData: "",
      AudioText: "Carregando...",
      Translate: "Carregando...",
    },
    {
      AudioPathData: "",
      AudioText: "",
      Translate: "",
    },
  ],

  fraseAFraseDoTexto: [
    { FraseInIngles: "Carregando...", FraseInPortuguese: "" },
  ],
};

export default function TextoComponent({ DataTexto, Alltextos }) {
  const { thema, currentUserData } = useContext(AuthContext);

  const [currentTexto, setCurrentTexto] = useState(0);
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [AudioIndex, setAudioIndex] = useState(0);
  const [IsPlayng, setIsPlayng] = useState(false);

  return (
    <C.TextoLayoutContainer thema={thema}>
      <Header
        switchButtom={true}
        logoutButton={currentUserData && true}
        MenuBars={true}
        DataTexto={Alltextos}
        TitleOfText={DataTexto.titulo}
        setCurrentTexto={setCurrentTexto}
        setIsPlayng={setIsPlayng}
        setCurrentParagraph={setCurrentParagraph}
        setAudioIndex={setAudioIndex}
        AudioIndex={AudioIndex}
      />
      <Texto
        thema={thema}
        DataTexto={DataTexto}
        currentTexto={currentTexto}
        currentParagraph={currentParagraph}
        AudioIndex={AudioIndex}
      />
      <FraseAFrase
        thema={thema}
        DataFraseAFrase={DataTexto.fraseAFraseDoTexto}
      />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Player
        IsPlayng={IsPlayng}
        setIsPlayng={setIsPlayng}
        thema={thema}
        currentTexto={currentTexto}
        DataTexto={DataTexto}
        setCurrentParagraph={setCurrentParagraph}
        AudioIndex={AudioIndex}
        setAudioIndex={setAudioIndex}
      />
    </C.TextoLayoutContainer>
  );
}
