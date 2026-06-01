import styled from "styled-components";
import { ReactNode, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

interface HeaderProps {
  fixed?: boolean;
  textPage?: boolean;
  loginSignin?: boolean;
  children?: ReactNode;
  admin?: boolean;
  bgcolor?: string;
  showlogo?: boolean;
}

export default function HeaderComponent({
  fixed,
  textPage,
  children,
  loginSignin,
  admin,
  bgcolor,
  showlogo,
}: HeaderProps) {
  const { token, logout, userData } = useContext(AuthContext);
  const firstName = userData?.name?.split(" ")[0];

  return (
    <Header fixed={fixed} bgcolor={bgcolor}>
      <HeaderInner>
        <LeftSide>
          {showlogo && (
            <LogoLink to="/">
              <span className="orb" />
              <h2>
                EngleshPlus<b>+</b>
              </h2>
            </LogoLink>
          )}

          {token && firstName && !loginSignin && (
            <UserPill>Ola, {firstName}</UserPill>
          )}
        </LeftSide>

        <RightSide>
          {loginSignin && !token && (
            <LoginSignin>
              <Link to="/account/login">
                <span className="login">Login</span>
              </Link>
              <Link to="/account/register">
                <span className="register">Register</span>
              </Link>
            </LoginSignin>
          )}

          {loginSignin && token && (
            <LoginSignin>
              {admin && (
                <Link to="/admin">
                  <span className="register">Admin</span>
                </Link>
              )}
              <Link to="/" onClick={logout}>
                <span className="login">Sair</span>
              </Link>
            </LoginSignin>
          )}

          {textPage && <ChildrenContainer>{children}</ChildrenContainer>}
        </RightSide>
      </HeaderInner>
    </Header>
  );
}

const Header = styled.header<HeaderProps>`
  width: 100%;
  padding: 14px 16px;
  position: ${(props) => (props.fixed ? "fixed" : "relative")};
  z-index: ${(props) => (props.fixed ? "9999" : "20")};
  top: 0;
  border-bottom: 1px solid rgba(76, 85, 125, 0.35);
 // background: ${(props) => props.bgcolor || "rgba(18, 20, 30, 0.78)"};
  backdrop-filter: blur(16px);

  @media (max-width: 480px) {
    padding: 10px 8px;
  }
`;

const HeaderInner = styled.div`
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  @media (max-width: 640px) {
    gap: 8px;
  }
`;

const LeftSide = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 48px;
  min-width: 0;

  @media (max-width: 480px) {
    gap: 8px;
    min-height: 40px;
  }
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  flex-wrap: wrap;
  min-width: 0;

  @media (max-width: 480px) {
    gap: 6px;
    flex: 1 1 auto;
  }
`;

const LogoLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  border-radius: 999px;
  border: 1px solid rgba(76, 85, 125, 0.55);
  background: rgba(33, 36, 51, 0.76);
  box-shadow: 0 12px 28px rgba(7, 10, 20, 0.28);
  flex-shrink: 0;

  .orb {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6e88cc, #29aa8b);
    box-shadow: 0 0 0 6px rgba(41, 170, 139, 0.12);
  }

  h2 {
    font-size: 20px;
    letter-spacing: 0.02em;
    font-family: "Google Sans", "Poppins", sans-serif;
  }

  b {
    color: #29aa8b;
  }

  @media (max-width: 480px) {
    gap: 6px;
    padding: 8px 10px;

    .orb {
      width: 9px;
      height: 9px;
      box-shadow: 0 0 0 4px rgba(41, 170, 139, 0.12);
    }

    h2 {
      font-size: 13px;
      white-space: nowrap;
    }
  }
`;

const UserPill = styled.span`
  padding: 10px 14px;
  border-radius: 999px;
  border: 1px solid rgba(76, 85, 125, 0.45);
  background: rgba(27, 31, 45, 0.72);
  color: #cfd7f6;
  font-size: 14px;
`;

const ChildrenContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LoginSignin = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;

  a span {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 92px;
    padding: 10px 16px;
    border-radius: 999px;
    border: 1px solid rgba(76, 85, 125, 0.45);
    color: white;
    font-size: 15px;
    transition:
      transform 0.2s ease,
      border-color 0.2s ease,
      background-color 0.2s ease;
  }

  a span:hover {
    transform: translateY(-1px);
    border-color: rgba(110, 136, 204, 0.75);
  }

  .login {
    background: rgba(41, 41, 68, 0.82);
  }

  .register {
    background: linear-gradient(135deg, #4968ec, #6e88cc);
  }

  @media (max-width: 480px) {
    gap: 6px;
    flex-wrap: nowrap;
    width: 100%;

    a {
      flex: 1 1 0;
      min-width: 0;
    }

    a span {
      width: 100%;
      min-width: 0;
      padding: 9px 8px;
      font-size: 12px;
    }
  }
`;
