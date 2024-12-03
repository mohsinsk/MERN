import React from "react";
import { useState } from "react";
export const authContext = React.createContext();

const AuthContext = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <authContext.Provider
      value={{
        isAuthenticated: isLoggedIn,
        authenticate: setIsLoggedIn,
        logout: () => setIsLoggedIn(false),
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthContext;
