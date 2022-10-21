import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import * as C from "./style";

function Input({ User, Password, Email, ...rest }) {
  return (
    <C.InputText>
      <div>
        {User ? (
          <FaUser color="white" size={20} />
        ) : Password ? (
          <FaLock color="white" size={20} />
        ) : Email ? (
          <FaEnvelope color="white" size={20} />
        ) : (
          ""
        )}
      </div>
      <input {...rest} />
    </C.InputText>
  );
}

export default Input;
