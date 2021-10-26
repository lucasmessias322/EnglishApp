import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
function ItemBaralho({ titulo, qtdPalavras, to }) {
  return (
    <Link to={to}>
      <li>
        <div>
          <h3>{titulo} -</h3>
          <span>{qtdPalavras} Palavras</span>
        </div>
        <FaStar className="starCircle" size={25} />
      </li>
    </Link>
  );
}

export default ItemBaralho;
