import axios from "axios";

const OnlineApiHeroku = "https://textoingles-api.herokuapp.com";
const localhost = "http://localhost:8081";

const BaseUrl = OnlineApiHeroku;
const api = axios.create({
  baseURL: BaseUrl,
});

export const config = (token) => {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};

export async function getTextos() {
  const get = api
    .get("/api/textos")
    .then((response) => response.data)
    .catch((error) => console.log(error));

  return await get;
}

export async function postLogin(data) {
  return api
    .post("/auth/login", data)
    .then((response) => response)
    .catch((error) => console.log(error));
}

export async function postRegister(data) {
  return api
    .post("/auth/register", data)
    .then((response) => response)
    .catch((error) => console.log(error));
}

export async function postNewMemorize(data, token) {
  let options = {
    method: "POST",
    url: `${BaseUrl}/memorizes`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: `${JSON.stringify(data)}`,
  };

  return axios.request(options);
}

export async function patchAddNewItem(data, listId, token) {
  let options = {
    method: "PATCH",
    url: `${BaseUrl}/memorizes/saveNewItem/${listId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: `${JSON.stringify(data)}`,
  };

  return axios.request(options);
}

export async function patchEditListName(data, listId, token) {
  let options = {
    method: "PATCH",
    url: `${BaseUrl}/memorizes/editListaName/${listId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: `${JSON.stringify(data)}`,
  };

  return axios.request(options);
}

export async function deleteMemorize(id, token) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const deletememo = api
    .delete(`/memorizes/${id}`, config)
    .then((response) => response)
    .catch((error) => console.log(error));

  return deletememo;
}

export async function deleteItem(listId, itemid, token) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const deleteitem = api
    .delete(`/memorizes/item/${listId}/${itemid}`, config)
    .then((response) => response)
    .catch((error) => console.log(error));

  return deleteitem;
}

export async function getMemorizes(token, userID) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return api
    .get(`/memorizes/my/${userID}`, config)
    .then((response) => response)
    .catch((error) => console.log(error));
}
