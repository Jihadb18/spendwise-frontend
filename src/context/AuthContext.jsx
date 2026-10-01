import { createContext, useContext, useState } from "react";
import api from "@/services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  const login = async (email, password) => {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    const newToken = response.data.token;

    localStorage.setItem("token", newToken);
    setToken(newToken);

    return newToken;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}