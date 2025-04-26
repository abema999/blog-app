import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Header from '../header/Header';
import Articles from '../articles/Articles';
import ArticlePage from '../article-page/ArticlePage';
import SignUpForm from '../sign-up-form/SignUpForm';
import SignInForm from '../sign-in-form/SignInForm';
import Profile from '../profile/Profile';
import ArticleCreatePage from '../article-create-page/ArticleCreatePage';
import ArticleEditPage from '../article-edit-page/ArticleEditPage';
import PrivateRoute from '../private-route/PrivateRoute';

import styles from './App.module.scss';

const App = () => {
  return (
    <BrowserRouter>
      <Header></Header>
      <main className={styles['main']}>
        <div className={styles['main__container']}>
          <Routes>
            <Route path="/" element={<Navigate to="/articles" />}></Route>
            <Route path="/articles" element={<Articles></Articles>}></Route>
            <Route path="/articles/:slug" element={<ArticlePage></ArticlePage>}></Route>
            <Route path="/sign-up" element={<SignUpForm></SignUpForm>}></Route>
            <Route path="/sign-in" element={<SignInForm></SignInForm>}></Route>
            <Route path="/profile" element={<Profile></Profile>}></Route>
            <Route element={<PrivateRoute></PrivateRoute>}>
              <Route path="/new-article" element={<ArticleCreatePage></ArticleCreatePage>}></Route>
            </Route>
            <Route
              path="/articles/:slug/edit"
              element={<ArticleEditPage></ArticleEditPage>}
            ></Route>
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  );
};

export default App;
