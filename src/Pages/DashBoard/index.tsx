import React, { useContext, useState} from 'react'
import { AppContext } from '../../Context/Store'
import { FaBrain, FaTextHeight, FaAngleRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import * as C from './style'
import Header from '../../components/Header';

function DashBoard() {
  const {currentUserData ,thema} = useContext(AppContext)
  
  return (
    <C.DashboardContainer thema={thema}>
      <Header />
      <br />
      <br />
      <C.SectionOne thema={thema}>
        <C.LogoAndImageLogo thema={thema}>
          <img src="/assets/logo.png" alt="" />
          <h1>Inglish Plus<span>+</span></h1>
          <p>Bem vindo de volta {currentUserData.name}, oque vocé quer fazer?</p>
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
                <FaTextHeight size={70} color="white" />
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
  )
}

export default DashBoard
