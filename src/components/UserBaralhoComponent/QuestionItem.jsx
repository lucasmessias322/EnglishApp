import * as C from "./style";
import { FaVolumeDown } from "react-icons/fa";
import { Speak } from "../Speaker";

export default function QuestionItem({ thema, question }) {
  return (
    <td onClick={() => Speak(question)}>
      <div className="container">
        {/* <C.RoundButton thema={thema}>
          <FaVolumeDown className="volumeDow-icon" color="white" size={15} />
        </C.RoundButton> */}

        <span>{question}</span>
      </div>
    </td>
  );
}
