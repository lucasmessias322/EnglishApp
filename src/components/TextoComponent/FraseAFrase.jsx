import React from "react";
import FraseComponent from "./FraseComponent";
import * as C from "./style";

function FraseAFrase({ thema,DataFraseAFrase }) {

  return (
    <C.FraseAFraseComponent thema={thema}>
      <h2>Frase a Frase</h2>
      <br />
      <div className="content-frases">
        {DataFraseAFrase?.map((item, i) => (
          <FraseComponent
          thema={thema}
            key={i}
            FraseInIngles={item.FraseInIngles}
            FraseInPortuguese={item.FraseInPortuguese}
          />
        ))}
      </div>
      <br />
    </C.FraseAFraseComponent>
  );
}

export default FraseAFrase;
