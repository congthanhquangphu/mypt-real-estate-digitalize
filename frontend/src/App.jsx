import "./App.css";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "pages/HomePage";
import AboutUsPage from "pages/AboutUsPage";
import NotFoundPage from "pages/NotFoundPage";
import EstateDetailPage from "pages/EstateDetailPage";
import { MetamaskProvider } from "context/MetmaskContext";
import UserPage from "pages/UserPage";
import MarketplacePage from "pages/MarketplacePage";
import EstateRegistryPage from "pages/EstateRegistryPage";
import TokenPage from "pages/TokenPage";
import Layout from "components/Layout";
import { SecurityTokenProvider } from "context/SecurityTokenContext";

function App() {
  return (
    <MetamaskProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/user" element={<UserPage />} />
            <Route
              path="/listing"
              element={<MarketplacePage sellType="listing" />}
            />
            <Route
              path="/crowdfunding"
              element={<MarketplacePage sellType="crowdfunding" />}
            />
            <Route
              path="/bidding"
              element={<MarketplacePage sellType="bidding" />}
            />
            <Route path="/swap" element={<MarketplacePage sellType="swap" />} />
            <Route path="/token" element={<TokenPage />} />
            <Route
              path="/estate/:estateId"
              element={
                <SecurityTokenProvider>
                  <EstateDetailPage />
                </SecurityTokenProvider>
              }
            />
            <Route path="/estate_registry" element={<EstateRegistryPage />} />
            <Route path="/about_us" element={<AboutUsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </Router>
    </MetamaskProvider>
  );
}

export default App;
