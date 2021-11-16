import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import * as C from "./style";
import { AppContext } from "../../data/Store";
import ItemBaralho from "./ItemBaralho";
import { getMemorizes, postBaralho, DeletarBaralho } from "../../service/Api";
import { AuthContext } from "../../data/auth";

import firebase from "../../service/firebaseConnection";

import { FaPlus, FaTemperatureLow } from "react-icons/fa";

function Memorize() {
  const { thema } = useContext(AppContext);
  const [baralhos, setBaralhos] = useState();
  const [toogleAddbaralho, setToogleAddbaralho] = useState(false);
  const [nomeNewBaralho, setNomeNewBaralho] = useState("");

  const [alteracao, setAlteracao] = useState(false);

  useEffect(() => {
    getMemorizes().then((response) => setBaralhos(response));
  }, [alteracao]);

  function adcionarnovoBaralhot() {
    let data = {
      titulo: nomeNewBaralho,
    };
    postBaralho(data)
      .then(() => setAlteracao((e) => !e))
      .catch(() => alert("erro ao cadastrar baralho"));
  }

  function excluirBaralho(id) {
    DeletarBaralho(id)
      .then(() => setAlteracao((e) => !e))
      .catch((error) => console.log("Erro ao deletar baralho: " + error));
  }

  return (
    <C.MemorizeContain thema={thema}>
      <Header  MenuBars={false} TituloDaPagina=""></Header>

      <C.CriarBaralhoContain toogleAddbaralho={toogleAddbaralho}>
        <C.CardCriarBaralho>
          <div className="contain">
            <h3>Criar baralho</h3>
            <div className="inputContain">
              <input
                type="text"
                placeholder="Nome do baralho.."
                value={nomeNewBaralho}
                onChange={(e) => setNomeNewBaralho(e.target.value)}
              />
            </div>
            <div className="actions">
              <h5 onClick={() => setToogleAddbaralho(false)}>CANCELAR</h5>
              <h5
                onClick={() => (
                  adcionarnovoBaralhot(), setToogleAddbaralho(false)
                )}
              >
                OK
              </h5>
            </div>
          </div>
        </C.CardCriarBaralho>
      </C.CriarBaralhoContain>

      <C.ListaBaralhos>
        {baralhos?.map((elem, i) => (
          <ItemBaralho
            key={elem.id}
            id={elem._id}
            titulo={elem.titulo}
            qtdPalavras={elem.items.length}
            hidden={false}
            excluirBaralho={excluirBaralho}
            to={`/baralho/${elem._id}`}
          />
        ))}
      </C.ListaBaralhos>

      <C.AddCardContain thema={thema}>
        <div className="linhar">
          <C.AddCard size={50} onClick={() => setToogleAddbaralho(true)}>
            <FaPlus size={25} color="white" />
          </C.AddCard>
        </div>
      </C.AddCardContain>
    </C.MemorizeContain>
  );
}

export default Memorize;
