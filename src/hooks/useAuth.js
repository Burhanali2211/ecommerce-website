import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthService from '../services/authService';

export function useAuth() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const login = useCallback(
    async (email, password) => {
      try {
        const response = await AuthService.login(email, password);
        return response;
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    },
    []
  );

  const register = useCallback(
    async (userData) => {
      try {
        const response = await AuthService.register(userData);
        return response;
      } catch (error) {
        console.error('Registration error:', error);
        throw error;
      }
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      await AuthService.logout();
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }, []);

  const resetPassword = useCallback(async (email) => {
    try {
      const response = await AuthService.resetPassword(email);
      return response;
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  }, []);

  return {
    auth,
    login,
    register,
    logout,
    resetPassword,
    isAuthenticated: auth.isAuthenticated,
    user: auth.user,
    loading: auth.loading,
    error: auth.error,
  };
}