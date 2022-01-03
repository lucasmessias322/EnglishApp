import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import * as C from "./style";
import { FaChevronLeft, FaChevronRight, FaVolumeDown } from "react-icons/fa";
import { AppContext } from "../../Context/Store";
import { Speak } from "../../components/Speaker";

function UserExame({ match }: any) {
  const { thema, currentUserData } = useContext(AppContext);
  const [dataBaralho, setBaralho] = useState({
    _id: "vf",
    titulo: "Carregando...",
    items: [
      {
        _id: "",
        question: "",
        response: "",
      },
    ],
  });
  const [currentBaralho, setCurrentBaralho] = useState(0);
  const [nextBaralho, setNextBaralho] = useState(currentBaralho + 1);
  const [toogle, setToogle] = useState(false);
  const [ocultarResposta, setOcultarResposta] = useState(true);

  function BuscarItemPorId() {
    let filter: any = currentUserData.memorize.find(
      (x) => x._id == match.params.id
    );
    setBaralho(filter);
  }

  useEffect(() => {
    BuscarItemPorId();
    setToogle(true);
  }, []);

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
      setCurrentBaralho((e) => e + 1);
      setOcultarResposta(true);
    }
  }

  function Backward() {
    if (currentBaralho <= 0) {
      setCurrentBaralho(0);
    } else {
      setCurrentBaralho((e) => e - 1);
      setOcultarResposta(true);
    }
  }

  return (
    <C.ExameContain thema={thema}>
      <Header
        switchButtom={false}
        TituloDaPagina={toogle ? dataBaralho.titulo : "Carregando.."}
        QtdItems={dataBaralho.items ? dataBaralho.items.length : "vazio"}
      ></Header>
      <br /> <br /> <br /> <br /> <br /> <br />
      <div className="questionAndResponseCard">
        <div
          className="question"
          onClick={() =>
            Speak(dataBaralho.items[currentBaralho].question, 0.8)
          }
        >
          <div className="play">
            <FaVolumeDown color="white" size={20} />
          </div>
          <h2>{dataBaralho.items[currentBaralho].question}</h2>
        </div>
        <div className="response">
          <div className="play"></div>
          <h2>
            {ocultarResposta ? "" : dataBaralho.items[currentBaralho].response}
          </h2>
        </div>
      </div>
      <div className="exameControl-contain">
        <span onClick={() => Backward()}>
          <FaChevronLeft
            size={20}
            onClick={() =>
              Speak(
                dataBaralho.items[
                  currentBaralho == 0 ? currentBaralho : currentBaralho - 1
                ].question
              )
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
              Speak(
                dataBaralho.items[
                  currentBaralho == dataBaralho.items.length - 1
                    ? currentBaralho
                    : currentBaralho + 1
                ].question,
                0.8
              )
            }
          />
        </span>
      </div>
    </C.ExameContain>
  );
}

export default UserExame;
