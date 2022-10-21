import React, { createContext, useEffect, useState } from "react";
import useStorage from "../utils/useStorage";
import { RemoveStorage } from "../utils/storageFunctions";

const initialState = {
  number: 0,
  token: "",
  thema: true,
  texto: 0,
  current: 0,
  currentUserData: Object,
  setCurrent: Function,
  setCurrentUserData: Function,
  setToken: Function,
  logout: Function,
  setThema: Boolean,
  setNumber: Number,
  setTexto: Number,
};

export const AuthContext = createContext(initialState);

export default function AuthProvider(props) {
  const [state, setState] = useState(initialState);
  const [token, setToken] = useStorage("token");
  const [currentUserData, setCurrentUserData] = useStorage("currentUserData");

  function updateState(key, value) {
    setState({
      ...state,
      [key]: value,
    });
  }

  function logout() {
    setToken("");
    setCurrentUserData("");
    RemoveStorage("token");
    RemoveStorage("currentUserData");
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        number: state.number,
        thema: state.thema,
        texto: state.texto,
        current: state.current,
        logout,
        setToken,
        setCurrentUserData,
        currentUserData,
        setThema: (thema) => updateState("thema", thema),
        setNumber: (number) => updateState("number", number),
        setTexto: (texto) => updateState("texto", texto),
        setCurrent: (current) => ("current", current),
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
