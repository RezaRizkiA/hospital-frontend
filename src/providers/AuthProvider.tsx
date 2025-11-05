import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { AuthContext } from "@/context/AuthContext";
import { authService } from "@/api/authService";
import type { User, AuthProviderProps } from "@/types/types";

// Daftar halaman di mana kita TIDAK PERLU cek status login
const PUBLIC_PATHS = [
  "/",
  "/customer/login",
  "/admin/login",
  "/customer/register",
];

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 1. Cek jika kita di halaman publik
    if (PUBLIC_PATHS.includes(location.pathname)) {
      setLoading(false);
      setUser(null);
      return;
    }

    // 2. Jika BUKAN halaman publik, cek user
    const initializeUser = async () => {
      try {
        const userData = await authService.fetchUser();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    initializeUser();
  }, [location]);

  const login = async (email: string, password: string) => {
    try {
      const userData = await authService.login(email, password);
      setUser(userData);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const value = {
    user,
    setUser,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
