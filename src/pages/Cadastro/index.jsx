import React, { useState, useEffect, useContext } from "react";
import * as C from "./style";
import { AuthContext } from "../../data/auth";
// import { FaUser, FaLock } from "react-icons/fa";

import Input from "../../components/Input";

// import firebase from "../../service/firebaseConnection";

import { Link } from "react-router-dom";

function Cadastro() {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const { signUp, loadingAuth } = useContext(AuthContext);

  async function handleSubmit(event) {
    event.preventDefault();
    if (
      passwordConfirmation === password &&
      name !== "" &&
      email !== "" &&
      password !== ""
    ) {
      signUp(email, password, name)
    }

  }

  return (
    <C.Container>
      <C.FormContainer>
        <img src="/assets/Group 35.png" alt="" />
        <form onSubmit={(event) => handleSubmit(event)}>
          <Input
            Type="text"
            User={true}
            placeholder="Seu Nome aqui..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            Type="text"
            User={true}
            placeholder="Seu email aqui..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            Type="Password"
            User={false}
            placeholder="Sua senha aqui..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            Type="Password"
            User={false}
            placeholder="Digite sua senha Novamente"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <C.ButtonSubmit>{loadingAuth ? 'Carregando...': "Cadastrar"}</C.ButtonSubmit>
        </form>
      </C.FormContainer>

      <C.H4>
        Possui uma Conta?{" "}
        <span>
          <Link to="/">FAZER LOGIN</Link>
        </span>
      </C.H4>
      <C.ButtonNoAcount>Entrar como convidado</C.ButtonNoAcount>
    </C.Container>
  );
}

export default Cadastro;
