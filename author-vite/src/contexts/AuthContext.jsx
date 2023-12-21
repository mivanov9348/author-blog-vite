import { useState, useContext, createContext, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext); // Added return statement
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = Cookies.get("user");

    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  async function login(email, password) {
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json(); // Парсваме веднъж и използваме резултата

      if (!response.ok) {
        throw new Error(data.message);
      }
      if (!data.user) {
        throw new Error("User data is missing from the response");
      }
      Cookies.set("user", JSON.stringify(data.user));
      setUser(data.user);
      return true;
    } catch (error) {
      console.error("Login error:", error.message);
      return false;
    }
  }

  //register
  async function register(email, password) {
    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      return response.ok; // Връща true, ако регистрацията е успешна
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  }

  function logout() {
    Cookies.remove("user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
