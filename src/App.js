import Routes from "./Routes.js";
import DataContext, { data } from './data/DataContext';
import { useState } from "react";
import Store from "./data/Store.jsx";
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [state, setState] = useState(data)

  return (
    <Store>
      <DataContext.Provider value={{ state, setState }}>
        <Routes />
      </DataContext.Provider>
    </Store >
  );
}

export default App;
