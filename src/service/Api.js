import axios from "axios";

const api = axios.create({
  baseURL: "https://textoingles-api.herokuapp.com/",
});

export function getTextos() {
  let gettext = api
    .get("/artigo")
    .then((response) => response.data)
    .catch((error) => console.log(error));

  return gettext;
}
