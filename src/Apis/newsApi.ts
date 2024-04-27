// https://newsapi.org/v2/everything?q=Apple&from=2024-04-09&sortBy=popularity&apiKey=66e4119252284e1aad0e276006c2f156
import axios from "axios";
const apiKey = "66e4119252284e1aad0e276006c2f156";
const newsApiBaseUrl = "https://newsapi.org/v2";

const newsApi = axios.create({
  baseURL: newsApiBaseUrl,
  headers: { Authorization: `Bearer ${apiKey}` },
});

export async function getNews(page?: number, category?: string) {
  const get = newsApi
    .get(
      `/top-headlines?country=us&sortBy=relevancy&language=en&category=${category}&page=${page}&pageSize=25`
    )
    .then((response) => response.data)
    .catch((error) => console.log(error));

  return await get;
}
