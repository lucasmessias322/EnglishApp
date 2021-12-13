import React, { ReactChild, ReactChildren, ReactNode } from 'react';
import { Interface } from 'readline';
import {FaUser, FaLock, FaEnvelope} from 'react-icons/fa';
import * as C from "./style";

type Props = {
  User?: boolean,
  Password?: boolean,
  Email?: boolean,
  children?: ReactChild | ReactChild[] | ReactChildren | ReactChildren[];
}


function Input(props: Props) {
  
  return (
    <C.InputText>
      <div>
         { props.User ? <FaUser color="white" size={20} />: 
           props.Password ? <FaLock color="white" size={20} />:
           props.Email ? <FaEnvelope color="white" size={20} />: ""
         }
      
      </div>
      {props.children}
    </C.InputText>
  );
}

export default Input
