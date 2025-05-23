import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://blog-platform.kata.academy/api';

export const fetchArticle = createAsyncThunk(
  'article/fetchArticle',
  async (slug, { getState, rejectWithValue }) => {
    try {
      const token = getState().user?.user?.token;
      const response = await axios.get(`${BASE_URL}/articles/${slug}`, {
        headers: token ? { Authorization: `Token ${token}` } : undefined,
      });
      return response.data.article;
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  },
);

export const createArticle = createAsyncThunk(
  'article/createArticle',
  async (articleData, { getState, rejectWithValue }) => {
    try {
      const token = getState().user?.user?.token;
      const response = await axios.post(
        `${BASE_URL}/articles`,
        { article: articleData },
        {
          headers: token ? { Authorization: `Token ${token}` } : undefined,
        },
      );
      return response.data.article;
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  },
);

export const updateArticle = createAsyncThunk(
  'article/updateArticle',
  async ({ slug, ...articleData }, { getState, rejectWithValue }) => {
    try {
      const token = getState().user?.user?.token;
      const response = await axios.put(
        `${BASE_URL}/articles/${slug}`,
        { article: articleData },
        {
          headers: token ? { Authorization: `Token ${token}` } : undefined,
        },
      );
      return response.data.article;
    } catch (err) {
      return rejectWithValue(err.response.data.errors);
    }
  },
);

export const deleteArticle = createAsyncThunk(
  'article/deleteArticle',
  async (slug, { getState, rejectWithValue }) => {
    try {
      const token = getState().user?.user?.token;
      await axios.delete(`${BASE_URL}/articles/${slug}`, {
        headers: token ? { Authorization: `Token ${token}` } : undefined,
      });
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  },
);

export const likeArticle = createAsyncThunk(
  'articles/likeArticle',
  async (slug, { getState, rejectWithValue }) => {
    try {
      const token = getState().user?.user?.token;
      const response = await axios.post(
        `${BASE_URL}/articles/${slug}/favorite`,
        {},
        { headers: token ? { Authorization: `Token ${token}` } : undefined },
      );
      return response.data.article;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const unlikeArticle = createAsyncThunk(
  'articles/unlikeArticle',
  async (slug, { getState, rejectWithValue }) => {
    try {
      const token = getState().user?.user?.token;
      const response = await axios.delete(`${BASE_URL}/articles/${slug}/favorite`, {
        headers: token ? { Authorization: `Token ${token}` } : undefined,
      });
      return response.data.article;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

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
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticle.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchArticle.fulfilled, (state, action) => {
        state.status = 'success';
        state.article = action.payload;
      })
      .addCase(fetchArticle.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })

      .addCase(createArticle.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.status = 'success';
        state.article = action.payload;
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })

      .addCase(updateArticle.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        state.status = 'success';
        state.article = action.payload;
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })

      .addCase(deleteArticle.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteArticle.fulfilled, (state) => {
        state.status = 'success';
        state.article = null;
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })

      .addCase(likeArticle.fulfilled, (state, action) => {
        if (state.article?.slug === action.payload.slug) {
          state.article = action.payload;
        }
      })

      .addCase(unlikeArticle.fulfilled, (state, action) => {
        if (state.article?.slug === action.payload.slug) {
          state.article = action.payload;
        }
      });
  },
});

export const { clearArticle, clearError } = articleSlice.actions;

export default articleSlice.reducer;
