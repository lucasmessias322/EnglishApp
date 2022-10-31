import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import * as C from "./style";
import { FaVolumeDown } from "react-icons/fa";
import ReactCardFlip from "react-card-flip";

export default function Cards() {
  const listData = JSON.parse(useParams().listData);
  const [cards, setCards] = useState(listData);
  const [isFlipped, setisFlipped] = useState(false);

  console.log(cards);

  return (
    <C.Container>
      <C.Stack>
        <ReactCardFlip isFlipped={isFlipped}>
          <C.Card onClick={() => setisFlipped(true)} className="front">
            <div className="iconVolume">
              <FaVolumeDown size={22} color="#5D8CCE" />
            </div>
            <div className="text">
              <span>dd</span>
            </div>
          </C.Card>
          <C.Card onClick={() => setisFlipped(false)} className="back">
            <div className="iconVolume">
              <FaVolumeDown size={22} color="#5D8CCE" />
            </div>
            <div className="text">
              <span>back</span>
            </div>
          </C.Card>
        </ReactCardFlip>
        <C.BtnCardContainer>
          <C.BtnCard>Anterior</C.BtnCard>
          <C.BtnCard>Proximo</C.BtnCard>
        </C.BtnCardContainer>
      </C.Stack>
    </C.Container>
  );
}
