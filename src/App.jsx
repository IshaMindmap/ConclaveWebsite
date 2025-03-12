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
import Dashboard from './pages/Dashboard';
import Terms from './pages/Terms';

// Layout component to handle conditional navbar rendering
const Layout = ({ children }) => {
  const location = useLocation();

  const isLandingPage =
    location.pathname === '/' || location.pathname === '/login';
  const isFeaturesPage =
    location.pathname === '/features' || location.pathname === '/dashboard' ;
  const isProfilePage =
    location.pathname === '/main';

  return (
    <>
      {/* Show navbar on all pages except the landing and features pages */}
      {!isLandingPage &&
        !isFeaturesPage &&
        (isProfilePage ? <NavbarWithProfile /> :'')}
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
          <Route path="/terms" element={<Terms />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Add other routes as needed */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
