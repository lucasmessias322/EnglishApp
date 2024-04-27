import styled from "styled-components";
import { FaRegNewspaper, FaTextHeight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GiBrain } from "react-icons/gi";
import HeaderComponent from "../../Components/HeaderComponent";
import { AuthContext } from "../../Context/AuthContext";
import { useContext } from "react";

export default function Dashboard() {
  const { token, userData } = useContext(AuthContext);
  
  return (
    <DashboardContainer>
      <HeaderComponent fixed={false} loginSignin />
      <SectionOne>
        <LogoAndImageLogo>
          <img src="/logo.png" alt="" /> <h2>English Plus+</h2>
          <p>Bem vindo(a) , oque você quer fazer?</p>
        </LogoAndImageLogo>
      </SectionOne>
      <SectionTwo>
        <h2>Você pode aprender com:</h2>
        <div className="CardsContain">
          <Card>
            <Link to="/textslist">
              <FaTextHeight size={70} />
              <p>Com Textos...</p>
            </Link>
          </Card>
          {/* <Card>
            <Link to="/newspage">
              <FaRegNewspaper size={70} />
              <p>Com Noticias...</p>
            </Link>
          </Card> */}
          <Card>
            <Link to="/memorizelists">
              <GiBrain size={70} />

              <p>Memorize Palavras</p>
            </Link>
          </Card>
        </div>
      </SectionTwo>
      <WhyLearning>
        <h3>Porque aprender ingles é importante?</h3>
        <p>
          Aprendendo o idioma, é possível obter diferencial no mercado, ter mais
          acesso à informação e, ainda, contar com a possibilidade de realizar
          intercâmbios e trocas culturais riquíssimas. Isso ocorre porque o
          inglês é a língua mais utilizada no mundo.
        </p>
      </WhyLearning>
      <Footer>
        <span>Todos os direitos reservados a English Plus+</span>
      </Footer>
    </DashboardContainer>
  );
}

const DashboardContainer = styled.div`
  min-height: 100vh;
  width: 100%;
`;

const Header = styled.header`
  padding: 20px;

  h2 {
    font-size: 16px;
  }

  background-color: #212433;
`;

const SectionOne = styled.section`
  padding-bottom: 50px;
  width: 100%;
  height: 250px;
  background-color: #212433;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  p {
    padding: 10px;
    font-size: 16px;
  }
`;
const LogoAndImageLogo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center flex-end;
  width: 100%;
  padding: 10px 15px;
  text-align: center;

  img {
    width: 110px;
    object-fit: contain;
    margin: auto;
    padding: 20px;
  }
  h1 {
    color: white;
    font-size: 35px;
  }
  span {
  }
  p {
    padding-top: 10px;
    color: white;
  }

  @media (max-width: 500px) {
    img {
      width: 24vw;
      object-fit: contain;
      margin: auto;
    }
    p {
      font-size: 14px;
    }
  }
`;
const SectionTwo = styled.section`
  width: 100%;

  h2 {
    width: 100%;
    padding: 30px 10px;
    font-size: 18px;
    color: #6e88cc;
    text-align: center;
  }

  .CardsContain {
    display: flex;
    justify-content: center;
    padding-top: 20px;
  }
`;

const Card = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 10px;
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;

  &:hover {
    transform: scale(1.1);
  }

  padding: 10px;
  background-color: #212433;
  cursor: pointer;
`;

const WhyLearning = styled.div`
  padding: 50px 10px;
  margin-top: 90px;

  h3 {
    font-size: 18px;
    color: #6e88cc;
  }

  p {
    padding-top: 10px;
    font-size: 14px;
  }

  @media (min-width: 500px) {
    padding: 60px 30px;

    h3 {
      font-size: 25px;
    }

    p {
      padding-top: 10px;
      font-size: 16px;
      max-width: 600px;
    }
  }
`;

const Footer = styled.footer`
  width: 100%;
  background-color: #212433;
  padding: 20px;
  position: relative;
  bottom: 0;
  font-size: 14px;
`;
