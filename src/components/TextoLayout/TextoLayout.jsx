import React, { useContext, useEffect, useState } from 'react'
import Texto from '../../components/Texto/Texto.jsx';
import Header from '../../components/Header/Header.jsx';
import Player from '../../components/Player';
import FraseAFrase from '../../components/FraseAFrase';
import DadosDoTexto from '../../Api/Textos'
import { TextoLayoutContainer } from './style.js'
import { AppContext } from '../../data/Store';

import { getTextos } from '../../service/Api';
import HeaderLinkMenu from '../HeaderLinkMenu';


function TextoLayout({ texto }) {
    const { thema } = useContext(AppContext);
    const [DataTexto, setDataTexto] = useState(DadosDoTexto)

    useEffect(() => {
        getTextos().then(response => setDataTexto(response))
    }, [])

    console.log(DataTexto);

    return (
        <TextoLayoutContainer thema={thema}>
            <meta name="theme-color" content={thema ? "#FF006B" : "#0053B6"} />
            <Header  DadosDoTexto={DataTexto} TitleOfText={DataTexto[texto].titulo} >
                {DataTexto.map((elem, i) =>
                    <HeaderLinkMenu key={i} texto={i} TitleMenu={DataTexto[i].titulo} />
                )}
            </Header>
            <Texto DataTextoAudio={DataTexto[texto].textos} />
            <FraseAFrase DataFraseAFrase={DataTexto[texto].fraseAFraseDoTexto} />

            <br /><br /><br /><br /><br />
            <Player DataTextoAudio={DataTexto[texto].textos} />
        </TextoLayoutContainer>
    )
}

export default TextoLayout
