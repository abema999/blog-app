import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { updateUser, clearStatus, clearError } from '../../stores/slices/userSlice';

import styles from './Profile.module.scss';

const Profile = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const isFirstRender = useRef(true);
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    clearErrors();
    const newData = {
      username: data.username,
      email: data.email,
      image: data.avatarImage,
    };
    if (data.newPassword) {
      newData.password = data.newPassword;
    }
    dispatch(updateUser(newData));
  };

  useEffect(() => {
    if (user) {
      setValue('username', user.username);
      setValue('email', user.email);
      setValue('avatarImage', user.image || '');
    }
  }, [user, setValue]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (status === 'success') {
      setShowSuccess(true);
    }
  }, [status]);

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
      setShowSuccess(false);
      dispatch(clearStatus());
      dispatch(clearError());
    };
  }, [dispatch]);

  return (
    <form className={styles['profile-form']} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles['profile-form__title']}>Edit Profile</h2>
      <fieldset className={styles['profile-form__fieldset']}>
        <label className={styles['profile-form__label']}>
          Username
          <input
            className={`${styles['profile-form__input']} ${
              errors.username ? styles['profile-form__error'] : ''
            }`}
            type="text"
            {...register('username', {
              required: 'Username is required',
              minLength: { value: 3, message: 'Min length is 3' },
              maxLength: { value: 20, message: 'Max length is 20' },
            })}
            placeholder="Username"
          />
          {errors.username && (
            <p className={styles['profile-form__error-message']}>{errors.username.message}</p>
          )}
        </label>
        <label className={styles['profile-form__label']}>
          Email address
          <input
            className={`${styles['profile-form__input']} ${
              errors.email ? styles['profile-form__error'] : ''
            }`}
            type="text"
            {...register('email', {
              required: 'Email address is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address',
              },
            })}
            placeholder="Email address"
          />
          {errors.email && (
            <p className={styles['profile-form__error-message']}>{errors.email.message}</p>
          )}
        </label>
        <label className={styles['profile-form__label']}>
          New password
          <input
            className={`${styles['profile-form__input']} ${
              errors.newPassword ? styles['profile-form__error'] : ''
            }`}
            type="password"
            {...register('newPassword', {
              minLength: { value: 6, message: 'Min length is 6' },
              maxLength: { value: 40, message: 'Max length is 40' },
            })}
            placeholder="New password"
          />
          {errors.newPassword && (
            <p className={styles['profile-form__error-message']}>{errors.newPassword.message}</p>
          )}
        </label>
        <label className={styles['profile-form__label']}>
          Avatar image (url)
          <input
            className={`${styles['profile-form__input']} ${
              errors.avatarImage ? styles['profile-form__error'] : ''
            }`}
            type="text"
            {...register('avatarImage', {
              pattern: {
                value: /^(https?:\/\/(?:www\.)?[^\s/$.?#].[^\s]*)$/i,
                message: 'Invalid URL',
              },
            })}
            placeholder="Avatar image"
          />
          {errors.avatarImage && (
            <p className={styles['profile-form__error-message']}>{errors.avatarImage.message}</p>
          )}
        </label>
      </fieldset>
      <fieldset className={styles['profile-form__fieldset']}>
        <button className={styles['profile-form__submit-button']} type="submit">
          Save
        </button>
        {showSuccess && (
          <div className={styles['profile-form__success-update-message']}>
            Profile updated successfully.
          </div>
        )}
      </fieldset>
    </form>
  );
};

export default Profile;
