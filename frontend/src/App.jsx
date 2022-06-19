import "./App.css";
import Footer from "components/Footer";
import Header from "components/Header";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "pages/HomePage";
import AboutUsPage from "pages/AboutUsPage";
// import LoginPage from "pages/LoginPage";
// import SignupPage from "pages/SignupPage";
import NotFoundPage from "pages/NotFoundPage";
import EstateDetailPage from "pages/EstateDetailPage";
import { MetamaskProvider } from "context/MetamaskProvider";
import UserPage from "pages/UserPage";
import MarketplacePage from "pages/MarketplacePage";
import EstateRegistryPage from "pages/EstateRegistryPage";
import TokenPage from "pages/TokenPage";

function App() {
  return (
    <MetamaskProvider>
      <Router>
        <div className="h-screen overflow-x-scroll">
          <Header className="flex ant-menu ant-menu-dark justify-between flex-row items-center min-h-[5%]" />
          <div className="gradient-bg min-h-[90%] p-4">
            <Routes>
              <Route path="/" exact element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/user" element={<UserPage />} />

              {/* <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} /> */}

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
              <Route
                path="/swap"
                element={<MarketplacePage sellType="swap" />}
              />

              <Route path="/token" element={<TokenPage />} />
              <Route path="/estate/:estate_id" element={<EstateDetailPage />} />
              <Route path="/estate_registry" element={<EstateRegistryPage />} />

              <Route path="/about_us" element={<AboutUsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
          <Footer className="flex justify-center px-4 text-gray-100 bg-black min-h-[5%]" />
        </div>
      </Router>
    </MetamaskProvider>
  );
}

export default App;
