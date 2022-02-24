import React, { useState } from "react";
import * as C from "./style";

export default function EditionCard({
  editItem,
  cancel,
  setWordInEnglish,
  WordInEnglish,
  setWordInProtuguese,
  WordInProtuguese,
  ok,
  deleteItem,
}) {
  return (
    <C.EditionCardContainer editItem={editItem}>
      <C.EditionCard>
        <div className="contain">
          <h3>Editar item</h3>
          <div className="inputContain">
            <input
              type="text"
              placeholder="Palavra em ingles..."
              value={WordInEnglish}
              onChange={(e) => setWordInEnglish(e.target.value)}
            />
            <input
              type="text"
              placeholder="Palavra em ingles..."
              value={WordInProtuguese}
              onChange={(e) => setWordInProtuguese(e.target.value)}
            />
          </div>
          <div className="actions">
            <h5 id="delete" onClick={deleteItem}>
              DELETAR
            </h5>
            <div>
              <h5 onClick={cancel}>CANCELAR</h5>
              <h5 onClick={() => ok()}>OK</h5>
            </div>
          </div>
        </div>
      </C.EditionCard>
    </C.EditionCardContainer>
  );
}
