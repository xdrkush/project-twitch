import { HashRouter, Route, Routes } from "react-router-dom";

// Docs: https://reactrouter.com/en/main/route/route

// Layouts
import { MainLayout } from "./layouts/Main";

// Pages
import { HomePage } from "./pages/Home";
import { KushTokenPage } from "./pages/KushToken";
import { KushNFTPage } from "./pages/KushNFT";
import { NotFoundPage } from "./pages/NotFoundPage";

// Router
export const App = () => (
  <HashRouter>
    <Routes>

      {/* MainLayout - / */}
      <Route path="/" element={<MainLayout />} >
        {/* / */}
        <Route index element={<HomePage />} />
        {/* /token */}
        <Route path="token" element={<KushTokenPage />} />
        {/* /nft */}
        <Route path="nft" element={<KushNFTPage />} />

        {/* 404 Not Found - * */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* 404 Not Found - * */}
      <Route path="*" element={<NotFoundPage />} />

    </Routes>
  </HashRouter>
)
