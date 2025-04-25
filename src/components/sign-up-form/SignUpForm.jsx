import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { addUser, clearError } from '../../stores/slices/userSlice';

import styles from './SignUpForm.module.scss';

const SignUpForm = () => {
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const password = watch('password');

  const onSubmit = (data) => {
    clearErrors();
    dispatch(
      addUser({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
    );
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

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
    <form className={styles['sign-up-form']} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles['sign-up-form__title']}>Create new account</h2>
      <fieldset className={styles['sign-up-form__fieldset']}>
        <label className={styles['sign-up-form__label']}>
          Username
          <input
            className={`${styles['sign-up-form__input']} ${errors.username ? styles['sign-up-form__error'] : ''}`}
            type="text"
            {...register('username', {
              required: 'Username is required',
              minLength: { value: 3, message: 'Min length is 3' },
              maxLength: { value: 20, message: 'Max length is 20' },
            })}
            placeholder="Username"
          />
          {errors.username && (
            <p className={styles['sign-up-form__error-message']}>{errors.username.message}</p>
          )}
        </label>
        <label className={styles['sign-up-form__label']}>
          Email address
          <input
            className={`${styles['sign-up-form__input']} ${errors.email ? styles['sign-up-form__error'] : ''}`}
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
            <p className={styles['sign-up-form__error-message']}>{errors.email.message}</p>
          )}
        </label>
        <label className={styles['sign-up-form__label']}>
          Password
          <input
            className={`${styles['sign-up-form__input']} ${errors.password ? styles['sign-up-form__error'] : ''}`}
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Min length is 6' },
              maxLength: { value: 40, message: 'Max length is 40' },
            })}
            placeholder="Password"
          />
          {errors.password && (
            <p className={styles['sign-up-form__error-message']}>{errors.password.message}</p>
          )}
        </label>
        <label className={styles['sign-up-form__label']}>
          Repeat Password
          <input
            className={`${styles['sign-up-form__input']} ${errors.repeatPassword ? styles['sign-up-form__error'] : ''}`}
            type="password"
            {...register('repeatPassword', {
              required: 'Please repeat your password',
              validate: (value) => value === password || `Passwords don't match`,
            })}
            placeholder="Password"
          />
          {errors.repeatPassword && (
            <p className={styles['sign-up-form__error-message']}>{errors.repeatPassword.message}</p>
          )}
        </label>
      </fieldset>
      <fieldset className={styles['sign-up-form__fieldset']}>
        <label
          className={`${styles['sign-up-form__agree']} ${errors.agree ? styles['sign-up-form__agree-error'] : ''}`}
        >
          <input
            className={styles['sign-up-form__agree-checkbox']}
            type="checkbox"
            {...register('agree', {
              required: true,
            })}
          />
          I agree to the processing of my personal information
          <span className={styles['sign-up-form__agree-custom-checkbox']}></span>
        </label>
      </fieldset>
      <fieldset className={styles['sign-up-form__fieldset']}>
        <button className={styles['sign-up-form__submit-button']} type="submit">
          Create
        </button>
        <p className={styles['sign-up-form__sign-in']}>
          {'Already have an account? '}
          <Link className={styles['sign-up-form__link']} to={'/sign-in'}>
            Sign In
          </Link>
          .
        </p>
      </fieldset>
    </form>
  );
};

export default SignUpForm;
