import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("bookbin-user"))
  );

  const loginUser = (data) => {
    setUser(data);
    localStorage.setItem("bookbin-user", JSON.stringify(data));
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("bookbin-user");
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
