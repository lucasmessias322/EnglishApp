import { Routes, HashRouter, Route, Navigate } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import TextsListPage from "./Pages/TextsListPage";
import TextPage from "./Pages/TextPage";
import MemorizeLists from "./Pages/MemorizeLists";
import MemoList from "./Pages/MemoList";
import LoginSigning from "./Pages/LoginSigning";
import PrivateRoutes from "./utils/PrivateRoutes";
import LearnPage from "./Pages/LearnPage";
import Admin from "./Pages/Admin";

export default function RouterComponent() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<PrivateRoutes requiredRoles={["user", "admin"]} />}>
          <Route path="/memorizelists" element={<MemorizeLists />} />
          <Route path="/memolist/:memoid" element={<MemoList />} />
          <Route path="/learn/:memoid" element={<LearnPage />} />
        </Route>

        <Route path="/" element={<Dashboard />} />
        <Route path="/account/:accountType" element={<LoginSigning />} />
        <Route path="/textslist" element={<TextsListPage />} />
        <Route path="/text/:textindex" element={<TextPage />} />

        <Route element={<PrivateRoutes requiredRoles={["admin"]} />}>
          <Route path="/admin" element={<Admin />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
  );
}

// Componente para a página não encontrada
function NotFoundPage() {
  return <Navigate to="/" />;
}
