import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { MemorizeContain } from "./style";
import { AppContext } from "../../data/Store";
import ItemBaralho from "./ItemBaralho";
import { getMemorizes } from "../../service/Api";

function Memorize() {
  const { thema } = useContext(AppContext);
  const [baralhos, setBaralhos] = useState([]);

  useEffect(() => {
    getMemorizes().then((response) => setBaralhos(response));
  }, []);

  console.log(baralhos);

  return (
    <MemorizeContain thema={thema}>
      <Header TituloDaPagina=""></Header>

      <div className="ListaBaralhos">
        {baralhos?.map((elem, i) => (
          <ItemBaralho
            key={elem.id}
            id={elem.id}
            titulo={elem.titulo}
            qtdPalavras={elem.quantidadeDePalavras}
            to={`/baralho/${elem._id}`}
          />
        ))}
      </div>
    </MemorizeContain>
  );
}

export default Memorize;
