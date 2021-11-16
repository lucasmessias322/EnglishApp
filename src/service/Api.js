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

export function getMemorizes() {
  let getmemorizes = api
    .get("/memorize")
    .then((response) => response.data)
    .catch((error) => console.log(error));

  return getmemorizes;
}

export function getBaralho(id) {
  let getmemorize = api
    .get(`/memorize/${id}`)
    .then((response) => response.data)
    .catch((error) => console.log(error));

  return getmemorize;
}

export function postBaralho(value) {
  let postBaralho = api.post("/memorize", value).then((response) => {
    
  });

  return postBaralho;
}

export function DeletarBaralho(id) {
  let deletarBaralho = api.delete("/memorize/" + id);

  return deletarBaralho;
}

export function updateBaralhoItems(id, newValues) {
  let deletarBaralho = api.put("/memorize/" + id, newValues);

  return deletarBaralho;
}
