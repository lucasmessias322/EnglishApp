import React,{useState, useContext, useEffect} from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import firebase from '../../service/firebaseConnection'
import { AuthContext } from "../../data/auth";

function ItemBaralho({ titulo, qtdPalavras, to, hidden = false}) {
  const { user } = useContext(AuthContext);
  const [concluido, setConcluido] = useState(false)

  return (
    <li>
      <Link to={to}>
        <div>
          <h3>{titulo} -</h3>
          <span>{qtdPalavras} Palavras</span>
        </div>
      </Link>
      {hidden ? <FaStar onClick={() => setConcluido(e => !e)} className="starCircle" color={concluido ? "yellow": "white"} size={25} /> : ""}
    </li>
  );
}

export default ItemBaralho;
