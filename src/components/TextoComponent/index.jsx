import React, { useContext, useState } from "react";
import * as C from "./style";
import { AuthContext } from "../../Context/AuthContext";
import Header from "../Header";
import Texto from "./Texto";
import FraseAFrase from "./FraseAFrase";
import Player from "./Player";
import Quiz from "./Quiz";
import {toast, ToastContainer} from 'react-toastify'

export default function TextoComponent({ DataTexto, Alltextos }) {
  const { thema, currentUserData } = useContext(AuthContext);

  const [currentTexto, setCurrentTexto] = useState(0);
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [AudioIndex, setAudioIndex] = useState(0);
  const [IsPlayng, setIsPlayng] = useState(false);
  

  return (
    <C.TextoLayoutContainer thema={thema}>
      <ToastContainer />
      <Header
        switchButtom={true}
        logoutButton={currentUserData && true}
        MenuBars={true}
        DataTexto={Alltextos}
        TitleOfText={DataTexto.titulo}
        setCurrentTexto={setCurrentTexto}
        setIsPlayng={setIsPlayng}
        IsPlayng={IsPlayng}
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
      <Quiz toast={toast} questions={DataTexto.questionsAboutText} />
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
