import api from './api';
import { store } from '../store';
import { setProducts, setLoading, setError } from '../store/productSlice';

class ProductService {
  static async fetchProducts(filters = {}) {
    try {
      store.dispatch(setLoading(true));
      const response = await api.get('/products', { params: filters });
      store.dispatch(setProducts(response.data));
      return response.data;
    } catch (error) {
      store.dispatch(setError(error.message));
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  }

  static async fetchProductById(id) {
    try {
      store.dispatch(setLoading(true));
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      store.dispatch(setError(error.message));
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  }

  static async searchProducts(query) {
    try {
      store.dispatch(setLoading(true));
      const response = await api.get('/products/search', { params: { q: query } });
      store.dispatch(setProducts(response.data));
      return response.data;
    } catch (error) {
      store.dispatch(setError(error.message));
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  }

  static async fetchCategories() {
    try {
      const response = await api.get('/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }
}

export default ProductService;