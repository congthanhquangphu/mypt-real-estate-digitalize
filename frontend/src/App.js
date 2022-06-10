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

function App() {
  return (
    <div className='h-screen'>
      <Router>
        <Header/>
        <div className='bg-[#ececec] h-5/6 flex justify-center place-items-center'>
          <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/home" exact element={<HomePage />} />
            <Route path="/real_estate" exact element={<RealEstatePage />} />
            <Route path="/about_us" exact element={<AboutUsPage />} />
            <Route path="/login" exact element={<LoginPage />} />
            <Route path="/signup" exact element={<SignupPage />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
