import React, { useState, useEffect, useContext } from "react";
import Header from "../../components/Header/Header";
import { AppContext } from "../../data/Store";
import { getBaralho } from "../../service/Api";
import { ExameContain } from "./style";
import { FaChevronLeft, FaChevronRight, FaVolumeDown } from "react-icons/fa";
import { Speak } from "../../components/Speaker";

function Exame({ match }) {
  const { thema } = useContext(AppContext);
  const [dataBaralho, setBaralho] = useState([]);
  const [currentBaralho, setCurrentBaralho] = useState(0);
  const [nextBaralho, setNextBaralho] = useState(currentBaralho + 1);
  const [toogle, setToogle] = useState(false);
  const [ocultarPalavra, setOcultarPalavra] = useState(true);

  useEffect(async () => {
    await getBaralho(match.params.id).then((baralho) => setBaralho(baralho));
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
      setOcultarPalavra(true);
    }
  }

  function Backward() {
    if (currentBaralho <= 0) {
      setCurrentBaralho(0);
    } else {
      setCurrentBaralho((e) => e - 1);
      setOcultarPalavra(true);
    }
  }

  // console.log(dataBaralho.items[0]);

  return (
    <ExameContain thema={thema}>
      <Header
        switchButtom={false}
        TituloDaPagina={toogle ? dataBaralho.titulo : "Carregando.."}
        QtdItems={dataBaralho.items ? dataBaralho.items.length : "vazio"}
      ></Header>
      <br /> <br /> <br /> <br /> <br /> <br />
      <div className="questionAndResponseCard">
        <div className="question"  onClick={() => Speak(dataBaralho.items[currentBaralho].questao)}>
          <div
            className="play"
           
          >
            <FaVolumeDown color="white" size={20} />
          </div>
          <h2>
            {toogle
              ? dataBaralho.items[currentBaralho].questao
              : "Carregando.."}
          </h2>
        </div>

        {ocultarPalavra ? (
          ""
        ) : (
          <div className="response">
            <div className="play"></div>
            <h2>
              {toogle
                ? dataBaralho.items[currentBaralho].resposta
                : "Carregando.."}
            </h2>
          </div>
        )}
      </div>
      <div className="exameControl-contain">

        {dataBaralho.items && currentBaralho == 0 ?
        ""
        :
        <span onClick={() => Backward()}>
          <FaChevronLeft
            size={20}
            onClick={() =>
              Speak(
                dataBaralho.items[
                  currentBaralho == 0 ? currentBaralho : currentBaralho - 1
                ].questao
              )
            }
          />
        </span>}


        <h2 onClick={() => setOcultarPalavra((e) => !e)}>
          {ocultarPalavra ? "Mostrar Resposta" : "Ocultar palavra"}
        </h2>

        {dataBaralho.items && currentBaralho == dataBaralho.items.length - 1 ? ""
          : 
          <span onClick={() => Forward()}>
            <FaChevronRight
              size={20}
              onClick={() =>
                Speak(dataBaralho.items[currentBaralho == dataBaralho.items.length - 1? currentBaralho: currentBaralho + 1].questao, 0.8)
              }
            />
          </span>
        }
      </div>
    </ExameContain>
  );
}

export default Exame;
