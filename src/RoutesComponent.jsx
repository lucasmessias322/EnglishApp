import React from "react";
import { Routes, HashRouter, Route } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import TextosPage from "./pages/TextosPage";
import LoginRegister from "./pages/LoginRegister";
import PrivateRoutes from "./utils/PrivateRoutes";
import ListsOfWords from "./pages/ListsOfWords";
import CardsPage from "./pages/Cards";

import List from "./pages/List";

export default function RoutesComponent() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          {/* <Route exact path="/listsofwords" element={<ListsOfWords />} /> */}
          <Route exact path="/list/:listData" element={<List />} />
          <Route exact path="/cards/:listData" element={<CardsPage />} />
        </Route>
        <Route exact path="/" element={<DashBoard />} />
        <Route path="/textos/:indexTexto" element={<TextosPage />} />
        <Route exact path="/loginregister/:login" element={<LoginRegister />} />
      </Routes>
    </HashRouter>
  );
}
