import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles['header']}>
      <div className={styles['header__container']}>
        <Link className={styles['header__link']} to={'/'}>
          Realworld Blog
        </Link>
        <div className={styles['header__wrapper']}>
          <button className={styles['header__sign-in']}>Sign In</button>
          <button className={styles['header__sign-up']}>Sign Up</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
