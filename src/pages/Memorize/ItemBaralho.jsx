import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
function ItemBaralho({ titulo, qtdPalavras, to, hidden = false }) {
  return (
    <li>
      <Link to={to}>
        <div>
          <h3>{titulo} -</h3>
          <span>{qtdPalavras} Palavras</span>
        </div>
      </Link>
      {hidden ? <FaStar className="starCircle" size={25} /> : ""}
    </li>
  );
}

export default ItemBaralho;
