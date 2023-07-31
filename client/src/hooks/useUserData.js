import { useState, useEffect } from "react";
import axios from "axios";

const useUserData = (userID) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/auth/${userID}`); 
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [userID]);

  return userData;
};

export default useUserData;
