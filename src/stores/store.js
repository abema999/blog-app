import { configureStore } from '@reduxjs/toolkit';

import articlesReducer from './slices/articlesSlice';
import articleReducer from './slices/articleSlice';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    articles: articlesReducer,
    article: articleReducer,
    user: userReducer,
  },
});

export default store;
