import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  clearEnglishPlusApiCache,
  getSingleUser,
} from "../Apis/englishplusApi";

interface AuthProvidertypes {
  children?: ReactNode;
}

export interface UserData {
  _id?: string;
  role?: string[];
  name?: string;
  username?: string;
  email?: string;
}

interface initialState {
  token: string;
  userId: string;
  setToken: (token: string) => void;
  setuserId: (userId: string) => void;
  userData: UserData;
  setUserData?: (userData: UserData) => void;
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

  const setValue = useCallback((value: string) => {
    setStoredValue(value);
    window.localStorage.setItem(key, value);
  }, [key]);

  const clearValue = useCallback(() => {
    setStoredValue(null);
    window.localStorage.removeItem(key);
  }, [key]);

  return [storedValue, setValue, clearValue];
}

export default function AuthProvider({ children }: AuthProvidertypes) {
  const [token, setToken, clearToken] = useStorage("token");
  const [userId, setuserId, clearuserId] = useStorage("userid");
  const [userData, setUserData] = useState<UserData>({ name: "", role: [] });

  const logout = useCallback(() => {
    clearEnglishPlusApiCache();
    clearToken();
    clearuserId();
    window.location.reload();
  }, [clearToken, clearuserId]);

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
        .catch(() => {
          logout();
          console.log("logout");
        });
    }
  }, [token, userId, logout]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
