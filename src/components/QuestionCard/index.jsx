import React from 'react'


function QuestionCard(props) {
    function EscolherPergunta(resposta, el) {
        if (resposta !== props.RespostaCorreta) {
            el.currentTarget.style.backgroundColor = 'red'
            console.log(el.currentTarget);

        } else {
            el.currentTarget.style.backgroundColor = 'green'
        }
    };

    return (
        <div className="questionario-component">
            <div className="opcoes-container">
                <span className='pergunta'>{props.Pergunta}</span>
                <br /><br />
                <ul>
                    <li onClick={(el) => EscolherPergunta(props.Resposta1, el)}>{props.Resposta1}</li>
                    <li onClick={(el) => EscolherPergunta(props.Resposta2, el)}>{props.Resposta2}</li>
                    <li onClick={(el) => EscolherPergunta(props.Resposta3, el)}>{props.Resposta3}</li>
                    <li onClick={(el) => EscolherPergunta(props.Resposta4, el)}>{props.Resposta4}</li>
                </ul>

            </div>
        </div>
    )
}

export default QuestionCard
