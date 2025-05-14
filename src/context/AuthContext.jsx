import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { username, role }

  const login = async (credentials) => {
    const fakeResponse = {
      username: credentials.username,
      role: credentials.username === "admin" ? "admin" : "user",
    };
    setUser(fakeResponse);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
