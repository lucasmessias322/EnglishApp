import React, { useState } from "react";
import FraseComponent from "./FraseComponent";
import styled from "styled-components";
import { colors } from "./style";

function FraseAFrase({ thema, DataFraseAFrase }) {
  const [showFraseFrase, setShowFraseFrase] = useState(false);

  return (
    <FraseAFraseComponent thema={thema}>
      <h2 onClick={() => setShowFraseFrase(!showFraseFrase)}>
        Frase a Frase <span>{showFraseFrase ? "Ocultar" : "Mostrar"}</span>
      </h2>
      {/* <br /> */}
      {showFraseFrase && (
        <ContainerFrases>
          {DataFraseAFrase?.map((item, i) => (
            <FraseComponent
              thema={thema}
              key={i}
              FraseInIngles={item.FraseInIngles}
              FraseInPortuguese={item.FraseInPortuguese}
            />
          ))}
        </ContainerFrases>
      )}

      {/* <br /> */}
    </FraseAFraseComponent>
  );
}

const FraseAFraseComponent = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 20px auto;
  border-bottom: 0.5px solid
    ${(props) => (props.thema ? colors.color2 : "#80808036")};

  h2 {
    color: ${(props) => (props.thema ? colors.color2 : colors.color4)};
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 10px;

    span {
      font-weight: normal;
      font-size: 16px;
    }
  }
`;

const ContainerFrases = styled.div`
  list-style: none;

  @media (max-width: 500px) {
    li {
      h3 {
        font-size: 16px;
      }
      p {
        font-size: 15px;
      }
    }
  }
`;

export default FraseAFrase;
