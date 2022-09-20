import axios from "axios";

const api = axios.create({
  baseURL: "https://textoingles-api.herokuapp.com/api",
});

export async function getTextos() {
  const get = api
    .get("/textos")
    .then((response) => response.data)
    .catch((error) => console.log(error));

  return await get;
}
