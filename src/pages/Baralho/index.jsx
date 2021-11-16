import React, { useState, useEffect, useContext } from "react";
import Header from "../../components/Header/Header";
import { getBaralho, updateBaralhoItems } from "../../service/Api";
import { BaralhoContain } from "./style";
import { FaClipboardList, FaVolumeDown, FaVolumeUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AppContext } from "../../data/Store";
import { Speak } from "../../components/Speaker";
import Shuffle from "../../components/RandomArray";
import AddNewItem from "../../components/AddNewItem";

function Baralho({ match }) {
  const { thema } = useContext(AppContext);
  const [dataBaralho, setBaralho] = useState([]);
  const [Pergunta, setPergunta] = useState("");
  const [Resposta, setResposta] = useState("");
  const [toogleAddbaralho, setToogleAddbaralho] = useState(false);

  const [newItem, setNewItem] = useState([]);

  const [alteracao, setAlteracao] = useState(false);

  useEffect(() => {
    getBaralho(match.params.id).then((baralho) => setBaralho(baralho));
  }, [alteracao]);

  let RandomDataItems = dataBaralho.items ? dataBaralho.items : ["0"];
  Shuffle(RandomDataItems);

  useEffect(() => {
    if (Pergunta !== "" && Resposta !== "") {
      setNewItem([{ questao: Pergunta, resposta: Resposta }]);
    }
  }, [alteracao, Pergunta, Resposta]);

  function SalvarNovoItem() {
    let data = {
      titulo: dataBaralho.titulo,
      items: dataBaralho.items.concat(newItem),
    };
    updateBaralhoItems(dataBaralho._id, data).then(() => {
      setAlteracao((e) => !e);
      setPergunta("");
      setResposta("");
    });
  }

  function adicionarNovoItem() {
    if (!toogleAddbaralho) {
      setToogleAddbaralho(true);
      setAlteracao((e) => !e);
    }
  }

  return (
    <BaralhoContain thema={thema}>
      <AddNewItem
        Pergunta={Pergunta}
        setPergunta={setPergunta}
        Resposta={Resposta}
        setResposta={setResposta}
        toogleAddbaralho={toogleAddbaralho}
        setToogleAddbaralho={setToogleAddbaralho}
        SalvarNovoItem={SalvarNovoItem}
      />
      <Header
        // MenuBars={false}
        adicionarNovoItem={adicionarNovoItem}
        BaralhoPage={true}
        MemorizeTable={true}
        switchButtom={false}
        TituloDaPagina={dataBaralho.titulo}
        QtdItems={dataBaralho.items ? dataBaralho.items.length : "vazio"}
      ></Header>
      <br /> <br /> <br /> <br /> <br /> <br />
      <table id="table" border="1">
        {dataBaralho.items?.map((elem, i) => (
          <tr key={elem.id}>
            <td onClick={() => Speak(elem.questao, 0.8)}>
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
