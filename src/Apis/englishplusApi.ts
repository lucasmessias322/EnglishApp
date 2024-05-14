import axios from "axios";

export const engleshPlusBaseApiLocal = `http://localhost:8081`;
export const engleshPlusBaseApi = "https://engleshplus-api.vercel.app";

const engleshPlusApi = axios.create({
  baseURL: engleshPlusBaseApi,
});

export async function PostText(data: any, userId: string, token: string) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const post = engleshPlusApi
    .post(`/api/texts/${userId}`, data, config)
    .then((response) => response.data)
    .catch((error) => console.log(error));

  return await post;
}

export async function UploadAudios(
  folderName: string,
  data: any,
  token: string
) {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  const post = engleshPlusApi
    .post(`/api/texts/upload?folderName=${folderName}`, data, config)
    .then((response) => response.data)
    .catch((error) => console.log(error));

  return await post;
}

export async function getSingleUser(userId: string, token: string) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const get = engleshPlusApi
    .get(`/api/user/${userId}`, config)
    .then((response) => response.data);
  // .catch((error) => console.log(error));

  return await get;
}

export async function postLogin(data: any) {
  return engleshPlusApi
    .post("/auth/login", data)
    .then((response) => response)
    .catch((error) => console.log(error));
}

export async function postRegister(data: any) {
  return engleshPlusApi
    .post("/auth/register", data)
    .then((response) => response)
    .catch((error) => console.log(error));
}

export async function getTexts() {
  const get = engleshPlusApi
    .get(`/api/texts`)
    .then((response) => response.data)
    .catch((error) => console.log(error));

  return await get;
}

export async function getSingleText(textid?: string) {
  const get = engleshPlusApi
    .get(`/api/texts/${textid}`)
    .then((response) => response.data)
    .catch((error) => console.log(error));

  return await get;
}

export async function getMemorizes(token: string) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const get = engleshPlusApi
    .get("/api/memorize", config)
    .then((response) => response.data)
    .catch((error) => console.log(error));

  return await get;
}

export async function getOneEspecific(memoid: string, token: string) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const get = engleshPlusApi
    .get(`/api/memorize/OneEspecific/${memoid}`, config)
    .then((response) => response.data)
    .catch((error) => console.log(error));

  return await get;
}

export async function getUserMemorizes(userId: string, token: string) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const get = engleshPlusApi
    .get(`/api/memorize/UserMemorizes/${userId}`, config)
    .then((response) => response.data)
    .catch((error) => console.log(error));

  return await get;
}

export async function PutMemorize(userId: string, data: any, token: string) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const put = engleshPlusApi
    .put(`/api/memorize/${userId}`, data, config)
    .then((response) => response.data)
    .catch((error) => console.log(error));

  return await put;
}

export async function PostMemorize(data: any, token: string) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const post = engleshPlusApi
    .post(`/api/memorize`, data, config)
    .then((response) => response.data)
    .catch((error) => console.log(error));

  return await post;
}
