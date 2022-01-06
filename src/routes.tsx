import React from "react";

import {Switch, BrowserRouter, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import Register from "./Pages/Register";
import Login from "./Pages/Login";
import DashBoard from "./Pages/DashBoard";
import Textos from "./Pages/Textos";
import Memorize from "./Pages/Memorize";
import Baralho from "./Pages/Baralho";
import Exame from "./Pages/Exame";
import UserBaralho from "./Pages/UserBaralho";
import UserExame from "./Pages/UserExame";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/" component={Login}></Route>
        <PrivateRoute path="/dashboard" component={DashBoard} />
        <PrivateRoute path="/textos" component={Textos} />
        <PrivateRoute path="/memorize" component={Memorize} />
        <PrivateRoute path="/baralho/:id" component={Baralho} />
        <PrivateRoute path="/exame/:id" component={Exame} />
        <PrivateRoute path="/userbaralho/:id/itemId/:itemid" component={UserBaralho} />
        <PrivateRoute path="/userexame/:id/itemId/:itemid" component={UserExame} />
      </Switch>
    </BrowserRouter>
  )
};

export default Routes;


