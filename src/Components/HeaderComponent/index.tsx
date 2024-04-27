import styled from "styled-components";

import { ReactNode, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

interface HeaderProps {
  fixed?: boolean;
  textPage?: boolean;
  loginSignin?: boolean;
  children?: ReactNode;
}

export default function HeaderComponent({
  fixed,
  textPage,
  children,
  loginSignin,
}: HeaderProps) {
  const { token } = useContext(AuthContext);

  return (
    <Header fixed={fixed}>
      <Link to="/">
        <h2>EngleshPlus+</h2>
      </Link>

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

      {textPage && <ChildrenContainer>{children}</ChildrenContainer>}
    </Header>
  );
}
const Header = styled.header<HeaderProps>`
  width: 100%;
  padding: 20px 10px;
  position: ${(props) => (props.fixed ? "fixed" : "block")};
  top: 0;
  background-color: #212433;
  h2 {
    font-size: 16px;
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
  a {
    span {
      color: white;
      font-size: 16px;
      padding: 5px 15px;
    }

    span.register {
      border-radius: 20px;
      background-color: #6e86cc;
    }
  }
`;
