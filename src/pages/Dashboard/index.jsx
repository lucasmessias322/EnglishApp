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

  
  return (
    <C.DashboardContainer thema={thema}>
      <Header Logo={false} switchButtom={false} MenuBars={false}></Header>
      <br />
      <br />
      <C.SectionOne thema={thema}>
        <C.LogoAndImageLogo thema={thema}>
          <img src="/assets/logo.png" alt="" />
          <h1>
            Inglish Plus<span>+</span>
          </h1>

          <p>Bem vindo de volta {user.nome}, oque vocé quer fazer?</p>
        </C.LogoAndImageLogo>
      </C.SectionOne>

      <C.ThingsToDo thema={thema}>
        <h3>Você pode aprender com:</h3>
        <div className="CardsContain">
          <C.Card thema={thema}>
            <Link to="/memorize">
              <div>
                <FaBrain size={70} color="white" />
              </div>
              <p>Memorizando palavras....</p>
            </Link>
          </C.Card>

          <C.Card thema={thema}>
            <Link to="/textos">
              <div>
                <FaTextHeight thema={thema} size={70} color="white" />
              </div>
              <p>Com textos em ingles....</p>
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
        <span>Todos os direitos reservados a Inglish Plus+</span>
      </footer>
    </C.DashboardContainer>

    // <C.DashboardContainer thema={thema}>
    //   <Header switchButtom={false} MenuBars={false}></Header>
    //   <C.ContainLogoOrUserImage thema={thema}>
    //     <div className="logo">
    //       <img src="/assets/logo.png" alt="logo" draggable={false} />
    //     </div>
    //     <p>Bem vindo(a) {user.nome}, oque você quer fazer?</p>
    //   </C.ContainLogoOrUserImage>

    //   <div className="whatYouWantToDo">
    //     <p>
    //       Que tal aprender ingles de uma forma divertida, e completamente
    //       gratuita?.
    //     </p>

    //     <div className="Do-contain">
    //       <span>Você pode aprende com: </span>

    //       <C.CardasContain thema={thema}>
    //         <div className="card">
    //           <Link to="/memorize">
    //             <div>
    //               <FaBrain size={100} color="white" />
    //             </div>
    //             <p>Memorizando palavras....</p>
    //           </Link>
    //         </div>

    //         <div className="card">
    //           <Link to="/textos">
    //             <div>
    //               <FaTextHeight thema={thema} size={100} color="white" />
    //             </div>
    //             <p>Com textos em ingles....</p>
    //           </Link>
    //         </div>
    //       </C.CardasContain>

    //     </div>
    //   </div>

    //   <C.whyInglesIsImportant thema={thema}>
    //     <h2>Porque aprender ingles é importante?</h2>
    //     <p>
    //       Aprendendo o idioma, é possível obter diferencial no mercado, ter mais
    //       acesso à informação e, ainda, contar com a possibilidade de realizar
    //       intercâmbios e trocas culturais riquíssimas. Isso ocorre porque o
    //       inglês é a língua mais utilizada no mundo.
    //     </p>
    //   </C.whyInglesIsImportant>
    //   <br /><br />

    //   <CardResponse Pergunta="Porque aprender ingles com textos?" thema={thema}>
    //     <p>
    //       Além de ajudar muito na compreensão oral, estudar usando um texto com
    //       áudio em inglês também traz outras três vantagens:
    //     </p>
    //     <br />
    //     <li>
    //       <b>Ajuda a ampliar seu vocabulário;</b>
    //     </li>
    //     <li>
    //       <b>Ajuda na compreensão escrita (entender o que você lê);</b>
    //     </li>
    //     <li>
    //       <b>Ajuda a melhorar sua pronúncia*;</b>
    //     </li>
    //     <li>
    //       <b>Ajuda a reduzir o sotaque e falar mais como um nativo.</b>
    //     </li>
    //   </CardResponse>

    //   <CardResponse Pergunta="Porque aprender ingles Memorizando palavras?" thema={thema}>
    //     <p>
    //       Memorizar palavras em ingles nos ajuda a Enriquecer nosso vocabulario,
    //       Permitindo que possamos formular frases..
    //     </p>
    //   </CardResponse>

    //   <C.Footer thema={thema}>
    //     <div className="footer-informations"></div>
    //     <div className="footer-copyright">
    //       <span>Todos os direitos reservados a English Plus+</span>
    //     </div>
    //   </C.Footer>
    // </C.DashboardContainer>
  );
}

export default Dashboard;
