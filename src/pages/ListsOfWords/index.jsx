import React, { useContext, useEffect, useRef, useState } from "react";
import * as C from "./style";
import Header from "../../components/Header";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import {
  deleteMemorize,
  getMemorizes,
  postNewMemorize,
  patchEditListName,
} from "../../services/Api";
import { FaPlus, FaRegTrashAlt, FaPencilAlt } from "react-icons/fa";
import AddModal from "../../components/AddModal";

export default function ListsOfWords() {
  const { thema, token, currentUserData } = useContext(AuthContext);
  const [myLists, setMyLists] = useState([]);
  const [listModalOpen, setListModalOpen] = useState(false);
  const [newListItem, setNewListItem] = useState({
    title: "",
    userId: "",
    username: "",
    items: [],
    private: false,
  });
  const [editListName, setEditListName] = useState(false);

  const [update, setUpdate] = useState(false);

  useEffect(() => {
    getMemorizes(token, currentUserData._id)
      .then((res) => {
        setMyLists(res.data);
      })
      .catch((err) => console.log(err));
  }, [update]);

  async function AddnewListItem(e) {
    e.preventDefault();

    const data = {
      title: newListItem.title,
      userID: currentUserData._id,
      username: currentUserData.username,
      items: newListItem.items,
      private: newListItem.private,
    };

    await postNewMemorize(data, token)
      .then((res) => {
        setListModalOpen(false);
        setUpdate((e) => !e);
        setNewListItem({
          title: "",
          userId: "",
          username: "",
          items: [],
          private: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function DeleteList(id) {
    let confimed = window.confirm("Tem certeza que deseja apagar essa lista?");
    if (confimed) {
      await deleteMemorize(id, token).then((res) => setUpdate((e) => !e));
    }
  }

  async function EditListName(e) {
    e.preventDefault();

    const data = {
      title: newListItem.title,
    };

    await patchEditListName(data, editListName, token)
      .then((res) => {
        setListModalOpen(false);
        setUpdate((e) => !e);
        setNewListItem({
          title: "",
          userId: "",
          username: "",
          items: [],
          private: false,
        });
        setEditListName(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <C.Container thema={thema}>
      <Header switchButtom logoutButton />
      <AddModal
        modalOpen={listModalOpen}
        setModalOpen={setListModalOpen}
        title={editListName ? "Editar lista" : "Criar lista"}
        SaveFunction={editListName ? EditListName : AddnewListItem}
      >
        <input
          type="text"
          placeholder="Digite o nome da lista"
          value={newListItem.title}
          onChange={(e) =>
            setNewListItem({
              ...newListItem,
              title: e.target.value,
            })
          }
        />
      </AddModal>

      <C.ListContainer>
        {myLists?.map((elem, i) => (
          <C.ListItem key={i} thema={thema}>
            <div>
              <Link to={`/list/${JSON.stringify(elem)}`}>
                <h3>{elem.title} </h3>
                <span>{elem.items.length} Termos</span>
              </Link>
            </div>
            <div className="BtnsContainer">
              <span
                className="iconContainer"
                onClick={() => {
                  setEditListName(elem._id);
                  setListModalOpen(true);
                }}
              >
                <FaPencilAlt size={13} />
              </span>
              <span
                className="iconContainer"
                onClick={() => DeleteList(elem._id)}
              >
                <FaRegTrashAlt size={13} />
              </span>
            </div>
          </C.ListItem>
        ))}
      </C.ListContainer>

      <C.BtnAddListContainer>
        <div onClick={() => setListModalOpen(true)}>
          <FaPlus size={20} />
        </div>
      </C.BtnAddListContainer>
    </C.Container>
  );
}
