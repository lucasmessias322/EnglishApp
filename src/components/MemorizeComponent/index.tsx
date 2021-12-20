import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/Store";
import { getMemorizes } from "../../services/Api";
import Header from "../Header";
import ItemBaralho from "./ItemBaralho";
import * as C from "./style";
import { FaPlus, FaTemperatureLow } from "react-icons/fa";
import {
  config,
  editByfecth,
  editUserData,
  getUserdata,
} from "../../services/authenticationApi";
import axios from "axios";
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

  const [updateCurrentuser, setUpdateCurrentUser] = useState(false);

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
      let memorizer = {
        titulo: nomeNewBaralho,
        items: [],
      };

      const userStorage: any = getStorage("currentUserData");
      userStorage.memorize.push(memorizer);

      setStorage("currentUserData", userStorage);

      const options: any = {
        method: "PATCH",
        url: `http://localhost:8081/auth/edit/${userStorage._id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: `{\n"memorize": ${JSON.stringify(userStorage.memorize)}\n}`,
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response);
          setAlteracao(true);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }

  useEffect(() => {
    if (alteracao) {
      const userStorage: any = getStorage("currentUserData");
      getUserdata(userStorage._id, config(token)).then((response) => {
        setStorage("currentUserData", response.user);
        setCurrentUser(response.user);
        console.log(response.user);

        setAlteracao(false);
      });
    }
  }, [alteracao]);

  useEffect(() => {
    getMemorizes().then((response) => setBaralhos(response));
  }, []);

  useEffect(() => {
    let userStorage: any = getStorage("currentUserData");
    setCurrentUser(userStorage);
    console.log(userStorage);
  }, []);

  function handleExcluirBaralho(id: string) {
    alert(id);
    const userStorage: any = getStorage("currentUserData");

    console.log(id);
    var cond = { _id: id };
    // var procura: any = userStorage.memorize.indexOf(cond);
    console.log(userStorage.memorize);

    // console.log(procura);

    userStorage.memorize.forEach((el: any, i: any) => {
      if (el._id === id) {
        console.log(i);
        userStorage.memorize.splice(i, 1);
      }
    });

    setStorage("currentUserData", userStorage);

    const options: any = {
      method: "PATCH",
      url: `http://localhost:8081/auth/edit/${userStorage._id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: `{\n"memorize": ${JSON.stringify(userStorage.memorize)}\n}`,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response);
        setAlteracao(true);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

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
          excluirBaralho={handleExcluirBaralho}
          to={`/userbaralho/${elem._id}`}
        />
      ))}

      <br />
      <br />
      <br />
      <br />
      <br />

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
