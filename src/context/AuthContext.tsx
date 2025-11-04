import { createContext } from "react";
import type { User } from "@/types/types";

// Ini adalah "Blueprint" atau "Kontrak"
// Komponen Provider nanti HARUS menyediakan semua ini
export interface AuthContextType {
  user: User | null; // Data user yang sedang login
  setUser: (user: User | null) => void; // Fungsi untuk mengubah user (misal saat login/logout)
  loading: boolean; // Status loading (misal saat pertama kali cek user)
  login: (email: string, password: string) => Promise<void>; // Fungsi untuk login
  logout: () => Promise<void>; // Fungsi untuk logout
}

export const AuthContext = createContext<AuthContextType | null>(null);
