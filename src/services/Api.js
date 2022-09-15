import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081/Api",
});

export async function getTextos() {
  const get = api
    .get("/textos")
    .then((response) => response.data)
    .catch((error) => console.log(error));

  return await get;
}
