import { useAtom } from 'jotai';
import { loginAtom, registerAtom, logoutAtom, fetchUserAtom } from '@/lib/store/auth-actions';
import { authStateAtom } from '../store/atoms/authState';

export const useAuth = () => {
  const [authState] = useAtom(authStateAtom);
  const [, fetchAuthState] = useAtom(fetchUserAtom);
  const [, loginPrivy] = useAtom(loginAtom);
  const [, registerPrivy] = useAtom(registerAtom);
  const [, logout] = useAtom(logoutAtom);

  return {
    authState,
    fetchAuthState,
    loginPrivy,
    registerPrivy,
    logout,
  };
};