import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Simulated API call - replace with actual API
const fetchProductsFromAPI = async () => {
  return [
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      description: 'High-quality wireless headphones with noise cancellation',
      price: 299.99,
      rating: 4.5,
      reviews: 2547,
      image: 'https://source.unsplash.com/800x600/?headphones',
      category: 'Electronics',
      brand: 'SoundMaster',
      inStock: true,
      freeShipping: true,
      deliveryDate: '2024-03-20',
      features: [
        'Active Noise Cancellation',
        '30-hour battery life',
        'Premium sound quality',
        'Comfortable fit'
      ]
    },
    {
      id: 2,
      name: 'Smart 4K TV',
      description: '65-inch 4K Ultra HD Smart LED TV',
      price: 999.99,
      rating: 4.8,
      reviews: 1823,
      image: 'https://source.unsplash.com/800x600/?tv',
      category: 'Electronics',
      brand: 'VisionTech',
      inStock: true,
      freeShipping: true,
      deliveryDate: '2024-03-22',
      features: [
        '4K Ultra HD Resolution',
        'Smart TV functionality',
        'HDR support',
        'Voice control'
      ]
    },
    {
      id: 3,
      name: 'Professional Camera',
      description: 'Digital SLR Camera with 24.2MP sensor',
      price: 1299.99,
      rating: 4.7,
      reviews: 956,
      image: 'https://source.unsplash.com/800x600/?camera',
      category: 'Electronics',
      brand: 'PhotoPro',
      inStock: true,
      freeShipping: true,
      deliveryDate: '2024-03-21',
      features: [
        '24.2MP APS-C sensor',
        '4K video recording',
        'Vari-angle touchscreen',
        'Built-in Wi-Fi'
      ]
    }
  ];
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const products = await fetchProductsFromAPI();
    return products;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
    filters: {
      category: null,
      priceRange: null,
      rating: null,
      brand: null,
    },
    sortBy: null,
  },
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setFilters, setSortBy } = productSlice.actions;
export default productSlice.reducer;