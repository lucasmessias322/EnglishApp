import React from "react";
import * as C from "./style";

import { FaUser, FaLock } from "react-icons/fa";

function Input(props) {
  return (
    <C.InputText>
      <div>
        {props.User ? (
          <FaUser color="white" size={20} />
        ) : (
          <FaLock color="white" size={20} />
        )}
      </div>
      <input required={true} value={props.value} onChange={props.onChange} type={props.Type} placeholder={props.placeholder}/>
    </C.InputText>
  );
}

export default Input;
