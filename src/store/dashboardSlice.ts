import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DashboardState {
  searchTerm: string;
  token: string;
  balance: number;
}

const initialState: DashboardState = {
  searchTerm: '',
  token: '',
  balance: 0,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },  
  },
});

export const { setSearchTerm, setToken, setBalance } = dashboardSlice.actions;

export default dashboardSlice.reducer;