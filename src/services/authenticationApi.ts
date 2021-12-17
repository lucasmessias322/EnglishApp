import axios from "axios";

export const api = axios.create({
  baseURL: "https://authenticatedapi.herokuapp.com",
  headers: {
      
  },
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

export async function editUserData(
  id: string,
  data: any,
  token: any
) {
  const dataCnfigs = {
    headers: {
      
      Authorization: `Bearer ${token}`,
    },
  };
  const editdata = api.patch(`/auth/edit/${id}`, data, dataCnfigs);

  return editdata;
}

// export function editByfecth(data, token){
//   let Fetch = fetch(`https://authenticatedapi.herokuapp.com/auth/edit/${data}`, {
//         mode: 'no-cors',
//         method: "PATCH",
//         headers: {
//           "Access-Control-Allow-Origin": "*",
//           "Content-Type": "application/json",
//           Authorization:`Bearer ${token}`,

//         },
//         body: `{\n\t"memorize": ${data}`,
//       })

//       return Fetch
// }
