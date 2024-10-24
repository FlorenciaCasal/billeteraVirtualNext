import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AccountState {
    account_id: number | null;    
}

const initialState: AccountState = {
    account_id: null
};

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setAccount: (state, action: PayloadAction<{ account_id: number | null}>) => {
            console.log("Estableciendo account_id en Redux:", action.payload.account_id);
            state.account_id = action.payload.account_id;
        },
        clearAccount: (state) => {
            state.account_id = null;            
        },
    },
});

export const { setAccount } = accountSlice.actions;
export default accountSlice.reducer;