import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ArticleForm from '../article-form/ArticleForm';
import { fetchArticle } from '../../stores/slices/articleSlice';

const ArticleEditPage = () => {
  const dispatch = useDispatch();
  const { article } = useSelector((state) => state.article);
  const { slug } = useParams();

  useEffect(() => {
    dispatch(fetchArticle(slug));
  }, [dispatch, slug]);

  if (!article) return null;

  return <ArticleForm initialData={article} isEdit></ArticleForm>;
};

export default ArticleEditPage;
