import React, { useContext, useEffect, useState } from "react";
import * as C from "./style";

// context
import { AppContext } from "../../Context/Store";
import Header from "../Header";

//helpers
import { getStorage, setStorage } from "../storageFunction/set";
import { v4 as uuidv4 } from "uuid";

// components
import AddinputCard from "../AddInputCard";
import {
  editByfecth,
  getUserMemorizeItemByIndex,
} from "../../services/authenticationApi";
import EditionCard from "./EditionCard";

import ResponseItem from "./ResponseItem";
import QuestionItem from "./QuestionItem";

// types
type Props = {
  match: any;
};

function UserBaralhoComponent({ match }: Props) {
  const { thema, token } = useContext(AppContext);

  const [toogleAddbaralho, setToogleAddbaralho] = useState(false);
  const [WordInEnglish, setWordInEnglish] = useState("");
  const [WordInProtuguese, setWordInProtuguese] = useState("");
  const [update, setupdate] = useState(false);
  const [editItem, setEditItem] = useState(false);

  const [current, setCurrent] = useState(match.params.itemid);
  const [baralho, setBaralho] = useState(
    getStorage("currentUserData").memorize[current]
  );

  const [itemId, setItemId] = useState("");

  useEffect(() => {
    if (update) {
      const userStorage: any = getStorage("currentUserData");
      getUserMemorizeItemByIndex(userStorage._id, current, token).then(
        (res) => {
          setBaralho(getStorage("currentUserData").memorize[current]);
          setupdate(false);
        }
      );
    }
  }, [update]);

  function saveitem() {
    if (WordInEnglish !== "" && WordInProtuguese !== "") {
      let items: any = {
        _id: uuidv4(),
        question: WordInEnglish,
        response: WordInProtuguese,
      };

      const userStorage: any = getStorage("currentUserData");
      userStorage.memorize[current].items.push(items);

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

  function saveEditItem(id: string) {
    if (WordInEnglish !== "" && WordInProtuguese !== "") {
      let item: any = {
        question: WordInEnglish,
        response: WordInProtuguese,
      };

      const userStorage: any = getStorage("currentUserData");
      let items = userStorage.memorize[current].items;

      items.forEach(function (el: any, i: any) {
        if (el._id === itemId) {
          // achou!
          items[i].question = WordInEnglish;
          items[i].response = WordInProtuguese;
          console.log(items);

          setStorage("currentUserData", userStorage);
          editByfecth(userStorage._id, userStorage.memorize, token)
            .then((res) => {
              setEditItem(false);
              setupdate(true);
              setWordInEnglish("");
              setWordInProtuguese("");
            })
            .catch(function (error) {
              console.error(error);
            });
        }
      });
    }
  }

  function deleteItem() {
    const userStorage: any = getStorage("currentUserData");

    userStorage.memorize[current].items.forEach((el: any, i: any) => {
      if (el._id === itemId) {
        userStorage.memorize[current].items.splice(i, 1);
        setStorage("currentUserData", userStorage);

        editByfecth(userStorage._id, userStorage.memorize, token)
          .then((res) => {
            setEditItem(false);
            setupdate(true);
            setWordInEnglish("");
            setWordInProtuguese("");
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    });
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
        cancel={() => setToogleAddbaralho((e) => !e)}
        ok={() => saveitem()}
        setWordInEnglish={setWordInEnglish}
        WordInEnglish={WordInEnglish}
        setWordInProtuguese={setWordInProtuguese}
        WordInProtuguese={WordInProtuguese}
      />
      
      <EditionCard
        editItem={editItem}
        cancel={() => setEditItem((e) => !e)}
        ok={saveEditItem}
        deleteItem={deleteItem}
        setWordInEnglish={setWordInEnglish}
        WordInEnglish={WordInEnglish}
        setWordInProtuguese={setWordInProtuguese}
        WordInProtuguese={WordInProtuguese}
      />
      <br /> <br /> <br /> <br /> <br /> <br />
      <C.Table thema={thema}>
        {baralho.items.map((elem: any, i: any) => (
          <tr key={i} id={i}>
            <QuestionItem thema={thema} question={elem.question} />

            <ResponseItem
              thema={thema}
              response={elem.response}
              editItem={() => setEditItem((e) => !e)}
              setItemId={setItemId}
              id={elem._id}
            />
          </tr>
        ))}
      </C.Table>
    </C.BaralhoContain>
  );
}

export default UserBaralhoComponent;
