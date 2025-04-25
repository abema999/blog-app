import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { logoutUser } from '../../stores/slices/userSlice';

import styles from './Header.module.scss';

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <header className={styles['header']}>
      <div className={styles['header__container']}>
        <Link className={styles['header__link']} to={'/'}>
          Realworld Blog
        </Link>
        {user ? (
          <div className={styles['header__wrapper']}>
            <Link className={styles['header__create-article']} to={'/new-article'}>
              Create article
            </Link>
            <div className={styles['header__profile']}>
              <Link className={styles['header__username']} to={'/profile'}>
                {user.username}
              </Link>
              <Link className={styles['header__userpic']} to={'/profile'}>
                <img
                  className={styles['header__userpic']}
                  src={user.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'}
                  alt={user.username}
                />
              </Link>
            </div>
            <button className={styles['header__log-out']} onClick={handleLogout}>
              Log Out
            </button>
          </div>
        ) : (
          <div className={styles['header__wrapper']}>
            <Link className={styles['header__sign-in']} to={'/sign-in'}>
              Sign In
            </Link>
            <Link className={styles['header__sign-up']} to={'/sign-up'}>
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
