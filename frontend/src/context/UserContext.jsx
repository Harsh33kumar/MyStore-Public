import React, { createContext } from "react";
import axios from "axios";
import { useEffect } from "react";

export const userDataContext = createContext();

function UserContext({ children }) {
  let [userData, setUserData] = React.useState(null);

  const getCurrentUser = async () => {
    try {
      let result = await axios.get(" /api/user/getcurrentuser", {
        withCredentials: true,
      });
      setUserData(result.data);
      console.log(result.data);
    } catch (error) {
      setUserData(null);
      console.log(error);
    }
  };

  const fetched = React.useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;
    getCurrentUser();
  }, []);

  let value = {
    userData,
    setUserData,
    getCurrentUser,
  };

  return (
      <userDataContext.Provider value={value}>
        {children}
      </userDataContext.Provider>
  );
}

export default UserContext;
