import React, { useContext } from 'react';
import Store, { AppContext } from './Context/Store';
import Routes from './routes';
import 'swiper/swiper.scss';

function App() {

  return (
    <Store>
      
      <Routes />
     
    </Store>

  );
}

export default App;
