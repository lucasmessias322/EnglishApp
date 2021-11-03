import { Switch } from "react-router-dom";
import Route from "./Route";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import Dashboard from "../pages/Dashboard";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/cadastro" component={Cadastro} />
      <Route exact path="/dashboard" component={Dashboard} isPrivate/>
    </Switch>
  );
}
