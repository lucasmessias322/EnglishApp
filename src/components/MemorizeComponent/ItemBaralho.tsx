import React, { useContext } from "react";
import { Link } from "react-router-dom";
import * as C from "./style";
import { FaStar, FaPen, FaTrash } from "react-icons/fa";
import { AppContext } from "../../Context/Store";

function ItemBaralho({
  thema,
  id,
  titulo,
  qtdPalavras,
  to,
  hidden = true,
  excluirBaralho,
 
 
}: any) {
  const {setCurrent} = useContext(AppContext)
  return (
    <C.ItemContainer thema={thema} >
      <Link to={to} >
        <div>
          <h3>{titulo} -</h3>
          <span>{qtdPalavras} Palavras</span>
        </div>
      </Link>
      {hidden ? "": (
        <C.ItemEdit >
           {/* <C.CircleContain size={25}>
            <FaPen size={10} />
          </C.CircleContain> */}

          {excluirBaralho ? <C.CircleContain size={25} onClick={() => excluirBaralho(id)}>
            <FaTrash size={10} />
          </C.CircleContain>: ""}
        </C.ItemEdit>
      )}
    </C.ItemContainer>
  );
}

export default ItemBaralho;
