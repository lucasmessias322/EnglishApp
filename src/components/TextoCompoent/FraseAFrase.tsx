import React from 'react'
import FraseComponent from './FraseComponent';
import * as C from "./style";

function FraseAFrase({DataFraseAFrase}:any) {
  return (
    <C.FraseAFraseComponent>
      <h2>Frase a Frase</h2>
      <br />
      <div className="content-frases">
        {DataFraseAFrase?.map((item:any, i:any) =>
            < FraseComponent
              key={i}
              FraseInIngles={item.FraseInIngles}
              FraseInPortuguese={item.FraseInPortuguese} />
        )}
      </div>
      <br />
    </C.FraseAFraseComponent>
  )
}

export default FraseAFrase
