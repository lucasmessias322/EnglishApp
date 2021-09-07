import React, { createContext, useState } from 'react'

const initialState = {
    number: 0,
    Nanterior: 0,
    texto: 0,
    thema: true
}

export const AppContext = createContext(initialState)

function Store(props) {
    const [state, setState] = useState(initialState)

    function updateState(key, value) {
        setState({
            ...state,
            [key]: value
        })
    }

    return (
        <AppContext.Provider value={{
            number: state.number,
            Nanterior: state.Nanterior,
            texto: state.texto,
            thema: state.thema,
            setNumber: n => updateState('number', n),
            setNanterior: Na => updateState('Nanterior', Na),
            setTexto: text => updateState('texto', text),
            setThema: thema => updateState('thema', thema)
        }}>

            {props.children}

        </AppContext.Provider>

    )
}

export default Store
