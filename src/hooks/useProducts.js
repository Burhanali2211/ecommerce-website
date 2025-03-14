import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductService from '../services/productService';
import { useDebounce } from './useDebounce';

export function useProducts() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const fetchProducts = useCallback(
    async (filters = {}) => {
      try {
        const response = await ProductService.fetchProducts(filters);
        return response;
      } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
      }
    },
    []
  );

  const fetchProductById = useCallback(async (id) => {
    try {
      const response = await ProductService.fetchProductById(id);
      return response;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }, []);

  const searchProducts = useCallback(async (query) => {
    try {
      const response = await ProductService.searchProducts(query);
      return response;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await ProductService.fetchCategories();
      return response;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }, []);

  return {
    products,
    fetchProducts,
    fetchProductById,
    searchProducts,
    fetchCategories,
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm,
  };
}