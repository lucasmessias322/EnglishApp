import React from "react";
import { Routes, HashRouter, Route } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import TextosPage from "./pages/TextosPage";
import LoginRegister from "./pages/LoginRegister";
import PrivateRoutes from "./utils/PrivateRoutes";

export default function RoutesComponent() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<PrivateRoutes />}></Route>
        <Route path="/" element={<DashBoard />} />
        <Route path="/textos" element={<TextosPage />} />
        <Route path="/loginregister/:login" element={<LoginRegister />} />
      </Routes>
    </HashRouter>
  );
}
