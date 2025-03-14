import api from './api';
import { store } from '../store';
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setCartError,
} from '../store/cartSlice';

class CartService {
  static async addItem(productId, quantity = 1) {
    try {
      const response = await api.post('/cart/items', { productId, quantity });
      store.dispatch(addToCart(response.data));
      return response.data;
    } catch (error) {
      store.dispatch(setCartError(error.message));
      throw error;
    }
  }

  static async removeItem(productId) {
    try {
      await api.delete(`/cart/items/${productId}`);
      store.dispatch(removeFromCart(productId));
    } catch (error) {
      store.dispatch(setCartError(error.message));
      throw error;
    }
  }

  static async updateItemQuantity(productId, quantity) {
    try {
      const response = await api.put(`/cart/items/${productId}`, { quantity });
      store.dispatch(updateQuantity({ productId, quantity }));
      return response.data;
    } catch (error) {
      store.dispatch(setCartError(error.message));
      throw error;
    }
  }

  static async clearCart() {
    try {
      await api.delete('/cart');
      store.dispatch(clearCart());
    } catch (error) {
      store.dispatch(setCartError(error.message));
      throw error;
    }
  }

  static async fetchCart() {
    try {
      const response = await api.get('/cart');
      store.dispatch(setCart(response.data));
      return response.data;
    } catch (error) {
      store.dispatch(setCartError(error.message));
      throw error;
    }
  }
}

export default CartService;