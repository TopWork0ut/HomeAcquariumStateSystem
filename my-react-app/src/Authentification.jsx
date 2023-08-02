import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [isAuthentificated, setIsAuthentificated] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthentificated, setIsAuthentificated }}>
      {props.children}
    </AuthContext.Provider>
  );
};
