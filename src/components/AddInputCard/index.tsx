import React from "react";
import * as C from "./style";

function AddinputCard({
  title,
  children,
  toogleAddbaralho,
  cancel,
  ok,
  setWordInEnglish,
  WordInEnglish,
  setWordInProtuguese,
  WordInProtuguese
}: any) {
  return (
    <C.CriarBaralhoContain toogleAddbaralho={toogleAddbaralho}>
      <C.CardCriarBaralho>
        <div className="contain">
          <h3>{title}</h3>
          <div className="inputContain">
            <input
              type="text"
              placeholder="Palavra em ingles..."
              value={WordInEnglish}
              onChange={(e) => setWordInEnglish(e.target.value)}
            />
            <input
              type="text"
              placeholder="Palavra em portugues..."
              value={WordInProtuguese}
              onChange={(e) => setWordInProtuguese(e.target.value)}
            />
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
