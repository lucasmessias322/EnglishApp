import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { getBaralho } from "../../service/Api";
import { BaralhoContain } from "./style";
import { FaClipboardList } from "react-icons/fa";
import { Link } from "react-router-dom";

function Baralho({ match }) {
  const [dataBaralho, setBaralho] = useState([]);

  useEffect(() => {
    getBaralho(match.params.id).then((baralho) => setBaralho(baralho));
  }, []);

  console.log(dataBaralho.items);

  return (
    <BaralhoContain>
      <Header
        MemorizeTable={true}
        switchButtom={true}
        TituloDaPagina={dataBaralho.titulo}
      ></Header>
      <br />
      <br />
      <br />
      <br />
      <br />
      <table id="table" border="1">
        {dataBaralho.items?.map((elem, i) => (
          <tr>
            <td>{elem.questao}</td>
            <td>{elem.resposta}</td>
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
