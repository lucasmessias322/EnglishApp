import React, { SyntheticEvent, useEffect, useState } from "react";
import * as C from "../../styles/style";
import Input from "../../components/Input";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { postRegister } from "../../services/authenticationApi";

function Register() {
  const history = useHistory();
  const [response, setResponse] = useState({ msg: "", userCriado: false });
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  function onSubmit(event: SyntheticEvent) {
    event.preventDefault();

    postRegister(values)
      .then((response) => {
        setResponse(response.data);
      })
      .catch((error) => toast("Erro ao se registrar: " + error));
  }

  useEffect(() => {
    if (response.userCriado) {
      return history.push("/");
    } else {
      if (response.msg !== "") {
        toast(response.msg);
      }
    }
  }, [response]);

  return (
    <C.Container>
      <C.FormContainer>
        <img src="/assets/Group 35.png" alt="header" />
        <form
          onSubmit={(e: SyntheticEvent) => {
            onSubmit(e);
          }}
        >
          <Input User={true}>
            <input 
              type="text" 
              placeholder="Seu nome"
              onChange={e => setValues({...values, name: e.target.value})}
              value={values.name}
              required/> 
          </Input>

          <Input Email={true}>
            <input type="email" placeholder="Seu email"  
              onChange={e => setValues({...values, email: e.target.value})}
              value={values.email}
              required/>
          </Input>

          <Input Password={true}>
            <input 
              type="text" 
              placeholder="Sua senha"  
              onChange={(e) => setValues({ ...values, password: e.target.value })}
              value={values.password}
              required/>
          </Input>

          <Input Password={true}>
            <input
              type="password"
              placeholder="confirme sua senha"
              onChange={(e) => setValues({ ...values, confirmpassword: e.target.value })}
              value={values.confirmpassword}
              required
            />
          </Input>

          <C.ButtonSubmit>Acessar</C.ButtonSubmit>
        </form>
      </C.FormContainer>
      <C.H4>
        possui uma conta?{" "}
        <span>
          <Link to="/">Faça login</Link>
        </span>
      </C.H4>
    </C.Container>
  );
}

export default Register;
