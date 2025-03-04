import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import NavbarWithProfile from './components/NavbarWithProfile';
import Signup from './pages/signup';
import Login from './pages/login';
import Features from './pages/Features';
import Main from './pages/Main';
import Otp from './pages/Otp';
import LandingScreen from './pages/LandingScreen';

// Layout component to handle conditional navbar rendering
const Layout = ({ children }) => {
  const location = useLocation();

  const isLandingPage = location.pathname === '/';
  const isFeaturesPage = location.pathname === '/features';
  const isProfilePage =
    location.pathname === '/main' || location.pathname === '/dashboard';

  return (
    <>
      {/* Show navbar on all pages except the landing and features pages */}
      {!isLandingPage &&
        !isFeaturesPage &&
        (isProfilePage ? <NavbarWithProfile /> : <Navbar />)}
      {children}
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingScreen />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/features" element={<Features />} />
          <Route path="/main" element={<Main />} />
          <Route path="/otp" element={<Otp />} />
          {/* Add other routes as needed */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
