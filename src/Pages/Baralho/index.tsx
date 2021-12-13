import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { Speak } from "../../components/Speaker";
import { AppContext } from "../../Context/Store";
import { getBaralho } from "../../services/Api";
import * as C from "./style";
import {
  FaClipboardList,
  FaVolumeDown,
  FaVolumeUp,
  FaTrash,
} from "react-icons/fa";
import Shuffle from "../../components/RandomArray";

function Baralho({ match }: any) {
  const { thema, currentUserData} = useContext(AppContext);
  const [alteracao, setAlteracao] = useState(false);
  const [dataBaralho, setBaralho] = useState({
    _id: "vf",
    titulo: "Carregando...",
    items: [
      {
        _id: "",
        questao: "",
        resposta: "",
      },
    ],
  });
  console.log(currentUserData);
  

  useEffect(() => {
    getBaralho(match.params.id).then((baralho) => setBaralho(baralho));
    
  }, [alteracao]);

  let RandomDataItems:any = dataBaralho.items ? dataBaralho.items : ["0"];
  Shuffle(RandomDataItems);

  return (
    <C.BaralhoContain thema={thema}>
      <Header MemorizeTable={true} />
      <br /> <br /> <br /> <br /> <br /> <br />
      <table id="table">
        {dataBaralho.items.map((elem: any, i: any) => (
          <tr key={i}>
            <td onClick={() => Speak(elem.questao, 0.8)}>
              <div className="container">
                <C.RoundButton thema={thema}>
                  <FaVolumeDown
                    className="volumeDow-icon"
                    color="white"
                    size={15}
                  />
                </C.RoundButton>

                <span>{elem.questao}</span>
              </div>
            </td>
            <td>
              <div className="resposonseContainer">
                <span className="response">{elem.resposta}</span>
              </div>
            </td>
          </tr>
        ))}
      </table>
      <Link to={`/exame/${dataBaralho._id}`}>
        <div className="exame">
          <FaClipboardList size={30} color="white" />
        </div>
      </Link>
      
    </C.BaralhoContain>
  );
}

export default Baralho;
