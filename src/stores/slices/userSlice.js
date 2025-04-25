import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://blog-platform.kata.academy/api';

export const addUser = createAsyncThunk(
  'user/addUser',
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/users`, {
        user: { username, email, password },
      });
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  },
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/login`, {
        user: { email, password },
      });
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  },
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (userData, { getState, rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/user`,
        { user: userData },
        { headers: { Authorization: `Token ${getState().user.user.token}` } },
      );
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')),
    status: '',
    error: null,
  },
  reducers: {
    logoutUser(state) {
      state.user = null;
      localStorage.removeItem('user');
    },
    clearStatus(state) {
      state.status = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.status = 'success';
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })

      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'success';
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })

      .addCase(updateUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'success';
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      });
  },
});

export const { logoutUser, clearStatus, clearError } = userSlice.actions;
export default userSlice.reducer;
