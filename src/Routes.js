import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./pages/Home/index";
import Texto1 from "./pages/Textos/index.jsx";
import Dashboard from "./pages/Dashboard/index";
import Memorize from "./pages/Memorize/index";
import Baralho from "./pages/Baralho/index.jsx";
import Exame from "./pages/Exame/index";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route exact path="/home" component={Home} /> */}
        <Route exact path="/textos" component={Texto1} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/memorize" component={Memorize} />
        <Route exact path="/baralho/:id" component={Baralho} />
        <Route exact path="/exame/:id" component={Exame} />
        <Route exact path="/" component={Login} />
        <Route exact path="/cadastro" component={Cadastro} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
