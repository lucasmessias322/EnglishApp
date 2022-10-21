import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081",
});

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
