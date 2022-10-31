import React from "react";
import { useState } from "react";
import * as C from "./style";

export default function AddModal({
  title,
  children,
  SaveFunction,
  modalOpen,
  setModalOpen,
}) {
  //   const [modalOpen, setModalOpen] = useState(false);

  return (
    <C.AddItemModalContainer modalOpen={modalOpen}>
      <div className="cardModal">
        <h3>{title}</h3>
        <div className="containerInputsEbuttons">
          {children}
          <div className="btnContainer">
            <button className="cancelBtn" onClick={() => setModalOpen(false)}>
              Cancelar
            </button>
            <button
              className="saveBtn"
              onClick={(e) => {
                SaveFunction(e);
              }}
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </C.AddItemModalContainer>
  );
}
