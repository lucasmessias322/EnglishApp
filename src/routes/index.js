import { Switch } from "react-router-dom";
import Route from "./Route";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import Dashboard from "../pages/Dashboard";
import Memorize from "../pages/Memorize/index";
import Baralho from "../pages/Baralho/index.jsx";
import Exame from "../pages/Exame/index";
import Texto1 from "../pages/Textos/index.jsx";

export default function Routes() {
  return (
    <Switch>
      
      <Route exact path="/" component={Login} />
      <Route exact path="/cadastro" component={Cadastro} />
      <Route exact path="/dashboard" component={Dashboard} isPrivate />

      <Route exact path="/textos" component={Texto1} isPrivate/>
      <Route exact path="/dashboard" component={Dashboard} isPrivate/>
      <Route exact path="/memorize" component={Memorize} isPrivate/>
      <Route exact path="/baralho/:id" component={Baralho} isPrivate />
      <Route exact path="/exame/:id" component={Exame} isPrivate/>
    </Switch>
  );
}
