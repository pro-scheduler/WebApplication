import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../../actions';

const Counter = () => {
  const counter = useSelector((state) => state.counterReducer);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Counter: {counter}</h1>
      <button onClick={() => dispatch(allActions.counterActions.decrement())}>
        Decrease Counter
      </button>
      <button onClick={() => dispatch(allActions.counterActions.increment())}>
        Increase Counter
      </button>
    </div>
  );
};

export default Counter;
