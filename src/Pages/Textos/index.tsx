import React, { useContext } from 'react';
import TextoComponent from '../../components/TextoCompoent';
import { AppContext } from '../../Context/Store';


function Textos() {
  const {thema, texto} = useContext(AppContext);

  return ( 
    <TextoComponent texto={texto}/>
  )
}

export default Textos
