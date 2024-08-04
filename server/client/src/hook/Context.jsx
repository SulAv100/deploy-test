import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [adminStatus, setAdminStatus] = useState("");
  const [optionValue, setOptionValue] = useState(null);
  const [fetchImage, setFetchImage] = useState(null);
  const [failAdmin, setFailAdmin] = useState(null);
 
  const getUserData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/auth/user`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        setUsername(data.user.username);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getOptionValue = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/user/totalOptions`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials:'include'
        }
      );

      const data = await response.json();
      if (response.ok) {
        setOptionValue(data.totalOptions);
      } else {
        console.log(data.msg);
        
      }
    } catch (error) {
      console.error(error);
    }
  };

  const checkAdminStatus = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/checkAdmin`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();
      if (response.ok) {
        setAdminStatus(data.msg);
      }else{
        console.log(data);
        setFailAdmin(data.msg);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const fetchImages = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/user/option`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:'include'
      });

      const data = await response.json();
      if (response.ok) {
        setFetchImage(data.randomImageName);
      } else {
        console.log(data.msg);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        username,
        setUsername,
        getUserData,
        checkAdminStatus,
        adminStatus,
        fetchImages,
        failAdmin,
        getOptionValue,
        optionValue,
        setOptionValue,
        fetchImage
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("use Auth is outside the provider");
  }
  return authContextValue;
};