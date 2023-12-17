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

  function login(email, password) {
    const demoUsers = [
      {
        email: "admin@demo.com",
        nickname: "admin",
        password: "admin123",
        role: "admin",
      },
      {
        email: "user@demo.com",
        nickname: "user",
        password: "user123",
        role: "user",
      },
    ];

    const user = demoUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      setUser({ email: user.email, role: user.role, nickname: user.nickname });
      Cookies.set(
        "user",
        JSON.stringify({
          email: user.email,
          role: user.role,
          nickname: user.nickname,
        }),
        { expires: 7 }
      );
      return true;
    }

    return false;
  }

  function logout() {
    Cookies.remove("user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
