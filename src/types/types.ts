import type { ReactNode } from "react";

export interface Role {
  id: number;
  name: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  photo: string;
  phone: string;
  gender: string;
  roles?: Role[];
  token?: string;
}

export interface AuthProviderProps{
  children: ReactNode;
}