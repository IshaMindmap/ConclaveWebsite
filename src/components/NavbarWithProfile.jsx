import {React,useEffect,useState} from 'react';
import { centrixlogo, profilepic, settings } from '../assets';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { CloudSnow } from 'lucide-react';

const NavbarWithProfile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
      const fetchUserProfile = async () => {
        const token = localStorage.getItem("access_token"); // ✅ Get access tokenx
        if (!token) {
          navigate("/login"); // Redirect if no token
          return;
        }
  
        try {
          const backendUrl = import.meta.env.VITE_API_URL; // Ensure correct API URL
          const response = await axios.get(`${backendUrl}api/v1/auth/profile/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          setUser(response.data); // ✅ Store user data in state
          localStorage.setItem("user_profile", JSON.stringify(response.data)); // ✅ Save profile to localStorage
        } catch (err) {
          console.error("Profile Fetch Error:", err);
          localStorage.removeItem("access_token"); 
          localStorage.removeItem("refresh_token"); 
          localStorage.removeItem("category"); 
          navigate("/login"); 
        }
      };
  
      fetchUserProfile();
    }, [navigate]);


    console.log(user?.info)



  return (
    <nav className="flex justify-between items-center fill-available  px-[21px] py-[20px] font-segoe">
      <div className="flex gap-[0.313vw] cursor-pointer">
        <img src={centrixlogo} />
      </div>
      <div className="flex justify-center items-center">
        <div className="mr-[3.333vw] font-mulish">
          Hi <b>{user?.info?.name}</b> welcome to medask
        </div>
        <div className="border-[0.3px] rounded-[2.083vw] border-[#C6C6C6] bg-[#FFFFFF] p-[0.278vw] flex gap-[0.694vw] font-mulish">
          <img src={profilepic} alt="profile picture" />
          <div className="text-[1.111vw] text-center flex items-center">
            My profile
          </div>
        </div>
        <div className="ml-2 w-[2.778vw] flex justify-center items-center h-[2.778vw] border-[0.3px] rounded-full border-[#C6C6C6] bg-[#FFFFFF] p-[0.278vw] flex gap-[0.694vw] font-mulish">
          <img
            src={settings}
            alt="settings pic"
            className="w-[1.389vw] h-[1.389vw]"
          />
        </div>
      </div>
    </nav>
  );
};

export default NavbarWithProfile;
