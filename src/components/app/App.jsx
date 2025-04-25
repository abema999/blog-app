import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Header from '../header/Header';
import Articles from '../articles/Articles';
import ArticlePage from '../article-page/ArticlePage';
import SignUpForm from '../sign-up-form/SignUpForm';
import SignInForm from '../sign-in-form/SignInForm';
import Profile from '../profile/Profile';

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
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  );
};

export default App;
