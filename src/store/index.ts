import { configureStore } from '@reduxjs/toolkit';
import stepsReducer from './stepsSlice';
import userReducer from './userSlice';


const store = configureStore({
  reducer: {
    steps: stepsReducer,
    user: userReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;