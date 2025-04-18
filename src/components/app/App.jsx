import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Header from '../header/Header';
import Articles from '../articles/Articles';
import ArticlePage from '../article-page/ArticlePage';

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
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  );
};

export default App;
