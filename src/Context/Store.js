import React, { createContext, useState } from 'react'
import useStorage from '../utils/useStorage';
import { Redirect} from 'react-router-dom';
import { isVoidExpression } from 'typescript';

const initialState = {
    number: 0,
    token:"",
    thema: true,
    texto: 0,
    baralhoItems: Object,
    currentUserData: Object,
    setCurrentUserData: Function,
    setToken: Function,
    logout: Function,
    setThema: Boolean,
    setNumber: Number,
    setTexto: Number,
    setBaralhoItems: Function,
}

export const AppContext = createContext(initialState)

function Store(props) {
    const [state, setState] = useState(initialState)
    const [token, setToken] = useStorage('token')
    const [currentUserData, setCurrentUserData] = useStorage('currentUserData')
    function updateState(key, value) {
        setState({
            ...state,
            [key]: value
        })
    }

    function logout(){
        setToken("");
        setCurrentUserData("");
        localStorage.removeItem('token');
        localStorage.removeItem('currentUserData');
        <Redirect to="/"/>
    }


    return (
        <AppContext.Provider value={{
            token,
            number: state.number,
            thema: state.thema,
            texto: state.texto,
            baralhoItems: state.baralhoItems,
            setToken,
            currentUserData,
            setCurrentUserData,
            logout,
            setThema:thema => updateState('thema', thema),
            setNumber:number => updateState('number', number),
            setTexto: texto => updateState('texto', texto),
            setBaralhoItems: baralhoItems =>('baralhoItems',baralhoItems)
        }}>

            {props.children}

        </AppContext.Provider>

    )
}

export default Store
