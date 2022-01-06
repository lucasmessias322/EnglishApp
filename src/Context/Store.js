import React, { createContext, useEffect, useState } from 'react'
import useStorage from '../utils/useStorage';
import { Redirect} from 'react-router-dom';
import { config, getUserdata } from '../services/authenticationApi';

const initialState = {
    number: 0,
    token:"",
    thema: true,
    texto: 0,
    current: 0,
    baralhoItems: Object,
    currentUserData: {
        email: "",
        name: "",
        memorize: [{
            _id: "",
            titulo: "",
            items: [{
                _id: "",
                questions: "",
                response: ""
            }]
        }],
        _id: ""
    },
    setCurrent: Function,
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
            current: state.current,
            baralhoItems: state.baralhoItems,
            setToken,
            currentUserData,
            setCurrentUserData,
            logout,
            setThema:thema => updateState('thema', thema),
            setNumber:number => updateState('number', number),
            setTexto: texto => updateState('texto', texto),
            setBaralhoItems: baralhoItems =>('baralhoItems',baralhoItems),
            setCurrent: current =>('current', current)
        }}>

            {props.children}

        </AppContext.Provider>

    )
}

export default Store
