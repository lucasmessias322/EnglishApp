import React, { useState, useEffect, useContext } from "react";
import * as C from "./style";
import Input from "../../components/Input";
import { Link } from "react-router-dom";

import { AuthContext } from "../../data/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, loadingAuth } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();

    if (email !== "" && password !== "") {
      signIn(email, password);
    }
  }

  return (
    <C.Container>
      <C.FormContainer>
        <img src="/assets/Group 35.png" alt="" />
        <form onSubmit={(e) => handleSubmit(e)}>
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
          <C.ButtonSubmit>
            {loadingAuth ? "Carregando..." : "Acessar"}
          </C.ButtonSubmit>
        </form>
      </C.FormContainer>
      <C.H4>
        Você não possui uma conta?{" "}
        <span>
          <Link to="/cadastro">REGISTRE-SE AQUI</Link>
        </span>
      </C.H4>
      {/* <C.ButtonNoAcount>Entrar como convidado</C.ButtonNoAcount> */}
    </C.Container>
  );
}

export default Login;
