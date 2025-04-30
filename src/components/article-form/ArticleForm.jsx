import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';

import { createArticle, updateArticle, clearError } from '../../stores/slices/articleSlice';

import styles from './ArticleForm.module.scss';

const ArticleForm = ({ initialData = {}, isEdit = false }) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.article);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    setError,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: initialData.title || '',
      description: initialData.description || '',
      body: initialData.body || '',
      tagList: initialData.tagList?.map((tag) => ({ name: tag })) || [{ name: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  });

  const onSubmit = async (data) => {
    clearErrors();
    const articleData = {
      title: data.title,
      description: data.description,
      body: data.body,
      tagList: data.tagList.map((tag) => tag.name).filter((tag) => tag.trim() !== ''),
    };
    if (isEdit) {
      const result = await dispatch(updateArticle({ slug: initialData.slug, ...articleData }));
      if (updateArticle.fulfilled.match(result)) {
        navigate(`/articles/${result.payload.slug}`);
      }
    } else {
      const result = await dispatch(createArticle(articleData));
      if (createArticle.fulfilled.match(result)) {
        navigate(`/articles/${result.payload.slug}`);
      }
    }
  };

  useEffect(() => {
    if (error) {
      Object.entries(error).forEach(([key, message]) => {
        setError(key, {
          type: 'server',
          message: message,
        });
      });
    }
  }, [error, setError]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles['article-form']}>
      <h2 className={styles['article-form__title']}>
        {isEdit ? 'Edit article' : 'Create new article'}
      </h2>
      <label className={styles['article-form__label']}>
        Title
        <input
          className={`${styles['article-form__input']} ${errors.title ? styles['article-form__error'] : ''}`}
          type="text"
          {...register('title', { required: 'Title is required' })}
          placeholder="Title"
        />
        {errors.title && (
          <p className={styles['article-form__error-message']}>{errors.title.message}</p>
        )}
      </label>
      <label className={styles['article-form__label']}>
        Short description
        <input
          className={`${styles['article-form__input']} ${errors.description ? styles['article-form__error'] : ''}`}
          type="text"
          {...register('description', { required: 'Short description is required' })}
          placeholder="Short description"
        />
        {errors.description && (
          <p className={styles['article-form__error-message']}>{errors.description.message}</p>
        )}
      </label>
      <label className={styles['article-form__label']}>
        Text
        <textarea
          className={`${styles['article-form__input']} ${styles['article-form__textarea']} ${errors.body ? styles['article-form__error'] : ''}`}
          type="text"
          {...register('body', { required: 'Text is required' })}
          placeholder="Text"
        />
        {errors.body && (
          <p className={styles['article-form__error-message']}>{errors.body.message}</p>
        )}
      </label>
      <label className={styles['article-form__label']}>
        Tags
        <div className={styles['article-form__tag-wrapper']}>
          {fields.map((field, index) => (
            <div key={field.id} className={styles['article-form__tag']}>
              <input
                className={`${styles['article-form__input']} ${styles['article-form__input--tag']}`}
                type="text"
                {...register(`tagList.${index}.name`)}
                placeholder="Tag"
              />
              <button
                type="button"
                onClick={() => {
                  if (fields.length > 1) {
                    remove(index);
                  }
                }}
                className={styles['article-form__delete-button']}
              >
                Delete
              </button>
              {index === fields.length - 1 && (
                <button
                  type="button"
                  onClick={() => {
                    if (getValues(`tagList.${fields.length - 1}.name`).trim() !== '') {
                      append({ name: '' });
                    }
                  }}
                  className={styles['article-form__add-button']}
                >
                  Add Tag
                </button>
              )}
            </div>
          ))}
        </div>
      </label>
      <button className={styles['article-form__submit-button']} type="submit">
        Send
      </button>
    </form>
  );
};

export default ArticleForm;
