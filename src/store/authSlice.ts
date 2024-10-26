import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import authApi from '@/services/auth/auth.api';
import { LoginResponseType } from '@/types/auth.types';
import { AccessDeniedError } from '@/services/common/http.errors';
// import { setAmount } from '@/store/amountSlice';
import userApi from '@/services/users/users.service';

interface AuthState {
  user: { email: string } | null,
  token: string | null;
  account_id: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null,
}

const initialState: AuthState = {
  user: null,
  token: null,
  account_id: null,
  status: 'idle',
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await authApi.login(email, password);

      // // Obtener el saldo del usuario
      // const balanceResponse = await userApi.getMeInternal(response.token);
      // // Despachar la acción para establecer el monto en el store de Redux
      // thunkAPI.dispatch(setAmount(balanceResponse.available_amount));

      return response;
    } catch (error: any) {
      if (error instanceof AccessDeniedError) {
        return thunkAPI.rejectWithValue('Correo electrónico o contraseña incorrectos');
      }
      return thunkAPI.rejectWithValue('Ha ocurrido un error. Intente más tarde');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.account_id = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginResponseType>) => {
      state.status = 'succeeded';
      state.user = { email: action.payload.email };
      state.token = action.payload.token;
      // Asegúrate de almacenar el account_id si es necesario
      state.account_id = action.payload.account_id;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer

