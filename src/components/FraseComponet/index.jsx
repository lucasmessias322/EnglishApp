import React from 'react'

function FraseComponet({FraseInIngles, FraseInPortuguese}) {
    return (
        <li>
            <h3>{FraseInIngles}</h3>
            <p>{FraseInPortuguese}</p>
        </li>
    )
}

export default FraseComponet
