import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import cartReducer from './cartSlice';
import authReducer from './authSlice';
import productReducer from './productSlice';

// Configure persist for each reducer
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'auth'], // Only persist cart and auth states
};

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  products: productReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
