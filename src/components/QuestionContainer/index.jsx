import React, { useRef, useState } from 'react'
import { FaChevronUp, FaChevronDown } from 'react-icons/fa'
import './style.scss'

function QuestionContainer(props) {
    const Perguntas = useRef()
    const [mostrarPerguntas, setmostrarPerguntas] = useState(false)

    function MostrarPerguntas() {
        if (Perguntas.current.style.display == 'none') {
            Perguntas.current.style.display = 'block';
            setmostrarPerguntas(true)

        } else {
            Perguntas.current.style.display = 'none';
            setmostrarPerguntas(false)
        }

    }
    return (
        <div className='QuestionContainer'>
            <h2
                className='perguntasH2'
                onClick={MostrarPerguntas}>Perguntas Sobre o textos {mostrarPerguntas ? <FaChevronDown /> : <FaChevronUp />}</h2>

            <div className="perguntas" ref={Perguntas}>
                {props.children}
            </div>
        </div>

    )
}

export default QuestionContainer
