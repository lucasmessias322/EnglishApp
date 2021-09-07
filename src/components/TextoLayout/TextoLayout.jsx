import React, { useContext } from 'react'
import Texto from '../../components/Texto/Texto.jsx';
import Header from '../../components/Header/Header.jsx';
import Player from '../../components/Player';
import FraseAFrase from '../../components/FraseAFrase';
import DadosDoTexto from '../../Api/Textos'
import { TextoLayoutContainer } from './style.js'
import { AppContext } from '../../data/Store';

function TextoLayout({ texto }) {
    const { thema } = useContext(AppContext);

    return (
        <TextoLayoutContainer thema={thema}>
            <meta name="theme-color" content={thema ? "#FF006B" : "#0053B6"} />
            <Header TitleOfText={DadosDoTexto[texto].title} />
            <Texto DataTextoAudio={DadosDoTexto[texto].texto} />
            <FraseAFrase DataFraseAFrase={DadosDoTexto[texto].fraseAFraseDoTexto} />

            <br /><br /><br /><br /><br />
            <Player DataTextoAudio={DadosDoTexto[texto].texto} />
        </TextoLayoutContainer>
    )
}

export default TextoLayout
