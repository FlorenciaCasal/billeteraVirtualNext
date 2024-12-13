import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaymentState {
  cardNumberId: number | null;
}

const initialState: PaymentState = {
  cardNumberId: null,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setCardNumberId: (state, action: PayloadAction<number | null>) => {
      state.cardNumberId = action.payload;
    },
  },
});

export const { setCardNumberId } = paymentSlice.actions;
export default paymentSlice.reducer;