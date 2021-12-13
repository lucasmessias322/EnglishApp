import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/Store";
import { getMemorizes } from "../../services/Api";
import Header from "../Header";
import ItemBaralho from "./ItemBaralho";
import * as C from "./style";

function MemorizeComponent() {
  const { thema, currentUserData } = useContext(AppContext);
  const [baralhos, setBaralhos] = useState([
    {
      _id: "",
      titulo: "Carregando...",
      items: [
        {
          _id: "",
          questao: "",
          resposta: "",
        },
      ],
    },
  ]);
  const [alteracao, setAlteracao] = useState(false);

  useEffect(() => {
    getMemorizes().then((response) => setBaralhos(response));
  }, [alteracao]);

  return (
    <C.MemorizeContain thema={thema}>
      <Header TituloDaPagina="" />

      <C.ListaBaralhos>
        {baralhos?.map((elem: any, i: any) => (
          <ItemBaralho
            thema={thema}
            key={elem.id}
            id={elem._id}
            titulo={elem.titulo}
            qtdPalavras={elem.items.length}
            hidden={false}
            // excluirBaralho={excluirBaralho}
            to={`/baralho/${elem._id}`}
          />
        ))}
      </C.ListaBaralhos>
    </C.MemorizeContain>
  );
}

export default MemorizeComponent;
