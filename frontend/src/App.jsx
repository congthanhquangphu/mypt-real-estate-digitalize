import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RealEstatePage from './pages/RealEstatePage';
import AboutUsPage from './pages/AboutUsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AccountPage from './pages/AccountPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <div className='h-screen overflow-x-scroll'>
      <Router>
        <Header/>
        <div className='bg-[#ececec] min-h-full flex justify-center place-items-center'>
          <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/real_estate" element={<RealEstatePage />} />
            <Route path="/about_us" element={<AboutUsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
