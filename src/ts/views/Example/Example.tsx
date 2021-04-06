import React from 'react';
import { useState } from 'react';
import CalendarIcon from '../../components/common/Icons/CalendarIcon';
import LocationIcon from '../../components/common/Icons/LocationIcon';
import PencilIcon from '../../components/common/Icons/PencilIcon';
import SurveyIcon from '../../components/common/Icons/SurveyIcon';
import WorldIcon from '../../components/common/Icons/WorldIcon';
import ArrowButton from '../../components/common/RoundButtons/ArrowButton';
import CalendarButton from '../../components/common/RoundButtons/CalendarButton';
import PlusButton from '../../components/common/RoundButtons/PlusButton';
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
      <ArrowButton onclick={() => console.log('Arrow clicked')} className="" />
      <p />
      <PlusButton onclick={() => console.log('Plus clicked')} className={styles.plus} />
      <p />
      <CalendarButton onclick={() => console.log('Calendar clicked')} className={styles.calendar} />
      <p />

      <PencilIcon />
      <CalendarIcon />
      <LocationIcon />
      <WorldIcon />
      <SurveyIcon />
      <p />
    </div>
  );
};

export default Example;
