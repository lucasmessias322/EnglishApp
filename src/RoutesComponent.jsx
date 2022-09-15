import React from "react";
import { Routes, HashRouter, Route } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import TextosPage from "./pages/TextosPage";
export default function RoutesComponent() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/textos" element={<TextosPage />} />
      </Routes>
    </HashRouter>
  );
}
