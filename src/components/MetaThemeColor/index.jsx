import React,{useContext, useEffect} from 'react'
import {AppContext} from '../../data/Store';


function MetaTheme() {
    const { thema, setThema } = useContext(AppContext);
    return (
        <div>
            <meta name="theme-color" content={thema ? "#FF006B" : "#0053B6"} />
        </div>
    )
}

export default MetaTheme




