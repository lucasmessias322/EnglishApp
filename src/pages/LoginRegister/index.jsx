import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import * as C from "./style";
import Input from "../../components/Input";
import { useNavigate, useParams } from "react-router-dom";
import { postLogin, postRegister } from "../../services/Api";
import { toast, ToastContainer } from "react-toastify";

export default function LoginRegister() {
  const params = useParams();
  const [login, setLogin] = useState(params.login === "false" ? false : true);

  console.log(login);

  return (
    <C.Container>
      <ToastContainer />
      <C.FormContainer>
        <C.LoginOrRegister>
          <C.LorRItem
            style={{ backgroundColor: login ? "#D50059" : "transparent" }}
            onClick={() => setLogin(true)}
          >
            Login
          </C.LorRItem>
          <C.LorRItem
            style={{ backgroundColor: login ? "transparent" : "#D50059" }}
            onClick={() => setLogin(false)}
          >
            Register
          </C.LorRItem>
        </C.LoginOrRegister>
        <img draggable={false} src="/assets/Group 35.png" alt="header" />
        {login ? <LoginComponent /> : <RegisterComponent />}
      </C.FormContainer>
    </C.Container>
  );
}

function LoginComponent() {
  const [values, setValues] = useState({ email: "", password: "" });
  const { token, setToken, setCurrentUserData } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e) {
    setLoading(true);
    e.preventDefault();

    postLogin(values)
      .then((response) => {
        setToken(response.data.token);
        setCurrentUserData(response.data.currentUser);
        console.log(response);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });

    if (token) {
      setToken(token);
      return navigate("/");
    }
    setValues({ email: "", password: "" });
  }

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form onSubmit={onSubmit}>
      <Input
        Email
        text="email"
        placeholder="Seu Email"
        required
        name="email"
        onChange={(e) => setValues({ ...values, email: e.target.value })}
        value={values.email}
      />
      <Input
        Password
        text="password"
        placeholder="Senha"
        name="password"
        onChange={(e) => setValues({ ...values, password: e.target.value })}
        value={values.password}
        required
      />
      <C.ButtonSubmit>{loading ? "Carregando..." : "Acessar"}</C.ButtonSubmit>
    </form>
  );
}

function RegisterComponent() {
  const navigate = useNavigate();
  const { token, setToken, setCurrentUserData } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  async function onSubmit(e) {
    setLoading(true);
    e.preventDefault();

    postRegister(values)
      .then((response) => {
        setToken(response.data.token);
        setCurrentUserData(response.data.currentUser);
        console.log(response);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast("Erro ao se registrar: " + error);
        console.log(error);
      });

    if (token) {
      setToken(token);
      return navigate("/");
    }
    setValues({
      name: "",
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
    });
  }

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form onSubmit={onSubmit}>
      <Input
        User
        text="text"
        placeholder="Seu nome"
        onChange={(e) => setValues({ ...values, name: e.target.value })}
        value={values.name}
        required
      />
      <Input
        User
        text="text"
        placeholder="Nome de Usuario"
        onChange={(e) => setValues({ ...values, username: e.target.value })}
        value={values.username}
        required
      />
      <Input
        Email
        text="email"
        placeholder="Seu Email"
        onChange={(e) => setValues({ ...values, email: e.target.value })}
        value={values.email}
        required
      />
      <Input
        Password
        text="text"
        placeholder="Senha"
        onChange={(e) => setValues({ ...values, password: e.target.value })}
        value={values.password}
        required
      />
      <Input
        Password
        text="password"
        placeholder="Digite a Senha novamente"
        onChange={(e) =>
          setValues({ ...values, confirmpassword: e.target.value })
        }
        value={values.confirmpassword}
        required
      />
      <C.ButtonSubmit>
        {loading ? "Carregando..." : "Registrar-me"}
      </C.ButtonSubmit>
    </form>
  );
}
