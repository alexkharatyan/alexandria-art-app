import {createSlice} from '@reduxjs/toolkit';

const initialCounterState = {
    counter: 0,
    showCounter: true
};
// Toolkit uses another package (Immer), which detects code like this (state.counter++)
// and automatically clones the existing state, creates a new state object,
// keeps all state that is not which are not editing and overwrights which we are editing in immutable way.

// The concept of immutability can help us to create new objects, making sure that we’re not changing the original value.
// In JavaScript, we have primitive types and reference types. Primitive types include numbers, strings, boolean, null, undefined.
// And reference types include objects, arrays and functions.
// The difference between those types is that the primitive types are immutable (or unchangeable), and the reference types are mutable (changeable).
// For example, the string type is immutable:

const counterSlice = createSlice({
    name: 'counter',
    initialState: initialCounterState,
    reducers: {
        increment(state){
            state.counter++;
        },
        decrement(state){
            state.counter--;
        },
        increaseBy(state, action){
            state.counter = state.counter + action.payload;
        },
        toggle(state){
            state.showCounter = !state.showCounter;
        }
    }
});
export const counterActions = counterSlice.actions;

export default counterSlice.reducer;
