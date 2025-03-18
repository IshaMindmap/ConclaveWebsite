import React, { useState, useEffect } from 'react';
import { centrixlogo, profilepic, settings } from '../assets';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NavbarWithProfile = () => {
  const [user, setUser] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        // navigate("/login");
        return;
      }

      try {
        const backendUrl = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${backendUrl}api/v1/auth/profile/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
        localStorage.setItem('user_profile', JSON.stringify(response.data));
      } catch (err) {
        console.error('Profile Fetch Error:', err);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('category');
        // navigate("/login");
      }
    };

    fetchUserProfile();
  }, [navigate]);

  // Detect if screen is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Mobile design - Only showing profile button
  const MobileNavbar = () => (
    <nav className="flex justify-between items-center w-full px-4 py-3 font-segoe">
      <div className="flex items-center">
        <img src={centrixlogo} alt="Centrix Logo" className="h-8" />
      </div>

      <div className="flex justify-center items-center">
        {/* Only showing profile button on mobile */}
        <div className="border border-gray-300 rounded-full bg-white py-1 px-3 flex items-center gap-2 font-mulish">
          <img src={profilepic} alt="profile picture" className="h-7 w-7" />
          <div className="text-sm flex items-center">My profile</div>
        </div>
      </div>
    </nav>
  );

  // Desktop design
  const DesktopNavbar = () => (
    <nav className="flex justify-between items-center w-full px-5 py-4 font-segoe">
      <div className="flex cursor-pointer">
        <img src={centrixlogo} alt="Centrix Logo" />
      </div>

      <div className="flex justify-center items-center">
        <div className="mr-8 font-mulish">
          Hi <b>{user?.info?.name || 'User'}</b> welcome to medask
        </div>

        <div className="border border-gray-300 rounded-full bg-white py-1 px-3 flex items-center gap-2 font-mulish">
          <img src={profilepic} alt="profile picture" className="h-8 w-8" />
          <div className="text-base flex items-center">My profile</div>
        </div>

        <div className="ml-2 w-10 h-10 flex justify-center items-center border rounded-full border-gray-300 bg-white">
          <img src={settings} alt="settings pic" className="w-5 h-5" />
        </div>
      </div>
    </nav>
  );

  // Render different layouts based on screen size
  return isMobile ? <MobileNavbar /> : <DesktopNavbar />;
};

export default NavbarWithProfile;
