import React from "react";
import { useState } from "react";
export const authContext = React.createContext();

const AuthContext = (props) => {
  const [token, setToken] = useState(true);
  return (
    <authContext.Provider
      value={{
        token: token,
        authenticate: setToken,
        logout: () => setToken(""),
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthContext;
