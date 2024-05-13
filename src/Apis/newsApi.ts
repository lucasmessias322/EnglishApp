import axios from "axios";

const newsApiBaseUrl = "http://localhost:8081";
export const engleshPlusBaseApi = "https://frightened-visor-fly.cyclic.app";

const newsApi = axios.create({
  baseURL: engleshPlusBaseApi,
});

export async function getNews() {
  const get = newsApi
    .get(`/api/news`)
    .then((response) => response.data)
    .catch((error) => console.log(error));

  return await get;
}

export async function getArticle(articleid: string) {
  const get = newsApi
    .get(`/api/news/${articleid}`)
    .then((response) => response.data)
    .catch((error) => console.log(error));

  return await get;
}
