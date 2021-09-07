import React, { useContext } from 'react'
import FraseComponet from '../../components/FraseComponet';
// import './style.scss'
import { FraseAFraseComponent } from './style.js'
import { AppContext } from '../../data/Store';
function FraseAFrase({ DataFraseAFrase }) {
    const { thema } = useContext(AppContext);

    return (
        <FraseAFraseComponent thema={thema}>
            <h2>Frase a frase</h2>
            <br />
            <div className="content-frases">
                {DataFraseAFrase.map((item, i) =>
                    <FraseComponet
                    key={i}
                        FraseInIngles={`${i + 1}.` + item.FraseInIngles}
                        FraseInPortuguese={item.FraseInPortuguese} />
                )}
            </div>
            <br />
        </FraseAFraseComponent>
    )
}

export default FraseAFrase
