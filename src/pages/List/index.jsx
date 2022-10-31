import * as C from "./style";
import Header from "../../components/Header";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import AddModal from "../../components/AddModal";
import { deleteItem, getMemorizes, patchAddNewItem } from "../../services/Api";
import { AuthContext } from "../../Context/AuthContext";

export default function List() {
  const { thema, currentUserData, token } = useContext(AuthContext);
  const listData = JSON.parse(useParams().listData);
  const [modalOpen, setModalOpen] = useState(false);
  const [ItemsLista, setItemsLista] = useState([]);
  const [newItem, setNewItem] = useState({ WordInEng: "", WordInPt: "" });
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    getMemorizes(token, currentUserData._id)
      .then((res) => {
        setItemsLista(res.data[0].items);
      })
      .catch((err) => console.log(err));
  }, [update]);

  async function AddnewItem(e) {
    e.preventDefault();
    const item = newItem;

    await patchAddNewItem(item, listData._id, token)
      .then((res) => {
        setUpdate((e) => !e);
        setModalOpen(false);
        setNewItem({ WordInEng: "", WordInPt: "" });
      })
      .catch((err) => console.log(err));
  }

  async function DeletarItem(itemID) {
    let confimed = window.confirm("Tem certeza que deseja apagar esse item?");
    if (confimed) {
      await deleteItem(listData._id, itemID, token).then((res) => {
        setUpdate((e) => !e);
      });
    }
  }

  return (
    <C.Container thema={thema}>
      <Header switchButtom logoutButton />

      <AddModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        title="Adicionar nova Palavra"
        SaveFunction={AddnewItem}
      >
        <input
          type="text"
          placeholder="Palavra em Ingles"
          value={newItem.WordInEng}
          onChange={(e) =>
            setNewItem({
              ...newItem,
              WordInEng: e.target.value,
            })
          }
        />
        <input
          type="text"
          placeholder="Palavra em Portugues"
          value={newItem.WordInPt}
          onChange={(e) =>
            setNewItem({
              ...newItem,
              WordInPt: e.target.value,
            })
          }
        />
      </AddModal>

      <C.TableConatiner>
        <C.Table>
          <thead>
            <tr>
              <td>
                <h3 className="eng">Ingles</h3>
              </td>
              <td>
                <h3 className="pt">Portugues</h3>
              </td>
            </tr>
          </thead>
          <tbody>
            {ItemsLista?.map((elem, i) => (
              <tr key={i}>
                <td>{elem.WordInEng}</td>
                <td>
                  <div className="pt">
                    {elem.WordInPt}
                    <span onClick={() => DeletarItem(elem._id)}>
                      <FaRegTrashAlt className="trashIcon" size={13} />
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </C.Table>
      </C.TableConatiner>

      <C.BtnAddItemContainer>
        <div onClick={() => setModalOpen(true)}>
          <FaPlus size={20} />
        </div>
      </C.BtnAddItemContainer>
    </C.Container>
  );
}
