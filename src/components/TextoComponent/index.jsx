import React, { useContext, useState, useEffect } from "react";
import * as C from "./style";
import { AuthContext } from "../../Context/AuthContext";
import Header from "../Header";
import Texto from "./Texto";
import FraseAFrase from "./FraseAFrase";
import Player from "./Player";
import { getTextos } from "../../services/Api";

const DadosDoTexto = [
  {
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
  },
];

export default function TextoComponent({ texto }) {
  const { thema, currentUserData } = useContext(AuthContext);
  const [DataTexto, setDataTexto] = useState(DadosDoTexto);
  const [currentTexto, setCurrentTexto] = useState(0);
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [AudioIndex, setAudioIndex] = useState(0);
  const [IsPlayng, setIsPlayng] = useState(false);

  useEffect(() => {
    getTextos().then((textos) => {
      setDataTexto(textos);
    });
  }, []);

  return (
    <C.TextoLayoutContainer thema={thema}>
      <Header
        switchButtom={true}
        logoutButton={currentUserData && true}
        MenuBars={true}
        DataTexto={DataTexto}
        TitleOfText={DataTexto[currentTexto].titulo}
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
        DataFraseAFrase={DataTexto[currentTexto].fraseAFraseDoTexto}
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
