import axios from "axios";

export const api = axios.create({
  baseURL: "https://authenticatedapi.herokuapp.com",
  headers: {},
});

export const config = (token: string) => {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};

export function postLogin(data: object) {
  let loginUser = api.post("/auth/login", data);
  return loginUser;
}

export function postRegister(data: object) {
  const registerUser = api.post("/auth/register", data);
  return registerUser;
}

export function getUserdata(userId: string, config: object) {
  let userData = api
    .get(`/user/${userId}`, config)
    .then((response) => response.data)
    .catch((error) => console.log(error));
  return userData;
}

export async function editUserData(id: string, data: any, config: any) {
  const editdata = api.patch(`/auth/edit/${id}`, data, config);

  return editdata;
}

export function editByfecth(id: any, data: any, token: any) {
  const options: any = {
    method: "PATCH",
    url: `https://authenticatedapi.herokuapp.com/auth/edit/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: `{\n	"memorize": ${data}\n}`,
  };

  let Fetch = axios.request(options);

  return Fetch;
}
