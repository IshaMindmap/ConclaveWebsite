import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './pages/signup';
import Login from './pages/login';
import Features from './pages/Features';
import NavbarWithProfile from './components/NavbarWithProfile';
import Main from './pages/Main';
import Otp from './pages/Otp';
import LandingScreen from './pages/LandingScreen';

// Layout component to handle conditional navbar rendering
const Layout = () => {
  const location = useLocation();

  // Check if current path is /features or /main
  const isFeaturesOrMainPage =
    location.pathname === '/features' ||
    location.pathname === '/main' ||
    location.pathname === '/dashboard';

  // Check if current path is the landing page
  const isLandingPage = location.pathname === '/';

  return (
    <div className="min-h-screen">
      {/* Show navbar on all pages except landing page */}
      {!isLandingPage &&
        (isFeaturesOrMainPage ? <NavbarWithProfile /> : <Navbar />)}

      <main className="mx-auto">
        <Routes>
          <Route path="/" element={<LandingScreen />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/features" element={<Features />} />
          <Route path="/main" element={<Main />} />
          <Route path="/dashboard" element={<Main />} />
          <Route path="/otp" element={<Otp />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
