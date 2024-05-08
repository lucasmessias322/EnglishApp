import { ReactNode, createContext, useEffect, useState } from "react";
import { getSingleUser } from "../Apis/englishplusApi";

interface AuthProvidertypes {
  children?: ReactNode;
}

interface initialState {
  token: string;
  userId: string;
  setToken: (token: string) => void;
  setuserId: (userId: string) => void;
  userData: object;
  setUserData?: (userData: object) => void;
  logout: () => void;
}

const initialState: initialState = {
  token: "",
  userId: "",
  setToken: () => {},
  userData: {},
  setUserData: () => {},
  setuserId: () => {},
  logout: () => {},
};

export const AuthContext = createContext(initialState);

function useStorage(
  key: string
): [string | null, (value: string) => void, () => void] {
  const [storedValue, setStoredValue] = useState<string | null>(() => {
    return window.localStorage.getItem(key) || null;
  });

  const setValue = (value: string) => {
    setStoredValue(value);
    window.localStorage.setItem(key, value);
  };

  const clearValue = () => {
    setStoredValue(null);
    window.localStorage.removeItem(key);
  };

  return [storedValue, setValue, clearValue];
}

export default function AuthProvider({ children }: AuthProvidertypes) {
  const [token, setToken, clearToken] = useStorage("token");
  const [userId, setuserId, clearuserId] = useStorage("userid");
  const [userData, setUserData] = useState({ name: "" });

  const contextValue: initialState = {
    token: token || "",
    setToken,
    userData: userData,
    userId: userId || "",
    setuserId,
    logout,
  };

  useEffect(() => {
    if (token && userId) {
      getSingleUser(userId, token)
        .then((res) => {
          setUserData(res);
          // console.log(res);
        })
        .catch((err) => {
          logout();
          console.log("logout");
          
        });
    }
  }, [token]);

  function logout() {
    clearToken();
    clearuserId();
    window.location.reload();
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
