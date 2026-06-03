import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import {
  FaArrowRight,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaShieldAlt,
  FaUser,
} from "react-icons/fa";
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
        <BrandHeader>
          <Link to="/">
            EnglishPlus <b>+</b>
          </Link>
          <span>Leitura, vocabulario e revisao no mesmo lugar.</span>
        </BrandHeader>

        <AuthCard>
          <ModeSwitch>
            <ModeLink to="/account/login" $active={loginPage}>
              Login
            </ModeLink>
            <ModeLink to="/account/register" $active={!loginPage}>
              Registro
            </ModeLink>
          </ModeSwitch>

          <CardTitle>
            <IconBadge>
              <FaShieldAlt />
            </IconBadge>
            <div>
              <span>{loginPage ? "Bem-vindo de volta" : "Comece agora"}</span>
              <h1>{loginPage ? "Entre na sua conta" : "Crie sua conta"}</h1>
            </div>
          </CardTitle>

          <p>
            {loginPage
              ? "Acesse seu dashboard, textos e decks salvos."
              : "Salve palavras, acompanhe leituras e revise pelo celular."}
          </p>

          <GoogleArea>
            <GoogleLoginButton />
          </GoogleArea>

          <Divider>
            <span>ou continue com email</span>
          </Divider>

          {loginPage ? <Login /> : <Register />}

          <FooterSwitch>
            {loginPage ? "Ainda nao tem conta?" : "Ja possui uma conta?"}
            <Link to={loginPage ? "/account/register" : "/account/login"}>
              {loginPage ? "Criar conta" : "Fazer login"}
            </Link>
          </FooterSwitch>
        </AuthCard>
      </Content>
    </Container>
  );
}

function Login() {
  const [values, setValues] = useState<FormValues>({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { token, setToken, setuserId } = useContext(AuthContext);

  async function onSubmit(e: React.FormEvent) {
    setLoading(true);
    e.preventDefault();

    postLogin(values)
      .then((response: any) => {
        setToken(response.data.token);
        setuserId(response.data.userId);
        setLoading(false);
        toast.success("Autenticacao realizada com sucesso.");
      })
      .catch((error: unknown) => {
        setLoading(false);
        console.log(error);
        toast.error("Erro ao autenticar usuario.");
      });
  }

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  return (
    <Form onSubmit={onSubmit}>
      <InputGroupComponent
        type="email"
        icon={<FaEnvelope />}
        label="Email"
        placeholder="seu@email.com"
        name="email"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValues({ ...values, email: e.target.value })
        }
        value={values.email}
      />
      <InputGroupComponent
        type="password"
        icon={<FaLock />}
        label="Senha"
        placeholder="Sua senha"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValues({ ...values, password: e.target.value })
        }
        value={values.password}
      />
      <SubmitButton type="submit" disabled={loading}>
        {loading ? "Carregando..." : "Acessar"}
        {!loading && <FaArrowRight />}
      </SubmitButton>
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

  async function onSubmit(e: React.FormEvent) {
    setLoading(true);
    e.preventDefault();

    postRegister(values)
      .then((response: any) => {
        setToken(response.data.token);
        setuserId(response.data.userId);
        setLoading(false);
        toast.success("Registro realizado com sucesso.");
      })
      .catch((error: any) => {
        setLoading(false);
        toast.error("Erro ao se registrar: " + error.response.data.msg);
        console.log(error.response.status);
      });
  }

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  return (
    <Form onSubmit={onSubmit}>
      <InputGroupComponent
        type="text"
        icon={<FaUser />}
        label="Nome"
        placeholder="Seu nome"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValues({ ...values, name: e.target.value })
        }
        value={values.name}
      />
      <InputGroupComponent
        type="email"
        icon={<FaEnvelope />}
        label="Email"
        placeholder="seu@email.com"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValues({ ...values, email: e.target.value })
        }
        value={values.email}
      />
      <InputGroupComponent
        type="password"
        icon={<FaLock />}
        label="Senha"
        placeholder="Crie uma senha"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValues({ ...values, password: e.target.value })
        }
        value={values.password}
      />
      <InputGroupComponent
        type="password"
        icon={<FaLock />}
        label="Confirmar senha"
        placeholder="Repita sua senha"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValues({ ...values, confirmpassword: e.target.value })
        }
        value={values.confirmpassword}
      />
      <SubmitButton type="submit" disabled={loading}>
        {loading ? "Carregando..." : "Registrar-se"}
        {!loading && <FaArrowRight />}
      </SubmitButton>
    </Form>
  );
}

function InputGroupComponent({ icon, label, type, ...rest }: any) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <InputGroup>
      <label>{label}</label>
      <div className="field">
        <div className="iconContainer">{icon}</div>
        <input
          required
          type={type === "password" && showPassword ? "text" : type}
          {...rest}
        />
        {type === "password" && (
          <button
            className="Eye"
            type="button"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        )}
      </div>
    </InputGroup>
  );
}

