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
import { KushCollectionPage } from "./pages/KushCollection";
import { KushCollectionIDPage } from "./pages/KushCollectionID";
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
        {/* /nft */}
        <Route index element={<KushNFTPage />} />
        {/* /nft/:id */}
        <Route path=":id" element={<KushNFTIDPage />} />
      </Route>

      {/* /collection */}
      <Route path="/collection" element={<MainLayout />} >
        {/* /collection */}
        <Route index element={<KushCollectionPage />} />
        {/* /collection/:id */}
        <Route path=":id" element={<KushCollectionIDPage />} />
      </Route>
      
      {/* 404 Not Found - * */}
      <Route path="*" element={<NotFoundPage />} />

    </Routes>
  </HashRouter>
)
