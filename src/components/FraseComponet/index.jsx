import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Speak } from "../Speaker";
import { AppContext } from "../../data/Store";
import { FaVolumeDown, FaVolumeUp } from "react-icons/fa";

import * as C from "./style";
function FraseComponet({ FraseInIngles, FraseInPortuguese }) {
  const { thema } = useContext(AppContext);
  const [toogle, setToogle] = useState(false);


  function Play(texto) {
    Speak(texto);
  }

  return (
    <C.FraseAFraseContainer thema={thema}>
      <div>
        <C.PlayFraseButton
          thema={thema}
          onClick={() => {
            Play(FraseInIngles);
            setToogle((e) => !e);
          }}
        >
          {toogle ? <FaVolumeUp /> : <FaVolumeDown />}
        </C.PlayFraseButton>
        <h3>{FraseInIngles}</h3>
      </div>

      <p>{FraseInPortuguese}</p>
    </C.FraseAFraseContainer>
  );
}

export default FraseComponet;
