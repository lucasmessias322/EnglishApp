import React, { useState, useEffect, useContext } from "react";
import Header from "../../components/Header/Header";
import { getBaralho } from "../../service/Api";
import { BaralhoContain } from "./style";
import { FaClipboardList, FaVolumeDown, FaVolumeUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AppContext } from "../../data/Store";
import { Speak } from "../../components/Speaker";
import Shuffle from "../../components/RandomArray";

function Baralho({ match }) {
  const { thema } = useContext(AppContext);
  const [dataBaralho, setBaralho] = useState([]);

  useEffect(() => {
    getBaralho(match.params.id).then((baralho) => setBaralho(baralho));
  }, []);
  let RandomDataItems = dataBaralho.items ? dataBaralho.items : ["0"];
  Shuffle(RandomDataItems);

  return (
    <BaralhoContain thema={thema}>
      <Header
        // MenuBars={false}
        MemorizeTable={true}
        switchButtom={true}
        TituloDaPagina={dataBaralho.titulo}
        QtdItems={dataBaralho.items ? dataBaralho.items.length : "vazio"}
      ></Header>
      <br /> <br /> <br /> <br /> <br /> <br />
      <table id="table" border="1">
        {dataBaralho.items?.map((elem, i) => (
          <tr key={elem.id}>
            <td onClick={() => Speak(elem.questao)}>
              <div>
                <div className="play">
                  <FaVolumeDown
                    className="volumeDow-icon"
                    color="white"
                    size={15}
                  />
                </div>
                <span>{elem.questao}</span>
              </div>
            </td>
            <td>
              <span className="response">{elem.resposta}</span>
            </td>
          </tr>
        ))}
      </table>
      <Link to={`/exame/${dataBaralho._id}`}>
        <div className="exame">
          <FaClipboardList size={30} color="white" />
        </div>
      </Link>
    </BaralhoContain>
  );
}

export default Baralho;
