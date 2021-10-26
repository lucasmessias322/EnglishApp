import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./pages/Home/index";
import Texto1 from "./pages/Textos/index.jsx";
import Dashboard from "./pages/Dashboard/index";
import Memorize from "./pages/Memorize/index";
import Baralho from "./pages/Baralho/index";
import Exame from "./pages/Exame/index";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/textos" component={Texto1} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/memorize" component={Memorize} />
        <Route exact path="/baralho/:id" component={Baralho} />
        <Route exact path="/exame/:id" component={Exame} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
