import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {counterActions} from '../../Store/counterSlice';

export const Counter = () => {
    const dispatch = useDispatch();
    const counter = useSelector(state => state.counter.counter);
    const showCounter = useSelector(state => state.counter.showCounter);

    const increaseCounter = () => {
        dispatch(counterActions.increment());
    };

    const increaseCounterBy = () => {
        dispatch(counterActions.increaseBy(10)); // {type: UNIQUE_IDENTIFIER, payload: 10}
    };

    const decreaseCounter = () => {
        dispatch(counterActions.decrement());
    };

    const toggleCounterHandler = () => {
        dispatch(counterActions.toggle());
    };

    return (
        <>
            <div className="counter-box">
                {showCounter ? <h3>Counter: {counter}</h3> : null}
                <div className="counter-box__actions">
                    <button className="px-button-primary" onClick={increaseCounter}><span className="text">Increase</span></button>
                    <button className="px-button-primary" onClick={increaseCounterBy}><span className="text">IncreaseBy 10</span></button>
                    <button className="px-button-primary" onClick={decreaseCounter}><span className="text">Decrease</span></button>
                    <button className="px-button-primary" onClick={toggleCounterHandler}><span className="text">Toggle</span></button>
                </div>
            </div>
        </>

    )
};
