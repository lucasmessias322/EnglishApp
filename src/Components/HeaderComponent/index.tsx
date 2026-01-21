import styled from "styled-components";

import { ReactNode, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

import { IoIosArrowBack } from "react-icons/io";

interface HeaderProps {
  fixed?: boolean;
  textPage?: boolean;
  loginSignin?: boolean;
  children?: ReactNode;
  admin?: boolean;
  bgcolor?: string;
  backbtn?: string;
}

export default function HeaderComponent({
  fixed,
  textPage,
  children,
  loginSignin,
  admin,
  bgcolor,
  backbtn,
}: HeaderProps) {
  const { token, logout, userData } = useContext(AuthContext);

  return (
    <Header fixed={fixed} bgcolor={bgcolor}>
      {backbtn ? (
        <Link to={backbtn}>
          <GoBackButton title="Voltar">
            <IoIosArrowBack />
          </GoBackButton>
        </Link>
      ) : (
        <Link to="/">
          <h2>
            EngleshPlus<b>+</b>
          </h2>
        </Link>
      )}

      {loginSignin && !token && (
        <ChildrenContainer>
          <LoginSignin>
            <Link to="/account/login">
              <span className="login">Login</span>
            </Link>
            <Link to="/account/register">
              <span className="register">Register</span>
            </Link>
          </LoginSignin>
        </ChildrenContainer>
      )}

      {loginSignin && token && (
        <ChildrenContainer>
          <LoginSignin>
            {admin && (
              <Link to="/admin/AddNewText">
                <span className="register">Admin</span>
              </Link>
            )}
            <Link to="/" onClick={logout}>
              <span className="login">Sair</span>
            </Link>
          </LoginSignin>
        </ChildrenContainer>
      )}

      {textPage && <ChildrenContainer>{children}</ChildrenContainer>}
    </Header>
  );
}
const Header = styled.header<HeaderProps>`
  width: 100%;
  padding: 20px 10px;
  position: ${(props) => (props.fixed ? "fixed" : "block")};
  top: 0;
  background-color: ${(props) =>
    props.bgcolor ? props.bgcolor : "transparent"};
  h2 {
    font-size: 20px;

    font-family: poppins, sans-serif;

    b {
      color: #29aa8b;
    }
  }
  display: flex;
  justify-content: space-between;
`;

const ChildrenContainer = styled.div`
  padding: 0px 10px;
`;

const LoginSignin = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  a {
    span {
      color: white;
      font-size: 16px;
      padding: 5px 15px;
    }
    span.login {
      border-radius: 20px;
      background-color: #292944;
    }
    span.register {
      border-radius: 20px;
      background-color: #4f67ca;
    }
  }
`;

const GoBackButton = styled.a`
  background-color: #6565a1;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #52527f;
  }
`;
