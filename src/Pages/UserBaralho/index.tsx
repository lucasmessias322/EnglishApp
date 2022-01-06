import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/Store";
import Header from "../../components/Header";
import * as C from "./style";
import { FaVolumeDown, FaTrash } from "react-icons/fa";
import { Speak } from "../../components/Speaker";
import { getStorage, setStorage } from "../../components/storageFunction/set";
import AddinputCard from "../../components/AddInputCard";
import { editByfecth } from "../../services/authenticationApi";

import { v4 as uuidv4 } from "uuid";
import UserBaralhoComponent from "../../components/UserBaralhoComponent";

function UserBaralho({ match }: any) {
  // const [toogleAddbaralho, setToogleAddbaralho] = useState(false);
  // const [WordInEnglish, setWordInEnglish] = useState("");
  // const [WordInProtuguese, setWordInProtuguese] = useState("");
  // const [baralho, setBaralho] = useState({
  //   _id: "",
  //   titulo: "",
  //   items: [],
  // });
  // const [update, setupdate] = useState(false);

  // function BuscarItemPorId() {
  //   let filter: any = getStorage("currentUserData").memorize.find(
  //     (x: any) => x._id == match.params.id
  //   );
  //   setBaralho(filter);
  //   console.log(filter);
  // }

  // useEffect(() => {
  //   setupdate(true);
  // }, [baralho]);

  // useEffect(() => {
  //   BuscarItemPorId();
  // }, [update]);

  // function closeInputAddCard() {
  //   setToogleAddbaralho(false);
  // }

  // function saveitem() {
  //   if (WordInEnglish !== "" && WordInProtuguese !== "") {
  //     let items: any = {
  //       _id: uuidv4(),
  //       question: WordInEnglish,
  //       response: WordInProtuguese,
  //     };

  //     const userStorage: any = getStorage("currentUserData");
  //     userStorage.memorize[0].items.push(items);
  //     console.log(userStorage.memorize[0]);

  //     setStorage("currentUserData", userStorage);

  //     editByfecth(userStorage._id, userStorage.memorize, token)
  //       .then((res) => {
  //         setToogleAddbaralho(false);
  //         setupdate((e) => !e);
  //         setWordInEnglish("");
  //         setWordInProtuguese("");
  //       })
  //       .catch(function (error) {
  //         console.error(error);
  //       });
  //   }
  // }

  // function deleteItem(id: number) {
  //   const userStorage: any = getStorage("currentUserData");

  //   userStorage.memorize[0].items.forEach((el: any, i: any) => {
  //     if (el._id === id) {
  //       userStorage.memorize[0].items.splice(i, 1);
  //     }
  //   });

  //   setStorage("currentUserData", userStorage);
  //   setupdate((e) => !e);
  //   console.log(id);
  // }

  return (
    <UserBaralhoComponent match={match}  />
    // <C.BaralhoContain thema={thema}>
    //   <Header
    //     MemorizeTable={true}
    //     switchButtom
    //     logoutButton
    //     isUserBaralho={true}
    //     baralholength={baralho.items.length}
    //     exameOnClick={
    //       baralho.items.length > 0
    //         ? `/userexame/${baralho._id ? baralho._id : ""}`
    //         : ""
    //     }
    //     addnewItem={() => setToogleAddbaralho(true)}
    //   />
    //   <AddinputCard
    //     title="Add new Item"
    //     toogleAddbaralho={toogleAddbaralho}
    //     cancel={() => closeInputAddCard()}
    //     ok={() => saveitem()}
    //   >
    //     <input
    //       type="text"
    //       placeholder="Palavra em ingles..."
    //       value={WordInEnglish}
    //       onChange={(e) => setWordInEnglish(e.target.value)}
    //     />
    //     <input
    //       type="text"
    //       placeholder="Palavra em portugues..."
    //       value={WordInProtuguese}
    //       onChange={(e) => setWordInProtuguese(e.target.value)}
    //     />
    //   </AddinputCard>
    //   <br /> <br /> <br /> <br /> <br /> <br />
      
    //   <table id="table">
    //     {baralho.items.map((elem: any, i: any) => (
    //       <tr key={i}>
    //         <td onClick={() => Speak(elem.question, 0.8)}>
    //           <div className="container">
    //             <C.RoundButton thema={thema}>
    //               <FaVolumeDown
    //                 className="volumeDow-icon"
    //                 color="white"
    //                 size={15}
    //               />
    //             </C.RoundButton>

    //             <span>{elem.question}</span>
    //           </div>
    //         </td>
    //         <td>
    //           <div className="resposonseContainer">
    //             <span className="response">{elem.response}</span>
    //             <C.RoundButton thema={thema}>
    //               <FaTrash
    //                 color="white"
    //                 size={15}
    //                 onClick={() => deleteItem(elem._id)}
    //               />
    //             </C.RoundButton>
    //           </div>
    //         </td>
    //       </tr>
    //     ))}
    //   </table>
    // </C.BaralhoContain>
  );
}

export default UserBaralho;
