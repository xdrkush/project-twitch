import { HashRouter, Route, Routes } from "react-router-dom";

// Docs: https://reactrouter.com/en/main/route/route

// Layouts
import { MainLayout } from "./layouts/Main";

// Pages
import { HomePage } from "./pages/Home";
import { KushTokenPage } from "./pages/KushToken";
import { KushFaucetPage } from "./pages/KushFaucet";
import { KushNFTPage } from "./pages/KushNFT";
import { KushNFTIDPage } from "./pages/KushNFTID";
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
        {/* /faucet */}
        <Route path="faucet" element={<KushFaucetPage />} />

        {/* 404 Not Found - * */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* /nft */}
      <Route path="/nft" element={<MainLayout />} >
        <Route index element={<KushNFTPage />} />
        <Route path=":id" element={<KushNFTIDPage />} />
      </Route>
      
      {/* 404 Not Found - * */}
      <Route path="*" element={<NotFoundPage />} />

    </Routes>
  </HashRouter>
)
