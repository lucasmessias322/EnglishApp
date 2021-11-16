import React, { useState } from "react";
import * as C from "./style";

function AddNewItem({
  toogleAddbaralho,
  setToogleAddbaralho,
  Pergunta,
  setPergunta,
  Resposta,
  setResposta,
  SalvarNovoItem,
}) {
  return (
    <C.CriarBaralhoContain toogleAddbaralho={toogleAddbaralho}>
      <C.CardCriarBaralho>
        <div className="contain">
          <h3>Add new item</h3>
          <div className="inputContain">
            <input
              type="text"
              placeholder="Pergunta..."
              value={Pergunta}
              onChange={(e) => setPergunta(e.target.value)}
            />
            <input
              type="text"
              placeholder="Resposta..."
              value={Resposta}
              onChange={(e) => setResposta(e.target.value)}
            />
          </div>
          <div className="actions">
            <h5 onClick={() => setToogleAddbaralho(false)}>CANCELAR</h5>
            <h5
              onClick={() => {
                SalvarNovoItem();
                setToogleAddbaralho(false);
              }}
            >
              SALVAR
            </h5>
          </div>
        </div>
      </C.CardCriarBaralho>
    </C.CriarBaralhoContain>
  );
}

export default AddNewItem;
