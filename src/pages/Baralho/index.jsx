import React, { useState, useEffect, useContext } from "react";
import Header from "../../components/Header/Header";
import { getBaralho } from "../../service/Api";
import { BaralhoContain } from "./style";
import { FaClipboardList, FaVolumeDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AppContext } from "../../data/Store";
import { Speak } from "../../components/Speaker";

function Baralho({ match }) {
  const {thema} = useContext(AppContext);
  const [dataBaralho, setBaralho] = useState([]);

  console.log("o match é" + match);

  useEffect(() => {
    getBaralho(match.params.id).then((baralho) => setBaralho(baralho));
  }, []);

  console.log(dataBaralho.items);

  return (
    <BaralhoContain thema={thema}>
      <Header
        MemorizeTable={true}
        switchButtom={true}
        TituloDaPagina={dataBaralho.titulo}
      ></Header>
      <br /> <br /> <br /> <br /> <br /> <br />
      <table id="table" border="1">
        {dataBaralho.items?.map((elem, i) => (
          <tr key={elem.id}>
            <td>
              <div>
                <div className="play" onClick={() => Speak(elem.questao)}>
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