const Container = styled.div`
  overflow-x: hidden;
  position: relative;
  width: 100%;
  min-height: 100vh;
  background:
    linear-gradient(180deg, rgba(73, 104, 236, 0.14), transparent 34%),
    #12141d;
`;

const Content = styled.div`
  max-width: 430px;
  min-height: 100vh;
  width: 100%;
  padding: calc(env(safe-area-inset-top) + 24px) 14px 28px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin: 0 auto;
`;

const BrandHeader = styled.header`
  display: grid;
  gap: 8px;
  padding: 4px 2px 0;

  a {
    width: fit-content;
    color: #f5f7ff;
    font-size: 1.4rem;
    font-weight: 800;
    letter-spacing: 0;
  }

  b {
    color: #29aa8b;
  }

  span {
    max-width: 320px;
    color: #99a4c8;
    font-size: 0.88rem;
    line-height: 1.5;
  }
`;

const AuthCard = styled.section`
  padding: 16px;
  border: 1px solid rgba(76, 85, 125, 0.45);
  border-radius: 28px;
  background:
    linear-gradient(145deg, rgba(41, 170, 139, 0.12), transparent 42%),
    rgba(24, 27, 40, 0.92);
  box-shadow: 0 22px 44px rgba(7, 10, 20, 0.28);

  > p {
    margin-top: 10px;
    color: #a9b4d8;
    font-size: 0.9rem;
    line-height: 1.65;
  }
`;

const ModeSwitch = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 6px;
  padding: 5px;
  border-radius: 18px;
  background: rgba(15, 18, 28, 0.54);
`;

const ModeLink = styled(Link)<{ $active: boolean }>`
  min-height: 42px;
  border-radius: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.$active ? "#07121b" : "#b9c2e4")};
  background: ${(props) =>
    props.$active ? "linear-gradient(135deg, #29aa8b, #8fe5d0)" : "transparent"};
  font-size: 0.9rem;
  font-weight: 800;
`;

const CardTitle = styled.div`
  margin-top: 18px;
  display: grid;
  grid-template-columns: 50px minmax(0, 1fr);
  align-items: center;
  gap: 12px;

  span {
    color: #8fe5d0;
    font-size: 0.72rem;
    font-weight: 800;
    text-transform: uppercase;
  }

  h1 {
    margin-top: 3px;
    color: #f5f7ff;
    font-size: 1.55rem;
    line-height: 1.12;
  }
`;

const IconBadge = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #8fe5d0;
  background: rgba(41, 170, 139, 0.12);

  svg {
    font-size: 1.25rem;
  }
`;

const GoogleArea = styled.div`
  min-height: 44px;
  margin-top: 16px;
  display: flex;
  justify-content: center;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 16px 0 4px;
  color: #8390b7;
  font-size: 0.76rem;
  font-weight: 700;

  &::before,
  &::after {
    content: "";
    height: 1px;
    flex: 1;
    background: rgba(76, 85, 125, 0.42);
  }
`;

const Form = styled.form`
  width: 100%;
  display: grid;
  gap: 12px;
  padding-top: 10px;
`;

const InputGroup = styled.div`
  width: 100%;
  display: grid;
  gap: 7px;

  label {
    color: #d7def9;
    font-size: 0.78rem;
    font-weight: 800;
  }

  .field {
    min-height: 54px;
    border: 1px solid rgba(76, 85, 125, 0.45);
    border-radius: 18px;
    background: rgba(15, 18, 28, 0.5);
    display: grid;
    grid-template-columns: 46px minmax(0, 1fr) auto;
    align-items: center;
    overflow: hidden;
    transition:
      border-color 0.18s ease,
      background-color 0.18s ease;
  }

  .field:focus-within {
    border-color: rgba(143, 229, 208, 0.62);
    background: rgba(24, 27, 40, 0.76);
  }

  div.iconContainer {
    width: 46px;
    height: 54px;
    color: #8fe5d0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  input {
    min-width: 0;
    height: 54px;
    border: none;
    outline: none;
    background: transparent;
    color: #f5f7ff;
    width: 100%;
    padding: 0 10px 0 0;
    font-size: 0.94rem;
  }

  input::placeholder {
    color: #6f7896;
  }

  button.Eye {
    width: 44px;
    height: 54px;
    border: none;
    background: transparent;
    color: #8390b7;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;

const SubmitButton = styled.button`
  min-height: 54px;
  margin-top: 6px;
  border: none;
  border-radius: 18px;
  padding: 0 18px;
  background: linear-gradient(135deg, #29aa8b, #8fe5d0);
  color: #07121b;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 0 16px 30px rgba(41, 170, 139, 0.2);

  &:disabled {
    cursor: wait;
    opacity: 0.78;
  }
`;

const FooterSwitch = styled.div`
  margin-top: 16px;
  padding: 13px 14px;
  border-radius: 18px;
  background: rgba(33, 36, 51, 0.58);
  color: #aeb8d8;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  flex-wrap: wrap;
  font-size: 0.84rem;
  font-weight: 700;

  a {
    color: #8fe5d0;
    font-weight: 900;
  }
`;
