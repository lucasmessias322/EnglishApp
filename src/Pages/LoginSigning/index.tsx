import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { FaUser, FaLock, FaEnvelope, FaEyeSlash, FaEye } from "react-icons/fa"; // Importe o ícone FaLock para o campo de senha
import { postLogin, postRegister } from "../../Apis/englishplusApi";
import { AuthContext } from "../../Context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import GoogleLoginButton from "../../Components/GoogleLoginButton/GoogleLoginButton";
interface FormValues {
  name?: string;
  email?: string;
  password?: string;
  confirmpassword?: string;
}

export default function LoginSigning() {
  const { accountType } = useParams();
  const loginPage = accountType === "login";

  return (
    <Container>
      <ToastContainer />
      <Content>
        <h2>
          <Link to="/">EnglishPlus+</Link>
        </h2>
        <p>
          {loginPage
            ? "Faça Login em sua conta."
            : "Crie uma conta para ter acesso a todos os recursos."}
        </p>
        <GoogleLoginButton />
        {loginPage ? <Login /> : <Register />}

        {loginPage ? (
          <span>
            Não possui uma conta?
            <Link to={"/account/register"}>Crie uma conta.</Link>
          </span>
        ) : (
          <span>
            Possui uma Conta?
            <Link to={"/account/login"}>Faça Login.</Link>
          </span>
        )}
      </Content>
    </Container>
  );
}

function Login() {
  const [values, setValues] = useState<FormValues>({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { token, setToken, setuserId } = useContext(AuthContext);

  async function onSubmit(e: any) {
    setLoading(true);
    e.preventDefault();

    postLogin(values)
      .then((response: any) => {
        console.log(response.data);
        setToken(response.data.token);
        setuserId(response.data.userId);
        setLoading(false);
        toast.success("Autenticaçao realizada com sucesso! ;)");
      })
      .catch((error: any) => {
        setLoading(false);
        console.log(error);
        toast.error("Erro ao Autenticar usuario! :( ");
      });
  }

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <Form onSubmit={onSubmit}>
      <InputGroupComponent
        type="text"
        icon={<FaUser />}
        placeholder="Digite seu Email"
        name="email"
        onChange={(e: any) => setValues({ ...values, email: e.target.value })}
        value={values.email}
      />
      <InputGroupComponent
        type="password"
        icon={<FaLock />}
        placeholder="Digite Sua Senha"
        onChange={(e: any) =>
          setValues({ ...values, password: e.target.value })
        }
        value={values.password}
      />
      <button>{loading ? "Carregando..." : "Acessar"}</button>
    </Form>
  );
}

function Register() {
  const navigate = useNavigate();
  const { token, setToken, setuserId } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  async function onSubmit(e: any) {
    setLoading(true);
    e.preventDefault();

    postRegister(values)
      .then((response: any) => {
        console.log(response.data);
        setToken(response.data.token);
        setuserId(response.data.userId);
        setLoading(false);
        toast.success("Registro realizado com sucesso! ;)");
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Erro ao se registrar: " + error.response.data.msg);
        console.log(error.response.status);
      });
  }

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);
  return (
    <Form onSubmit={onSubmit}>
      <InputGroupComponent
        type="text"
        icon={<FaUser />}
        placeholder="Digite seu Nome"
        onChange={(e: any) => setValues({ ...values, name: e.target.value })}
        value={values.name}
      />
      <InputGroupComponent
        type="email"
        icon={<FaEnvelope />}
        placeholder="Digite seu Email"
        onChange={(e: any) => setValues({ ...values, email: e.target.value })}
        value={values.email}
      />
      <InputGroupComponent
        type="password"
        icon={<FaLock />}
        placeholder="Digite Sua Senha"
        onChange={(e: any) =>
          setValues({ ...values, password: e.target.value })
        }
        value={values.password}
      />
      <InputGroupComponent
        type="password"
        icon={<FaLock />}
        placeholder="Confirme sua senha"
        onChange={(e: any) =>
          setValues({ ...values, confirmpassword: e.target.value })
        }
        value={values.confirmpassword}
      />
      <button>{loading ? "Carregando..." : "Registrar-se"}</button>
    </Form>
  );
}

function InputGroupComponent({ icon, type, ...rest }: any) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <InputGroup type={type}>
      <div className="iconContainer">{icon}</div>
      <input
        required
        type={type === "password" && showPassword ? "text" : type}
        {...rest}
      />
      {type === "password" && (
        <span className="Eye" onClick={togglePasswordVisibility}>
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </span>
      )}
    </InputGroup>
  );
}

const Container = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #1c1f2d;
`;

const Content = styled.div`
  max-width: 400px;
  height: 100vh;
  width: 100%;

  padding: 20px;
  z-index: 1;
  background-color: #1c1f2d;
  display: flex;
  flex-direction: column;

  margin: 0 auto;

  h2 {
    text-align: center;
    margin-bottom: 40px;
  }

  p {
    text-align: center;
    font-size: 20px;
    padding: 10px 0px;
  }

  span {
    font-size: 14px;
    font-weight: bold;

    a {
      color: #6e88cc;
      padding: 0px 5px;
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  padding: 20px 0px;

  button {
    width: 200px;
    border: none;
    background-color: #2a2d53;
    color: white;
    padding: 10px;
    border-radius: 5px;
    margin: 10px 0px;
    cursor: pointer;
  }
`;

const InputGroup = styled.div<any>`
  width: 100%;
  display: flex;
  margin: 5px 0px;

  div.iconContainer {
    background-color: #2a2d53;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    padding: 10px 15px;
  }

  input {
    background-color: #1c1f2d;
    color: white;
    width: 100%;
    padding: 5px 10px;

    border: none;
    outline: none;
    font-size: 16px;
    ${(props) =>
      props.type === "password"
        ? `border-bottom: 1px solid #2a2d53;
    border-top: 1px solid #2a2d53;`
        : `border: 1px solid #2a2d53; border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;`}
  }

  span.Eye {
    background-color: #1c1f2d;
    padding: 5px 10px;
    color: #3f4279;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid #2a2d53;
    border-top: 1px solid #2a2d53;
    border-bottom: 1px solid #2a2d53;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`;
