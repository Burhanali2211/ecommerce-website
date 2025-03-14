import api from './api';
import { store } from '../store';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} from '../store/authSlice';

class AuthService {
  static async login(email, password) {
    try {
      store.dispatch(loginStart());
      const response = await api.post('/auth/login', { email, password });
      store.dispatch(loginSuccess(response.data));
      return response.data;
    } catch (error) {
      store.dispatch(loginFailure(error.message));
      throw error;
    }
  }

  static async register(userData) {
    try {
      store.dispatch(loginStart());
      const response = await api.post('/auth/register', userData);
      store.dispatch(loginSuccess(response.data));
      return response.data;
    } catch (error) {
      store.dispatch(loginFailure(error.message));
      throw error;
    }
  }

  static async logout() {
    try {
      await api.post('/auth/logout');
      store.dispatch(logout());
    } catch (error) {
      console.error('Error during logout:', error);
      // Still logout the user locally
      store.dispatch(logout());
    }
  }

  static async resetPassword(email) {
    try {
      const response = await api.post('/auth/reset-password', { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async updateProfile(userData) {
    try {
      const response = await api.put('/auth/profile', userData);
      store.dispatch(loginSuccess(response.data));
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default AuthService;