import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { likeArticle, unlikeArticle } from './articleSlice';

const BASE_URL = 'https://blog-platform.kata.academy/api';

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async (page = 1, { getState, rejectWithValue }) => {
    try {
      const limit = 10;
      const offset = (page - 1) * limit;
      const token = getState().user?.user?.token;
      const response = await axios.get(`${BASE_URL}/articles?limit=${limit}&offset=${offset}`, {
        headers: token ? { Authorization: `Token ${token}` } : undefined,
      });
      return {
        articles: response.data.articles,
        articlesCount: response.data.articlesCount,
        page,
      };
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  },
);

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
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'success';
        state.articles = action.payload.articles;
        state.articlesCount = action.payload.articlesCount;
        state.currentPage = action.payload.page;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })

      .addCase(likeArticle.fulfilled, (state, action) => {
        const index = state.articles.findIndex((article) => article.slug === action.payload.slug);
        if (index !== -1) {
          state.articles[index] = action.payload;
        }
      })

      .addCase(unlikeArticle.fulfilled, (state, action) => {
        const index = state.articles.findIndex((article) => article.slug === action.payload.slug);
        if (index !== -1) {
          state.articles[index] = action.payload;
        }
      });
  },
});

export default articlesSlice.reducer;
