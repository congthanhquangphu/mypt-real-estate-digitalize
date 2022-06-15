import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
// import LoginPage from "./pages/LoginPage";
// import SignupPage from "./pages/SignupPage";
import NotFoundPage from "./pages/NotFoundPage";
import EstateDetailPage from "./pages/EstateDetailPage";
import { MetamaskProvider } from "context/MetamaskProvider";
import UserPage from "pages/UserPage";
import MarketplacePage from "pages/MarketplacePage";
import EstateRegistryPage from "pages/EstateRegistryPage";

function App() {
  return (
    <MetamaskProvider>
      <div className="h-screen overflow-x-scroll">
        <Router>
          <Header />
          <div className="gradient-bg min-h-full p-5">
            <Routes>
              <Route path="/" exact element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/user" element={<UserPage />} />
              {/* <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} /> */}
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/estate/:id" element={<EstateDetailPage />} />
              <Route path="/estate_registry" element={<EstateRegistryPage />} />
              <Route path="/about_us" element={<AboutUsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </div>
    </MetamaskProvider>
  );
}

export default App;
