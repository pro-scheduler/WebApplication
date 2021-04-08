import React, { Dispatch } from 'react';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import allActions from '../../actions';
import ActionButton from '../common/SubmitButton/ActionButton/ActionButton';
import styles from './Counter.module.css';

const Counter = () => {
  const counter: number = useSelector((state: RootStateOrAny) => state.counterReducer);
  const dispatch: Dispatch<any> = useDispatch();

  return (
    <div>
      <h1>Counter: {counter}</h1>
      <ActionButton
        text="Decrease Counter"
        onclick={() => dispatch(allActions.counterActions.decrement())}
        className={styles.counterButton}
      />
      <ActionButton
        text="Increase Counter"
        onclick={() => dispatch(allActions.counterActions.increment())}
        className={styles.counterButton}
      />
    </div>
  );
};

export default Counter;
