import React, { useState } from "react";
import * as C from "./style";
import { FaVolumeDown, FaVolumeUp } from "react-icons/fa";
import { Speak } from "../Speaker";

function FraseComponent({ thema, FraseInIngles, FraseInPortuguese }) {
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

export default FraseComponent;
