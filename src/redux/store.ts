import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {}, // Později přidáme slice
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
