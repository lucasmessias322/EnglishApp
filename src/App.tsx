import React from 'react';
import Store from './Context/Store';
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
