import React, { SyntheticEvent, useContext, useEffect, useState } from "react";
import * as C from "../../styles/style";
import Input from "../../components/Input";
import { postLogin } from "../../services/authenticationApi";
import { AppContext } from "../../Context/Store";
import { useHistory, Link } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";

function Login() {
  const [values, setValues] = useState({ email: "", password: "" });
  const { token, setToken, setCurrentUserData } = useContext(AppContext);
  const history = useHistory();

  const [loading, setLoading] = useState(false)

  async function onSubmit(event:SyntheticEvent) {
    event.preventDefault();

    postLogin(values).then((response) => {
      setToken(response.data.token);
      setCurrentUserData(response.data.currentUser);
    }).catch(error => {
      setLoading(false)
    })

    if (token) {
      setToken(token);
      return history.push("/#/dashboard");
    }
    setValues({ email: "", password: "" });
  }

  useEffect(() => {
    if (token) {
      history.push("/#/dashboard");
    }
  }, [token]);

  return (
    <C.Container>
      <C.FormContainer>
        <img src="/assets/Group 35.png" alt="header" />
        <form onSubmit={(e: SyntheticEvent) => {onSubmit(e)}}>
          <Input User={false} Email={true} Password={false}>
            <input
              type="email"
              placeholder="Seu email"
              name="email"
              onChange={e => setValues({...values, email: e.target.value})}
              value={values.email}
              required
            />
          </Input>
          <Input User={false} Email={false} Password={true}>
            <input
              type="password"
              name="password"
              placeholder="Sua senha"
              onChange={e => setValues({...values, password: e.target.value})}
              value={values.password}
              required
            />
          </Input>
          <C.ButtonSubmit>{loading ? "Carregando...":"Acessar"}</C.ButtonSubmit>
        </form>
      </C.FormContainer>
      <C.H4>
        Não possui uma conta?{" "}
        <span>
          <Link to="/#/register">REGISTRE-SE</Link>
        </span>
      </C.H4>
    </C.Container>
  );
}

export default Login;
