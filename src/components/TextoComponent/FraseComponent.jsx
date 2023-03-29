import React, { useState } from "react";
import * as C from "./style";
import { FaVolumeDown, FaVolumeUp } from "react-icons/fa";
import { Speak } from "../Speaker";
import styled from "styled-components";
import { colors } from "./style";

function FraseComponent({ thema, FraseInIngles, FraseInPortuguese }) {
  const [toogle, setToogle] = useState(false);

  function Play(texto) {
    setToogle(true);
    Speak(texto, () => {
      setToogle(false);
    });
  }

  return (
    <FraseAFraseContainer thema={thema}>
      <div>
        <PlayFraseButton
          thema={thema}
          onClick={() => {
            Play(FraseInIngles);
          }}
        >
          {toogle ? <FaVolumeUp /> : <FaVolumeDown />}
        </PlayFraseButton>
        <h3>{FraseInIngles}</h3>
      </div>
      <p>{FraseInPortuguese}</p>
    </FraseAFraseContainer>
  );
}

const FraseAFraseContainer = styled.li`
  margin: 10px;

  div {
    display: flex;
    align-items: center;
    h3 {
      margin: 5px;
      color: ${(props) => (props.thema ? colors.color2 : colors.color4)};
      font-size: 20px;
    }
  }
  p {
    font-size: 14px;
    margin-left: 45px;
    color: ${(props) => (props.thema ? "black" : "white")};
  }
`;

const PlayFraseButton = styled.div`
  width: 25px;
  height: 25px;
  background-color: ${(props) => (props.thema ? colors.color2 : colors.color7)};
  color: white;
  border-radius: 100%;
  padding: 5px;
  margin-right: 10px;

  &:hover {
    transform: scale(1.1);
  }
`;

export default FraseComponent;
