import React from 'react';
import { useState } from 'react';
import SwitchButton from '../../components/common/SwitchButton/SwitchButton';
import Counter from '../../components/Counter/Counter';
import UserLogin from '../../components/UserLogin/UserLogin';

import styles from './Example.module.css';

const Example = () => {
  const [showText, setShowText] = useState(true);

  return (
    <div className={styles.example}>
      <UserLogin />
      <Counter />
      <SwitchButton
        className={styles.switchButton}
        onChange={() => setShowText(!showText)}
        title={'Example switch'}
      />
      {showText ? <p>Switch on</p> : <p>Switch off</p>}
    </div>
  );
};

export default Example;
