import React, { useContext } from "react";
import { AppContext } from "../../data/Store";
import { AuthContext } from "../../data/auth";
import { FaBrain, FaTextHeight, FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import CardResponse from "../../components/CardResponse";
import * as C from "./style";

function Dashboard() {
  const { thema, setThema } = useContext(AppContext);
  const { user } = useContext(AuthContext);

  console.log(user.nome);

  return (
    <C.DashboardContainer thema={thema}>
      <Header switchButtom={false} MenuBars={false}></Header>
      <C.ContainLogoOrUserImage>
        <div className="logo">
          <img src="/assets/logo.png" alt="logo" draggable={false} />
        </div>
        <p>Bem vindo(a) {user.nome}, oque você quer fazer?</p>
      </C.ContainLogoOrUserImage>

      <div className="whatYouWantToDo">
        <p>
          Que tal aprender ingles de uma forma divertida, e completamente
          gratuita?.
        </p>

        <div className="Do-contain">
          <span>Você pode aprende com: </span>

          <C.CardasContain>
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
          </C.CardasContain>

        </div>
      </div>

      <C.whyInglesIsImportant>
        <h2>Porque aprender ingles é importante?</h2>
        <p>
          Aprendendo o idioma, é possível obter diferencial no mercado, ter mais
          acesso à informação e, ainda, contar com a possibilidade de realizar
          intercâmbios e trocas culturais riquíssimas. Isso ocorre porque o
          inglês é a língua mais utilizada no mundo.
        </p>
      </C.whyInglesIsImportant>
      <br /><br />

      <CardResponse Pergunta="Porque aprender ingles com textos?">
        <p>
          Além de ajudar muito na compreensão oral, estudar usando um texto com
          áudio em inglês também traz outras três vantagens:
        </p>
        <br />
        <li>
          <b>Ajuda a ampliar seu vocabulário;</b>
        </li>
        <li>
          <b>Ajuda na compreensão escrita (entender o que você lê);</b>
        </li>
        <li>
          <b>Ajuda a melhorar sua pronúncia*;</b>
        </li>
        <li>
          <b>Ajuda a reduzir o sotaque e falar mais como um nativo.</b>
        </li>
      </CardResponse>

      <CardResponse Pergunta="Porque aprender ingles Memorizando palavras?">
        <p>
          Memorizar palavras em ingles nos ajuda a Enriquecer nosso vocabulario,
          Permitindo que possamos formular frases..
        </p>
      </CardResponse>

      <C.Footer>
        <div className="footer-informations"></div>
        <div className="footer-copyright">
          <span>Todos os direitos reservados a English Plus+</span>
        </div>
      </C.Footer>
    </C.DashboardContainer>
  );
}

export default Dashboard;
