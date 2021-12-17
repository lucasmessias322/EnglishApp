import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/Store";
import { getMemorizes } from "../../services/Api";
import Header from "../Header";
import ItemBaralho from "./ItemBaralho";
import * as C from "./style";
import { FaPlus, FaTemperatureLow } from "react-icons/fa";
import {
  config,
  editUserData,
  getUserdata,
} from "../../services/authenticationApi";

function MemorizeComponent() {
  const { thema, token } = useContext(AppContext);
  const [currentUser, setCurrentUser] = useState<any>({
    _id: "",
    email: "",
    name: "",
    memorize: [
      {
        _id: "",
        titulo: "Carregando",
        items: [{ _id: "", questao: "", resposta: "" }],
      },
    ],
  });
  const [baralhos, setBaralhos] = useState([
    {
      _id: "",
      titulo: "Carregando...",
      items: [
        {
          _id: "",
          questao: "",
          resposta: "",
        },
      ],
    },
  ]);
  const [alteracao, setAlteracao] = useState(false);
  const [nomeNewBaralho, setNomeNewBaralho] = useState("");
  const [toogleAddbaralho, setToogleAddbaralho] = useState(false);
  const [mem, setmen] = useState([]);

  function getStorage(item: string) {
    let get: any = localStorage.getItem(item);
    let parser = JSON.parse(get);

    return parser;
  }

  function setStorage(item: string, value: any) {
    let valor = JSON.stringify(value);
    localStorage.setItem(item, valor);
  }

  async function adcionarnovoBaralhot() {
    if (nomeNewBaralho !== "") {
      let data = {
        items: [],
        titulo: nomeNewBaralho,
        _id: `${Math.random() * 100}`,
      };

      const userStorage: any = getStorage("currentUserData");
      const memorizer = userStorage.memorize;

      await userStorage.memorize.push(data);

      setStorage("currentUserData", userStorage);

      await editUserData(userStorage._id, memorizer, config(token))
        .then((response) => {
          setAlteracao(true);
          console.log(response);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  // useEffect(() => {
  //   if (alteracao) {
  //     getUserdata("61bbb16bdc8190ff6e8cc847", config(token)).then(
  //       (response) => {
  //         setStorage("currentUserData", response.user);
  //         setAlteracao(false);
  //       }
  //     );
  //   }
  // }, [alteracao]);

  useEffect(() => {
    getMemorizes().then((response) => setBaralhos(response));
  }, []);

  useEffect(() => {
    let userStorage: any = getStorage("currentUserData");
    setCurrentUser(userStorage);
    console.log(userStorage);
  }, [alteracao]);

  useEffect(() => {
    const userStorage: any = getStorage("currentUserData");
    // const mm: any = {...userStorage, titulo: "ola lus"};
    // console.log(mm);

    console.log(userStorage.memorize);
  }, []);

  return (
    <C.MemorizeContain thema={thema}>
      <Header TituloDaPagina="" />

      <C.CriarBaralhoContain toogleAddbaralho={toogleAddbaralho}>
        <C.CardCriarBaralho>
          <div className="contain">
            <h3>Criar baralho</h3>
            <div className="inputContain">
              <input
                type="text"
                placeholder="Nome do baralho.."
                value={nomeNewBaralho}
                onChange={(e) => setNomeNewBaralho(e.target.value)}
              />
            </div>
            <div className="actions">
              <h5 onClick={() => setToogleAddbaralho(false)}>CANCELAR</h5>
              <h5
                onClick={() => (
                  adcionarnovoBaralhot(), setToogleAddbaralho(false)
                )}
              >
                OK
              </h5>
            </div>
          </div>
        </C.CardCriarBaralho>
      </C.CriarBaralhoContain>

      <C.ListaBaralhos>
        {baralhos?.map((elem: any, i: any) => (
          <ItemBaralho
            thema={thema}
            key={i}
            id={elem._id}
            titulo={elem.titulo}
            qtdPalavras={elem.items.length}
            hidden={false}
            to={`/baralho/${elem._id}`}
          />
        ))}
      </C.ListaBaralhos>

      {currentUser.memorize?.map((elem: any, i: any) => (
        <ItemBaralho
          thema={thema}
          key={i}
          id={elem._id}
          titulo={elem.titulo}
          qtdPalavras={elem.items.length}
          hidden={false}
          // excluirBaralho={excluirBaralho}
          to={`/userbaralho/${elem._id}`}
        />
      ))}

      <C.AddCardContain thema={thema}>
        <div className="linhar">
          <C.AddCard size={50} onClick={() => setToogleAddbaralho(true)}>
            <FaPlus size={25} color="white" />
          </C.AddCard>
        </div>
      </C.AddCardContain>
    </C.MemorizeContain>
  );
}

export default MemorizeComponent;
