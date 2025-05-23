import { atom } from "jotai";
import { User } from "@/lib/types/user-types";
import { atomWithStorage } from "jotai/utils";

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export const authStateAtom = atomWithStorage<AuthState>('tad_auth', {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
});