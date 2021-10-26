import React, { useContext } from "react";
import { AppContext } from "../../data/Store";
import { FaBrain, FaTextHeight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";

import { DashboardContainer } from "./style";
function Dashboard() {
  const { thema, setThema } = useContext(AppContext);

  return (
    <DashboardContainer thema={thema}>
      <Header switchButtom={false} MenuBars={false}></Header>
      <div className="containLogoOrUserImage">
        <div className="logo">
          <img src="/assets/logo.png" alt="logo" draggable={false} />
        </div>
        <p>Bem vindo(a), oque você quer fazer?</p>
      </div>

      <div className="whatYouWantToDo">
        <p>
          Que tal aprender ingles de uma forma divertida, e completamente
          gratuita?.
        </p>

        <div className="Do-contain">
          <span>Você pode aprende com: </span>

          <div className="cardas-contain">
            <div className="card">
              <Link to="/memorize">
                <div>
                  <FaBrain size={100} color="white" />
                </div>
                <p>Memorizando palavras....</p>
              </Link>
            </div>

            <div className="card">
              <Link to="/textos">
                <div>
                  <FaTextHeight size={100} color="white" />
                </div>
                <p>Com textos em ingles....</p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="whyInglesIsImportant">
        <h2>Porque aprender ingles é importante?</h2>
        <p>
          Aprendendo o idioma, é possível obter diferencial no mercado, ter mais
          acesso à informação e, ainda, contar com a possibilidade de realizar
          intercâmbios e trocas culturais riquíssimas. Isso ocorre porque o
          inglês é a língua mais utilizada no mundo.
        </p>
      </div>

      <footer>
        <span>Todos os direitos reservados a English Plus+</span>
      </footer>
    </DashboardContainer>
  );
}

export default Dashboard;
