import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, Spin, Alert, Flex } from 'antd';

import { fetchArticles } from '../../stores/slices/articlesSlice';
import Article from '../article/Article';

import styles from './Articles.module.scss';

const Articles = () => {
  const dispatch = useDispatch();
  const { articles, status, error, articlesCount, currentPage } = useSelector(
    (state) => state.articles,
  );

  useEffect(() => {
    dispatch(fetchArticles(currentPage));
  }, [dispatch, currentPage]);

  const onChangePage = (page) => {
    dispatch(fetchArticles(page));
  };

  if (status === 'loading') {
    return (
      <Flex justify="center" align="center">
        <Spin size="large"></Spin>
      </Flex>
    );
  }

  if (status === 'error') {
    return (
      <Flex justify="center" align="center">
        <Alert message="Error" description={error} type="error"></Alert>
      </Flex>
    );
  }

  return (
    <section className={styles['articles']}>
      <ul className={styles['articles__list']}>
        {articles.map((article) => (
          <li key={article.slug} className={styles['articles__item']}>
            <Article article={article}></Article>
          </li>
        ))}
      </ul>
      <Pagination
        current={currentPage}
        total={articlesCount}
        pageSize={10}
        onChange={onChangePage}
        showSizeChanger={false}
      ></Pagination>
    </section>
  );
};

export default Articles;
