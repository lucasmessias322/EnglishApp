import React from "react";
import * as C from "./style";

function AddinputCard({title, children, toogleAddbaralho, cancel, ok }:any) {
  return (
    <C.CriarBaralhoContain toogleAddbaralho={toogleAddbaralho}>
      <C.CardCriarBaralho>
        <div className="contain">
          <h3>{title}</h3>
          <div className="inputContain">
           {children}
           
          </div>
          <div className="actions">
            <h5 onClick={cancel}>CANCELAR</h5>
            <h5 onClick={ok}>OK</h5>
          </div>
        </div>
      </C.CardCriarBaralho>
    </C.CriarBaralhoContain>
  );
}

export default AddinputCard;
