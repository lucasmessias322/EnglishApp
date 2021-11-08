import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { MemorizeContain } from "./style";
import { AppContext } from "../../data/Store";
import ItemBaralho from "./ItemBaralho";
import { getMemorizes } from "../../service/Api";
import { AuthContext } from "../../data/auth";

function Memorize() {
  const { thema } = useContext(AppContext);
  const { user } = useContext(AuthContext);
  const [baralhos, setBaralhos] = useState([]);


  useEffect(() => {
    getMemorizes().then((response) => setBaralhos(response));
  }, []);


  return (
    <MemorizeContain thema={thema}>
      <Header  MenuBars={false} TituloDaPagina=""></Header>

      <div className="ListaBaralhos">
        {baralhos?.map((elem, i) => (
          <ItemBaralho
            key={elem.id}
            id={elem.id}
            titulo={elem.titulo}
            qtdPalavras={elem.items.length}
            to={`/baralho/${elem._id}`}
          />
        ))}
      </div>
    </MemorizeContain>
  );
}

export default Memorize;
