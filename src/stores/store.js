import { configureStore } from '@reduxjs/toolkit';

import articlesReducer from './slices/articlesSlice';
import articleReducer from './slices/articleSlice';

const store = configureStore({
  reducer: {
    articles: articlesReducer,
    article: articleReducer,
  },
});

export default store;
