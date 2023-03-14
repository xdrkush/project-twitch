import { HashRouter, Route, Routes } from "react-router-dom";

// Docs: https://reactrouter.com/en/main/route/route

// Layouts
import { MainLayout } from "./layouts/Main";

// Pages
import { HomePage } from "./pages/Home";
import { TokenPage } from "./pages/Token";
import { NFTPage } from "./pages/NFT";
import { NotFoundPage } from "./pages/NotFound";
import { SwapPage } from "./pages/Swap";

// Router
export const App = () => (
  <HashRouter>
    <Routes>

      {/* MainLayout - / */}
      <Route path="/" element={<MainLayout />} >

        {/* / */}
        <Route index element={<HomePage />} />

        {/* /#/token */}
        <Route path="token" element={<TokenPage />} />

        {/* /#/nft */}
        <Route path="nft" element={<NFTPage />} />

        {/* /#/swap */}
        <Route path="swap" element={<SwapPage />} />

      </Route>

      <Route path="*" element={<NotFoundPage />} />

    </Routes>
  </HashRouter>
)