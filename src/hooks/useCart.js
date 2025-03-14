import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartService from '../services/cartService';

export function useCart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const addToCart = useCallback(
    async (productId, quantity = 1) => {
      try {
        await CartService.addItem(productId, quantity);
      } catch (error) {
        console.error('Error adding item to cart:', error);
        throw error;
      }
    },
    []
  );

  const removeFromCart = useCallback(
    async (productId) => {
      try {
        await CartService.removeItem(productId);
      } catch (error) {
        console.error('Error removing item from cart:', error);
        throw error;
      }
    },
    []
  );

  const updateQuantity = useCallback(
    async (productId, quantity) => {
      try {
        await CartService.updateItemQuantity(productId, quantity);
      } catch (error) {
        console.error('Error updating cart quantity:', error);
        throw error;
      }
    },
    []
  );

  const clearCart = useCallback(async () => {
    try {
      await CartService.clearCart();
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  }, []);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
}