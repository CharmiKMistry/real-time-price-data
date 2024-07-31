import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import priceReducer from '../slices/priceSlice';

export const store = configureStore({
  reducer: {
    prices: priceReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
