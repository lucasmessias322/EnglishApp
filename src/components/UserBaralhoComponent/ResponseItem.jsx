import React from "react";
import * as C from "./style";
import { FaPen } from "react-icons/fa";

export default function ResponseItem({
  thema,
  response,
  editItem,
  setItemId,
  id,
}) {
  return (
    <td>
      <div className="resposonseContainer">
        <span className="response">{response}</span>
        <C.RoundButton
          thema={thema}
          onClick={() => {
            setItemId(id)
            editItem();
          }}
        >
          <FaPen color="white" size={10} />
        </C.RoundButton>
      </div>
    </td>
  );
}
