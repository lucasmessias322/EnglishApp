import React, { useContext, useState } from "react";
import { AppContext } from "../../Context/Store";
import * as C from "./style";
import { FaVolumeDown, FaVolumeUp } from "react-icons/fa";
import { Speak } from "../Speaker";

// type Props = {
//   FraseInIngles?: string,
//   FraseInPortuguese?:string
// }

function FraseComponent({ FraseInIngles, FraseInPortuguese }: any) {
  const { thema } = useContext(AppContext);
  const [toogle, setToogle] = useState(false);

  function Play(texto: string) {
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
