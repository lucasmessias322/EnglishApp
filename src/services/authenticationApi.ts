import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8081"
})

export const config = (token: string) => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

export function postLogin(data: object) {
  let loginUser = api.post("/auth/login", data);
  return loginUser;
}

export function postRegister(data: object) {
  const registerUser = api.post("/auth/register", data)
  return registerUser
}

export function getUserdata(userId:string, config:object) {
  let userData = api
    .get(`/user/${userId}`, config)
    .then((response) => response.data)
    .catch((error) => console.log(error));
     return userData;
}
