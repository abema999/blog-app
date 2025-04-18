import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://blog-platform.kata.academy/api';

export const fetchArticle = createAsyncThunk('article/fetchArticle', async (slug) => {
  const response = await axios.get(`${BASE_URL}/articles/${slug}`);
  return response.data.article;
});

const articleSlice = createSlice({
  name: 'article',
  initialState: {
    article: null,
    status: '',
    error: null,
  },
  reducers: {
    clearArticle(state) {
      state.article = null;
      state.status = '';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticle.fulfilled, (state, action) => {
        state.status = 'success';
        state.article = action.payload;
      })
      .addCase(fetchArticle.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      });
  },
});

export const { clearArticle } = articleSlice.actions;

export default articleSlice.reducer;
