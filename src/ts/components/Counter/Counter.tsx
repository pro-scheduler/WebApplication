import React, { Dispatch } from 'react';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import allActions from '../../actions';

const Counter = () => {
  const counter: number = useSelector((state: RootStateOrAny) => state.counterReducer);
  const dispatch: Dispatch<any> = useDispatch();

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
