import { Routes, HashRouter, Route, Navigate } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import NewsPage from "./Pages/NewsPage";
import TextsListPage from "./Pages/TextsListPage";
import TextPage from "./Pages/TextPage";
import MemorizeLists from "./Pages/MemorizeLists";
import MemoList from "./Pages/MemoList";
import LoginSigning from "./Pages/LoginSigning";
import PrivateRoutes from "./utils/PrivateRoutes";

export default function RouterComponent() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/memorizelists" element={<MemorizeLists />} />
          <Route path="/memolist/:memoid" element={<MemoList />} />
        </Route>
        <Route path="/" element={<Dashboard />} />
        <Route path="/account/:accountType" element={<LoginSigning />} />
        <Route path="/newslist" element={<NewsPage />} />
        <Route path="/textslist" element={<TextsListPage />} />
        <Route path="/text/:id" element={<TextPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
  );
}

// Componente para a página não encontrada
function NotFoundPage() {
  return <Navigate to="/" />;
}
