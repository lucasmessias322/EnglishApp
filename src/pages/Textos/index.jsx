import React, { useContext, useEffect } from 'react'
import TextoLayout from '../../components/TextoLayout/TextoLayout';
// import { DadosDoTexto, FraseAFraseDoTexto } from './Texto1DataAudio.js';
import { AppContext } from '../../data/Store';

function Textos() {
    const { texto, setTexto } = useContext(AppContext);

    return (
        <TextoLayout texto={texto} />
    )
}

export default Textos
