import React, { useState } from "react";
import { FaAngleRight, FaAngleDown } from "react-icons/fa";
import * as C from "./style";

function CardResponse(props) {
  const [toogle, setToogle] = useState(false);

  return (
    <C.CardResponse>
      <div className="card">
        <h3>{props.Pergunta}</h3>
        <div>
          {toogle ? (
            <FaAngleDown size={25} onClick={() => setToogle((e) => !e)} />
          ) : (
            <FaAngleRight size={25} onClick={() => setToogle((e) => !e)} />
          )}
        </div>
      </div>

      <C.Response Menu={toogle}>{props.children}</C.Response>
    </C.CardResponse>
  );
}

export default CardResponse;
