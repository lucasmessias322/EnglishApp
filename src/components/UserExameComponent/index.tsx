import React, { useContext, useEffect, useState } from "react";
import * as C from "./style";

// components
import Header from "../Header";
import { FaChevronLeft, FaChevronRight, FaVolumeDown } from "react-icons/fa";

// context
import { AppContext } from "../../Context/Store";

// helpers
import { getStorage } from "../storageFunction/set";
import { Speak } from "../Speaker";

// types
type Props = {
  match: any
}

function UserExameComponent({ match }: Props) {
  const { thema } = useContext(AppContext);


  const [currentBaralho, setCurrentBaralho] = useState(0);
  const [nextBaralho, setNextBaralho] = useState(currentBaralho + 1);
  const [toogle, setToogle] = useState(false);
  const [ocultarResposta, setOcultarResposta] = useState(true);

  const [current, setCurrent] = useState(match.params.itemid)
  const [dataBaralho, setBaralho] = useState(getStorage("currentUserData").memorize[current]);

  useEffect(() => {
    if (toogle) {
      setNextBaralho(() => {
        if (currentBaralho + 1 > dataBaralho.items.length - 1) {
          return 0;
        } else {
          return currentBaralho + 1;
        }
      });
    }
  }, [toogle, currentBaralho]);

  function Forward() {
    if (currentBaralho >= dataBaralho.items.length - 1) {
      setCurrentBaralho(dataBaralho.items.length - 1);
    } else {
      setCurrentBaralho((e: any) => e + 1);
      setOcultarResposta(true);
    }
  }

  function Backward() {
    if (currentBaralho <= 0) {
      setCurrentBaralho(0);
    } else {
      setCurrentBaralho((e: any) => e - 1);
      setOcultarResposta(true);
    }
  }

  return (
    <C.ExameContain thema={thema}>
      <Header
        switchButtom={false}
        TituloDaPagina={dataBaralho.titulo}
        QtdItems={dataBaralho.items.length}
      ></Header>
      <br /> <br /> <br /> <br /> <br /> <br />
      <C.questionAndResponseCard thema={thema}>

        <C.question thema={thema}
          onClick={() => Speak(dataBaralho.items[currentBaralho].question)}>
          <C.playButton thema={thema}>
            <FaVolumeDown color="white" size={20} />
          </C.playButton>
          <h2>{dataBaralho.items[currentBaralho].question}</h2>
        </C.question>

        <C.response thema={thema}>
          <div className="play"></div>
          <h2>
            {ocultarResposta ? <div className="target"></div> : dataBaralho.items[currentBaralho].response}
          </h2>
        </C.response>

      </C.questionAndResponseCard>

      <C.controls thema={thema}>
        <span onClick={() => Backward()}>
          <FaChevronLeft
            size={20}
            onClick={() =>
              Speak(dataBaralho.items[currentBaralho === 0 ? currentBaralho : currentBaralho - 1].question)
            }
          />
        </span>
        <h2 onClick={() => setOcultarResposta((e) => !e)}>
          {ocultarResposta ? "Mostrar Resposta" : "Ocultar Resposta"}
        </h2>
        <span onClick={() => Forward()}>
          <FaChevronRight
            size={20}
            onClick={() =>
              Speak(dataBaralho.items[currentBaralho === dataBaralho.items.length - 1 ? currentBaralho : currentBaralho + 1].question)
            }
          />
        </span>
      </C.controls>
    </C.ExameContain>
  );
}

export default UserExameComponent;
