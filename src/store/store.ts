import { configureStore } from '@reduxjs/toolkit';
import stepsReducer from './stepsSlice';
import userReducer from './userSlice';
import authReducer from './authSlice'
import accountReducer from './accountSlice'


export const store = configureStore({
  reducer: {
    steps: stepsReducer,
    user: userReducer,
    auth: authReducer,
    account: accountReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;