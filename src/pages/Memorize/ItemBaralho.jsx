import React, { useState, useContext, useEffect } from "react";
import { FaStar, FaPen, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import firebase from "../../service/firebaseConnection";
import { AuthContext } from "../../data/auth";
import * as C from "./style";

function ItemBaralho({ id, titulo, qtdPalavras, to, hidden = true, excluirBaralho }) {
  const { user } = useContext(AuthContext);
  const [concluido, setConcluido] = useState(false);

  // function excluirBaralho(id) {
  //   alert(id);
  // }

  return (
    <C.ItemContainer>
      <Link to={to}>
        <div>
          <h3>{titulo} -</h3>
          <span>{qtdPalavras} Palavras</span>
        </div>
      </Link>
      {hidden ? (
        ""
      ) : (
        <C.ItemEdit>
          {/* <C.CircleContain size={25}>
            <FaPen size={10} />
          </C.CircleContain> */}

          <C.CircleContain size={25} onClick={() => excluirBaralho(id)}>
            <FaTrash size={10} />
          </C.CircleContain>
        </C.ItemEdit>
      )}
    </C.ItemContainer>
  );
}

export default ItemBaralho;
