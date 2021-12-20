import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/Store";
import Header from "../../components/Header";
import * as C from "./style";
import { FaClipboardList, FaVolumeDown } from "react-icons/fa";
import { Speak } from "../../components/Speaker";
import { Link } from "react-router-dom";

function UserBaralho({ match }: any) {
  const { thema, currentUserData } = useContext(AppContext);
  const [baralho, setBaralho] = useState({
    _id: "",
    titulo: "",
    items: [],
  });

  function BuscarItemPorId() {
    let filter: any = currentUserData.memorize.find(
      (x) => x._id == match.params.id
    );
    setBaralho(filter);
  }

  useEffect(() => {
    BuscarItemPorId();
  }, [baralho]);

  return (
    <C.BaralhoContain thema={thema}>
      <Header MemorizeTable={true} />
      <br /> <br /> <br /> <br /> <br /> <br />
      <table id="table">
        {baralho.items.map((elem: any, i: any) => (
          <tr>
            <td onClick={() => Speak(elem.questions, 0.8)}>
              <div className="container">
                <C.RoundButton thema={thema}>
                  <FaVolumeDown
                    className="volumeDow-icon"
                    color="white"
                    size={15}
                  />
                </C.RoundButton>

                <span>{elem.questions}</span>
              </div>
            </td>
            <td>
              <div className="resposonseContainer">
                <span className="response">{elem.response}</span>
              </div>
            </td>
          </tr>
        ))}
      </table>
      {baralho.items.length >= 0 ? (
        <Link to={`/userexame/${baralho._id ? baralho._id : ""}`}>
          <div className="exame">
            <FaClipboardList size={30} color="white" />
          </div>
        </Link>
      ) : (
        "não"
      )}
    </C.BaralhoContain>
  );
}

export default UserBaralho;
