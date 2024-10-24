import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    user_id: number | null;
    email: string | null;
    
}

const initialState: UserState = {
    user_id: null,
    email: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ user_id: number | null; email: string}>) => {
            state.user_id = action.payload.user_id;
            state.email = action.payload.email;
        },
        clearUser: (state) => {
            state.user_id = null;
            state.email = null;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;