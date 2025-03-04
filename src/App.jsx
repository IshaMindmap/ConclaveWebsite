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

// Layout component to handle conditional navbar rendering
const Layout = () => {
  const location = useLocation();

  // Check if current path is /features
  const isFeaturesPage =
    location.pathname === '/features' || location.pathname === '/main';

  return (
    <div className="min-h-screen">
      {isFeaturesPage ? <NavbarWithProfile /> : <Navbar />}
      <main className="mx-auto px-4">
        <Routes>
          <Route path="/" element={<Signup />} />
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
