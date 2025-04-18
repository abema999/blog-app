import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://blog-platform.kata.academy/api';

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async (page = 1) => {
  const limit = 10;
  const offset = (page - 1) * limit;
  const response = await axios.get(`${BASE_URL}/articles?limit=${limit}&offset=${offset}`);
  return {
    articles: response.data.articles,
    articlesCount: response.data.articlesCount,
    page,
  };
});

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    articlesCount: 0,
    currentPage: 1,
    status: '',
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'success';
        state.articles = action.payload.articles;
        state.articlesCount = action.payload.articlesCount;
        state.currentPage = action.payload.page;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      });
  },
});

export default articlesSlice.reducer;
