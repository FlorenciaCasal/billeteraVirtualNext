import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  user_id: number | null;
}

const initialState: UserState = {
  user_id: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<number>) => {
      state.user_id = action.payload;
    },
    clearUserId: (state) => {
      state.user_id = null;
    },
  },
});

export const { setUserId, clearUserId } = userSlice.actions;
export default userSlice.reducer;