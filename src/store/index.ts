import { configureStore } from '@reduxjs/toolkit';
import stepsReducer from './stepsSlice';


const store = configureStore({
  reducer: {
    steps: stepsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;