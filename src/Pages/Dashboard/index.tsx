import styled from "styled-components";
import { FaRegNewspaper, FaTextHeight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GiBrain } from "react-icons/gi";
import HeaderComponent from "../../Components/HeaderComponent";
import { AuthContext } from "../../Context/AuthContext";
import { useContext, useEffect, useState } from "react";

export default function Dashboard() {
  const { token, userData } = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [isAdmin, setIsAdmin] = useState();

  useEffect(() => {
    if (userData) {
      // Verifica se userData está definido
      const nameWords = userData.name.split(" "); // Divide o nome em palavras
      const firstTwoWords = nameWords.slice(0, 2); // Pega as duas primeiras palavras
      setUserName(firstTwoWords.join(" ")); // Define as duas primeiras palavras como userName

     /// setIsAdmin(userData.role === "admin");
    }
  }, [userData]);

  return (
    <DashboardContainer>
      <HeaderComponent admin={isAdmin} fixed={false} bgcolor="#212433" loginSignin />
      <SectionOne>
        <LogoAndImageLogo>
          <img src="/logo3.png" alt="" />{" "}
          <h1>
            English Plus<b>+</b>
            
          </h1>
          {/* {userName ? (
            <p>Bem vindo(a) de volta {userName}!</p>
          ) : (
            <p>Bem vindo(a), oque você quer fazer?</p>
          )} */}
          <span>Vamos Começar sua Jornada no Ingles!</span>
          {/* <p>Como voce quer aprender Hoje?</p> */}
        </LogoAndImageLogo>
      </SectionOne>
      <SectionTwo>
        <h2>Você pode aprender com:</h2>
        <div className="CardsContain">
          <Card
            to="/textslist"
            bgColor="#4968EC"
            bgColor2="#6EB1F7"
            btnColor="#698EF9"
            btnColor2="#4968EC"
          >
            <img src="/book.png" alt="Textos" />
            {/* //<FaTextHeight size={70} /> */}

            <h2>Com Textos</h2>
            <p>Leia Textos e Marque as palavras para revisar</p>
            <button>Começar</button>
          </Card>
          {/* <Card>
            <Link to="/news">
              <FaRegNewspaper size={70} />
              <p>Com Noticias...</p>
            </Link>
          </Card> */}
          <Card
            disabled={!userName}
            to={userName ? "/memorizelists" : ""}
            title={
              !userName &&
              "Voce prescisa fazer login para acessar esse recurso!"
            }
            bgColor="#29AA8B"
            bgColor2="#6ECCBA"
            btnColor="#60CA83"
            btnColor2="#29AA8B"
          >
            <img src="/flashcards.png" alt="" />
            <h2>Memorize Palavras</h2>
            <p>Revisar Palavras com Flash cards interativos</p>

            <button>Começar</button>
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
  background-image: linear-gradient(to bottom, #212433, #12141d);
`;

const SectionOne = styled.section`
  width: 100%;
  //height: 300px;
  padding: 50px 0px;
 

  display: flex;

  align-items: center;

  flex-direction: column;
  background-color: #212433;
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
  padding: 0px 15px;
  text-align: center;

  img {
    width: 100%;
    height: 150px;
    object-fit: contain;
    margin: auto;
    //padding: 20px;
  }
  h1 {
    color: white;
    font-size: 35px;

    b {
      color: #29aa8b;
    }
  }
  span {
    font-weight: medium;
    padding: 0px 0px;
    font-size: 18px;
  }
  p {
    padding-top: 0px;
    color: #7089bd;
  }

  @media (max-width: 500px) {
    img {
   
    }
    p {
      font-size: 14px;
    }
  }
`;
const SectionTwo = styled.section`
  width: 100%;
  padding: 10px 0px;
  h2 {
    width: 100%;
    padding: 25px 10px;
    font-size: 25px;
    color: #6e88cc;
    text-align: center;
  }

  .CardsContain {
    display: flex;
    justify-content: center;

    gap: 5px;
  }
`;

const Card = styled(Link)<{
  disabled?: boolean;
  bgColor?: string;
  bgColor2?: string;
  btnColor?: string;
  btnColor2?: string;
}>`
  width: 250px;
  height: 270px;
  border-radius: 20px;
  margin: 5px;
  display: flex;
  align-items: center;
  text-align: center;
  flex-direction: column;
  gap: 10px;

  img {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    width: 100%;
    height: 100px;
    object-fit: contain;
    margin-bottom: 10px;
  }

  button {
    background-image: linear-gradient(
      ${(props) => props.btnColor || "#212433"},
      ${(props) => props.btnColor2 || "#212433"}
    );
    border: none;

    border-top: 0px solid #525a81;
    border-bottom: 1px solid #525a81;
    border-left: 0.5px solid #525a81;
    border-right: 0.5px solid #444a6b;
    color: white;
    font-weight: bold;
    font-size: 14px;
    border-radius: 20px;
    padding: 10px;

    width: 90%;

    &:hover {
      transform: scale(1.05);
    }
  }

  padding: 2px;

  h2 {
    font-size: 20px;
    font-weight: bold;
    color: white;
    text-shadow: -2px 2px 4px #212433;
    padding: 0px;
    margin: 0px;
    width: 100%;
  }

  p {
    font-size: 14px;
  }

  background-image: linear-gradient(
    to bottom,
    ${(props) => props.bgColor || "#212433"},
    ${(props) => props.bgColor2 || "#212433"}
  );

  color: #272e3a;
  font-size: 14px;
  cursor: pointer;
  // box-shadow: 0px 0px 10px 1px ${(props) => props.btnColor || "#212433"};
  opacity: ${(props) => (props.disabled ? ".2" : "1")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
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
  //background-color: #212433;
  padding: 20px;
  position: relative;
  bottom: 0;
  font-size: 14px;
`;
