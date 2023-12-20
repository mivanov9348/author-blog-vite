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
      setUser(JSON.parse(userData));
    }
  }, []);

  async function login(email, password) {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        return true;
      } else {
      }
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  }

  //register

  async function register(email, password) {
    try {
      const response = await fetch("/api/register", {
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
