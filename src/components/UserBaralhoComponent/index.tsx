import React, { useContext, useEffect, useState } from 'react'
import * as C from './style'

// context
import { AppContext } from '../../Context/Store'
import Header from '../Header';

//helpers
import { getStorage, setStorage } from '../storageFunction/set';
import { v4 as uuidv4 } from "uuid";

// components
import AddinputCard from '../AddInputCard';
import { editByfecth, getUserdata, getUserMemorizeItemByIndex } from '../../services/authenticationApi';
import { FaVolumeDown, FaTrash } from "react-icons/fa";
import { Speak } from '../Speaker';


// types
type Props = {
  match: any,
}

function UserBaralhoComponent({ match }: Props) {
  const { thema, token } = useContext(AppContext);

  const [toogleAddbaralho, setToogleAddbaralho] = useState(false);
  const [WordInEnglish, setWordInEnglish] = useState("");
  const [WordInProtuguese, setWordInProtuguese] = useState("");
  const [update, setupdate] = useState(false);

  const [current, setCurrent] = useState(match.params.itemid)
  const [baralho, setBaralho] = useState(getStorage("currentUserData").memorize[current]);

  useEffect(() => {
    if (update) {
      const userStorage: any = getStorage("currentUserData");
      getUserMemorizeItemByIndex(userStorage._id, current, token).then(res => {

        setBaralho(getStorage("currentUserData").memorize[current])
        setupdate(false)
      })
    }

  }, [update]);

  function closeInputAddCard() {
    setToogleAddbaralho(false);
  }

  function saveitem() {
    if (WordInEnglish !== "" && WordInProtuguese !== "") {
      let items: any = {
        _id: uuidv4(),
        question: WordInEnglish,
        response: WordInProtuguese,
      };

      const userStorage: any = getStorage("currentUserData");
      userStorage.memorize[current].items.push(items);
      console.log(userStorage.memorize[current]);

      setStorage("currentUserData", userStorage);

      editByfecth(userStorage._id, userStorage.memorize, token)
        .then((res) => {
          setToogleAddbaralho(false);
          setupdate(true);
          setWordInEnglish("");
          setWordInProtuguese("");
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }

  function deleteItem(id: number) {
    const userStorage: any = getStorage("currentUserData");

    userStorage.memorize[current].items.forEach((el: any, i: any) => {
      if (el._id === id) {
        userStorage.memorize[current].items.splice(i, 1);
      }
    });

    setStorage("currentUserData", userStorage);
    setupdate(true);

    console.log(id);
  }


  return (
    <C.BaralhoContain thema={thema}>
      <Header
        MemorizeTable={true}
        switchButtom
        logoutButton
        isUserBaralho={true}
        baralholength={baralho.items.length}
        exameOnClick={`/userexame/${baralho._id}/itemId/${current}`}
        addnewItem={() => setToogleAddbaralho(true)}
      ></Header>

      <AddinputCard
        title="Add new Item"
        toogleAddbaralho={toogleAddbaralho}
        cancel={() => closeInputAddCard()}
        ok={() => saveitem()}
      >
        <input
          type="text"
          placeholder="Palavra em ingles..."
          value={WordInEnglish}
          onChange={(e) => setWordInEnglish(e.target.value)}
        />
        <input
          type="text"
          placeholder="Palavra em portugues..."
          value={WordInProtuguese}
          onChange={(e) => setWordInProtuguese(e.target.value)}
        />
      </AddinputCard>
      <br /> <br /> <br /> <br /> <br /> <br />

      <C.Table thema={thema}>
        {baralho.items.map((elem: any, i: any) => (
          <tr key={i}>
            <td onClick={() => Speak(elem.question)}>
              <div className="container">
                <C.RoundButton thema={thema}>
                  <FaVolumeDown
                    className="volumeDow-icon"
                    color="white"
                    size={15}
                  />
                </C.RoundButton>

                <span>{elem.question}</span>
              </div>
            </td>

            <td>
              <div className="resposonseContainer">
                <span className="response">{elem.response}</span>
                <C.RoundButton thema={thema}>
                  <FaTrash
                    color="white"
                    size={15}
                    onClick={() => deleteItem(elem._id)}
                  />
                </C.RoundButton>
              </div>
            </td>

          </tr>
        ))}
      </C.Table>

    </C.BaralhoContain>
  )
}

export default UserBaralhoComponent
