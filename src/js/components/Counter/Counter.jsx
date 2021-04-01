import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../../actions';

const Counter = () => {
  // useSelector() - extract data from the Redux store state, using a selector function
  const counter = useSelector((state) => state.counterReducer);

  // useDispatch() - returns a reference to the dispatch function from the Redux store
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Counter: {counter}</h1>
      {/* dispatch() - run reducer function by the store and calculate the new state */}
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
