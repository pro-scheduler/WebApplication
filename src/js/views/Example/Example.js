import React from 'react';
import Counter from '../../components/Counter/Counter'
import UserLogin from '../../components/UserLogin/UserLogin'

import styles from './Example.module.css';

const Example = () => {
  return (
    <div className={styles.example}>
      <UserLogin/>
      <Counter/>
    </div>
  );
}

export default Example;
