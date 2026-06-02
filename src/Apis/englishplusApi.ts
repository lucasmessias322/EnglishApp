import axios from "axios";

export const engleshPlusBaseApiLocal = "http://localhost:8081";
export const engleshPlusBaseApiProduction = "https://engleshplus-api.vercel.app";

export const engleshPlusBaseApi =
  import.meta.env.VITE_ENGLESHPLUS_API_URL ||
  (import.meta.env.DEV ? engleshPlusBaseApiLocal : engleshPlusBaseApiProduction);

export const engleshPlusApi = axios.create({
  baseURL: engleshPlusBaseApiProduction,
});

function authConfig(token: string) {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
}

function asArray<T>(data: T | T[] | null | undefined): T[] {
  if (!data) return [];
  return Array.isArray(data) ? data : [data];
}

function logAndReturn<T>(fallback: T) {
  return (error: unknown) => {
    console.error(error);
    return fallback;
  };
}

export async function PostText(data: any, userId: string, token: string) {
  const post = engleshPlusApi
    .post("/api/texts", data, authConfig(token))
    .then((response) => response.data)
    .catch(logAndReturn(null));

  return await post;
}

export async function PutText(textId: string, data: any, token: string) {
  const put = engleshPlusApi
    .put(`/api/texts/${textId}`, data, authConfig(token))
    .then((response) => response.data)
    .catch(logAndReturn(null));

  return await put;
}

export async function getSingleUser(userId: string, token: string) {
  const get = engleshPlusApi
    .get(`/api/user/${userId}`, authConfig(token))
    .then((response) => response.data);

  return await get;
}

export async function postLogin(data: any) {
  return engleshPlusApi
    .post("/auth/login", data)
    .then((response) => response)
    .catch(logAndReturn(null));
}

export async function postRegister(data: any) {
  return engleshPlusApi
    .post("/auth/register", data)
    .then((response) => response)
    .catch(logAndReturn(null));
}

export async function getTexts({ page = 1, limit = 5 }) {
  const get = engleshPlusApi
    .get(`/api/texts/?page=${page}&limit=${limit}`)
    .then((response) => response.data)
    .catch(logAndReturn({ page, limit, total: 0, totalPages: 0, data: [] }));

  return await get;
}

export async function getSingleText(textid?: string) {
  const get = engleshPlusApi
    .get(`/api/texts/${textid}`)
    .then((response) => asArray(response.data))
    .catch(logAndReturn([]));

  return await get;
}

export async function postText(data: any, token: string) {
  const post = engleshPlusApi.post("/api/texts", data, authConfig(token));

  return await post;
}

export async function deleteText(textid: any, token: string) {
  const del = engleshPlusApi.delete(`/api/texts/${textid}`, authConfig(token));

  return await del;
}

export async function getMemorizes(token: string) {
  const get = engleshPlusApi
    .get("/api/memorize", authConfig(token))
    .then((response) => asArray(response.data))
    .catch(logAndReturn([]));

  return await get;
}

export async function getOneEspecific(memoid: string | undefined, token: string) {
  const get = engleshPlusApi
    .get(`/api/memorize/OneEspecific/${memoid}`, authConfig(token))
    .then((response) => asArray(response.data))
    .catch(logAndReturn([]));

  return await get;
}

export async function getUserMemorizes(userId: string, token: string) {
  const get = engleshPlusApi
    .get(`/api/memorize/UserMemorizes/${userId}`, authConfig(token))
    .then((response) => asArray(response.data))
    .catch(logAndReturn([]));

  return await get;
}

export async function PutMemorize(userId: string, data: any, token: string) {
  const put = engleshPlusApi
    .put(`/api/memorize/${userId}`, data, authConfig(token))
    .then((response) => response.data)
    .catch(logAndReturn(null));

  return await put;
}

export async function PostMemorize(data: any, token: string) {
  const post = engleshPlusApi
    .post("/api/memorize", data, authConfig(token))
    .then((response) => response.data)
    .catch(logAndReturn(null));

  return await post;
}

export async function DeletMemorize(memoId: string, token: string) {
  const post = engleshPlusApi
    .delete(`/api/memorize/${memoId}`, authConfig(token))
    .then((response) => response.data)
    .catch(logAndReturn(null));

  return await post;
}
