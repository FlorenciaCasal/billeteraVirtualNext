import { configureStore } from '@reduxjs/toolkit';
import stepsReducer from './stepsSlice';
import userReducer from './userSlice';
import authReducer from './authSlice';
import accountReducer from './accountSlice';
import dashboardReducer from './dashboardSlice';
import paymentReducer from './paymentSlice';

export const store = configureStore({
  reducer: {
    steps: stepsReducer,
    user: userReducer,
    auth: authReducer,
    account: accountReducer,
    dashboard: dashboardReducer,
    payment: paymentReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;