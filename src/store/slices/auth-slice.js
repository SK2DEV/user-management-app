import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginService } from '../../service/login-service';
import { clearToken, getToken, saveToken } from '../../helpers/local-storage';

// ✅ Updated saveToken to accept rememberMe flag
// saveToken(token, remember) => stores in localStorage or sessionStorage

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ credentials, remember }, { rejectWithValue }) => {
    const { email, password } = credentials;

    // Custom validation logic (mock)
    if (email !== "eve.holt@reqres.in" || password !== "cityslicka") {
      return rejectWithValue("Invalid email or password");
    }

    try {
      const response = await loginService(credentials); // { token, user }
      saveToken(response.token, remember); // ✅ Remember-based storage
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || 'Login failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: getToken() || null,  // ✅ Read from both storages
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      clearToken(); // ✅ Clears from both storages
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.user = action.payload.user || null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
