// import Routes from "./Routes.js";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/index";
import DataContext, { data } from "./data/DataContext";
import { useState } from "react";
import Store from "./data/Store.jsx";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./data/auth";

function App() {
  const [state, setState] = useState(data);

  return (
    <AuthProvider>
      <Store>
        <DataContext.Provider value={{ state, setState }}>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </DataContext.Provider>
      </Store>
    </AuthProvider>
  );
}

export default App;
