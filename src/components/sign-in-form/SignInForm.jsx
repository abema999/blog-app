import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { loginUser } from '../../stores/slices/userSlice';

import styles from './SignInForm.module.scss';

const SignInForm = () => {
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <form className={styles['sign-in-form']} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles['sign-in-form__title']}>Sign In</h2>
      <fieldset className={styles['sign-in-form__fieldset']}>
        <label className={styles['sign-in-form__label']}>
          Email address
          <input
            className={`${styles['sign-in-form__input']} ${errors.email ? styles['sign-in-form__error'] : ''}`}
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
            <p className={styles['sign-in-form__error-message']}>{errors.email.message}</p>
          )}
        </label>
        <label className={styles['sign-in-form__label']}>
          Password
          <input
            className={`${styles['sign-in-form__input']} ${errors.password ? styles['sign-in-form__error'] : ''}`}
            type="password"
            {...register('password', {
              required: 'Password is required',
            })}
            placeholder="Password"
          />
          {errors.password && (
            <p className={styles['sign-in-form__error-message']}>{errors.password.message}</p>
          )}
        </label>
      </fieldset>
      <fieldset className={styles['sign-in-form__fieldset']}>
        <button className={styles['sign-in-form__submit-button']} type="submit">
          Login
        </button>
        {error && (
          <div className={styles['sign-in-form__server-error-message']}>
            {Object.entries(error).map(([key, message], i) => (
              <div key={i}>
                {key} {message}
              </div>
            ))}
          </div>
        )}
        <p className={styles['sign-in-form__sign-up']}>
          {'Don’t have an account? '}
          <Link className={styles['sign-in-form__link']} to={'/sign-up'}>
            Sign Up
          </Link>
          .
        </p>
      </fieldset>
    </form>
  );
};

export default SignInForm;
