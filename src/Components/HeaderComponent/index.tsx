import styled from "styled-components";
import { ReactNode, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
interface HeaderProps {
  fixed?: boolean;
  textPage?: boolean;
  loginSignin?: boolean;
  children?: ReactNode;
  admin?: boolean;
  bgcolor?: string;
  showlogo?: boolean;
  showBackButton?: string;
  title?: string;
}

export default function HeaderComponent({
  fixed,
  textPage,
  children,
  loginSignin,
  admin,
  bgcolor,
  showlogo,
  showBackButton,
  title,
}: HeaderProps) {
  const { token, logout, userData } = useContext(AuthContext);
  const firstName = userData?.name?.split(" ")[0];
  const navigate = useNavigate();
  return (
    <Header $fixed={fixed} $bgcolor={bgcolor}>
      <HeaderInner>
        {showBackButton && (
          <BackBtn
            type="button"
            className="backbtn"
            onClick={() => navigate(showBackButton)}
            title="Voltar para textos"
          >
            <IoIosArrowBack size={25} />
          </BackBtn>
        )}
        <LeftSide>
          {showlogo && (
            <LogoLink to="/">
              <h2>
                EngleshPlus <b>+</b>{" "}
              </h2>
            </LogoLink>
          )}
          {title && <Title>{title}</Title>}

          {token && firstName && !loginSignin && !showBackButton && (
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
              <Link to="/dashboard">
                <span className="register">Dashboard</span>
              </Link>
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

interface StyledHeaderProps {
  $fixed?: boolean;
  $bgcolor?: string;
}

const Header = styled.header<StyledHeaderProps>`
  width: 100%;
  padding: 14px 16px;
  position: ${(props) => (props.$fixed ? "fixed" : "relative")};
  z-index: ${(props) => (props.$fixed ? "9999" : "20")};
  top: 0;
  border-bottom: 1px solid rgba(var(--primary-strong-rgb), 0.2);
 // background: var(--appbar-bg);
  font-weight: bold;
  text-align: left;
  
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
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid rgba(var(--primary-strong-rgb), 0.28);
  background: var(--control-bg);
  box-shadow: 0 12px 28px rgba(7, 10, 20, 0.28);
  flex-shrink: 0;

  h2 {
    color: var(--text);
    font-size: 20px;
    letter-spacing: 0.02em;
    font-family: "Google Sans", "Poppins", sans-serif;
  }

  b {
    color: var(--accent);
  }
  .brand-logo {
    display: block;
    width: auto;
    height: 42px;
    object-fit: contain;
  }

  @media (max-width: 480px) {
    padding: 8px 10px;
    h2 {
      font-size: 13px;
      white-space: nowrap;
    }
    .brand-logo {
      height: 32px;
    }
  }
`;

const UserPill = styled.span`
  padding: 10px 14px;
  border-radius: 999px;
  border: 1px solid rgba(var(--primary-strong-rgb), 0.26);
  background: var(--control-bg);
  color: var(--text);
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
    border: 1px solid rgba(var(--primary-strong-rgb), 0.26);
    color: var(--text);
    font-size: 15px;
    transition:
      transform 0.2s ease,
      border-color 0.2s ease,
      background-color 0.2s ease;
  }

  a span:hover {
    transform: translateY(-1px);
    border-color: rgba(var(--primary-strong-rgb), 0.75);
  }

  .login {
    background: var(--control-bg);
  }

  .register {
    background: linear-gradient(135deg, var(--primary-strong), var(--primary));
    color: var(--bg);
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
const BackBtn = styled.button`
  width: 44px;
  height: 44px;
  border: 1px solid rgba(var(--primary-strong-rgb), 0.26);
  border-radius: 16px;
  background: var(--glass-bg);
  color: var(--text);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Title = styled.div`
  min-width: 0;

  span {
    display: block;
    color: var(--accent-soft);
    font-size: 0.68rem;
    font-weight: 800;
    text-transform: uppercase;
  }

  strong {
    display: block;
    margin-top: 2px;
    color: var(--text);
    font-size: 0.96rem;
    line-height: 1.15;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
