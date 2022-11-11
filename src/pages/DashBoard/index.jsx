import React, { useContext } from "react";
import { FaBrain, FaTextHeight } from "react-icons/fa";
import Header from "../../components/Header";
import * as C from "./style";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
export default function DashBoard() {
  const { thema, currentUserData } = useContext(AuthContext);

  return (
    <C.DashboardContainer thema={thema}>
      <Header
        switchButtom={currentUserData && true}
        LoginSigninBtn
        logoutButton={currentUserData && true}
      />
      <br />
      <br />
      <C.SectionOne thema={thema}>
        <C.LogoAndImageLogo>
          <img src="/assets/logo.png" alt="" />
          <h1>English Plus+</h1>
          <p>
            Bem vindo(a) {currentUserData && currentUserData.name}, oque vocé
            quer fazer?
          </p>
        </C.LogoAndImageLogo>
      </C.SectionOne>

      <C.ThingsToDo thema={thema}>
        <h3>Você pode aprender com:</h3>
        <div className="CardsContain">
          <C.Card thema={thema}>
            <Link to="/textos/0">
              <div>
                <FaTextHeight size={70} color="white" />
              </div>
              <p>Com textos em ingles....</p>
            </Link>
          </C.Card>

          <C.Card thema={thema} style={{ opacity: !currentUserData && "0.6" }}>
            <Link to="/listsofwords">
              <div>
                <FaBrain size={70} color="white" />
              </div>
              <p>Com Palavras em ingles....</p>
            </Link>
          </C.Card>
        </div>
      </C.ThingsToDo>
      <C.WhyLearning thema={thema}>
        <h3>Porque aprender ingles é importante?</h3>
        <p>
          Aprendendo o idioma, é possível obter diferencial no mercado, ter mais
          acesso à informação e, ainda, contar com a possibilidade de realizar
          intercâmbios e trocas culturais riquíssimas. Isso ocorre porque o
          inglês é a língua mais utilizada no mundo.
        </p>
      </C.WhyLearning>
      <footer>
        <span>Todos os direitos reservados a English Plus+</span>
      </footer>
    </C.DashboardContainer>
  );
}
