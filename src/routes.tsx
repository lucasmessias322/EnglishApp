import React, { useContext } from "react";

import {Switch, BrowserRouter, Route} from "react-router-dom";
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
import { AppContext } from "./Context/Store";

const Routes = () => {
  const { thema } = useContext(AppContext)
  return (
    <BrowserRouter>
    <meta name="theme-color" content={thema ? "#FF006B" : "#0053B6"} />
    <meta name="apple-mobile-web-app-status-bar-style" content={thema ? "#FF006B" : "#0053B6"} />
    <meta name="msapplication-navbutton-color" content={thema ? "#FF006B" : "#0053B6"} />
      <Switch>
        <Route  exact path="/register" component={Register}></Route>
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


