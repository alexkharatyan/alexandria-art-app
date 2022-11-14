import {createSlice} from '@reduxjs/toolkit';
import {resetPassword, signInUser, signupUser, getUserInfo} from '../Store/auth-actions';
import {getAccountInfo} from '../Components/Profile/account-actions';

// initialize idToken from local storage
const idToken = localStorage.getItem('idToken')
    ? localStorage.getItem('idToken')
    : null

const initialAuthState = {
    idToken,
    isAdmin: false,
    userInfo: null,
    userSuccess: false,
    userLoading: false,
    userError: null,
    signUpSuccess: false,
    signUpLoading: false,
    signUpError: false,
    signInLoading: false,
    getAccountInfoError: '',
    getAccountInfoSuccess: false,
    getAccountInfoLoading: false,
    updateError: null,
    resetPassSuccess: false,
    resetPassLoading: false,
    resetPassError: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('idToken') // deletes token from storage
            state.signInLoading = false;
            state.signInError = null;
            state.signInSuccess = null;
            state.userInfo = null;
            state.idToken = null;
        },
        //TODO: in case
        addItemsTo(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find((item) => item.id === state.id);
            if(existingItem) {
                state.items.push({
                    itemId: newItem.id,
                    price: 0,
                    quantity: newItem.quantity,
                    totalPrice: newItem.totalPrice,
                    name: newItem.name,
                })
            } else {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }
        },
        removeItems(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            if(existingItem.quantity === 1) {
                state.items.filter(item => item.id !== id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice + existingItem.price;
            }
        }
    },
    extraReducers: {
        //signUpUser
        [signupUser.pending]: (state) => {
            state.signUpLoading = true;
            state.signInSuccess = false;
            state.signUpError = null;
        },
        [signupUser.fulfilled]: (state, { payload }) => {
            state.signUpLoading = false;
            state.signUpSuccess = true; // successful
            state.userInfo = payload;
            state.idToken = payload.idToken
        },
        [signupUser.rejected]: (state, { payload }) => {
            state.signUpSuccess = false;
            state.signUpLoading = false;
            state.signUpError = payload;
        },

        //signInUser
        [signInUser.pending]: (state) => {
            state.signInSuccess = false;
            state.signInLoading = true;
            state.signInError = null;
            state.isAdmin = false;
        },
        [signInUser.fulfilled]: (state, { payload }) => {
            state.signInLoading = false;
            state.signInSuccess = true; // successful
            state.userInfo = payload;
            state.idToken = payload.idToken;
            state.isAdmin = payload.isAdmin;
        },
        [signInUser.rejected]: (state, { payload }) => {
            state.signInLoading = false;
            state.signInSuccess = false;
            state.signInError = payload;
            state.isAdmin = false;
        },

        //resetPassword
        [resetPassword.pending]: (state) => {
            state.resetPassLoading = true;
            state.resetPassError = null;
        },
        [resetPassword.fulfilled]: (state, { payload }) => {
            state.resetPassLoading = false;
            state.resetPassSuccess = true; // successful
            state.userInfo = payload;
        },
        [resetPassword.rejected]: (state, { payload }) => {
            state.resetPassSuccess = false;
            state.resetPassLoading = false;
            state.userInfo = payload;
        },

        // get account info
        [getUserInfo.pending]: (state) => {
            state.userSuccess = false;
            state.userLoading = true;
            state.userError = null;
        },
        [getUserInfo.fulfilled]: (state, { payload }) => {
            state.userLoading = false;
            state.userSuccess = true;
            state.userInfo = payload.users[0];
        },
        [getUserInfo.rejected]: (state, { payload }) => {
            state.userSuccess = false;
            state.userLoading = false;
            state.userError = payload;
        },

        //account info update
        [getAccountInfo.pending]: (state) => {
            state.getAccountInfoSuccess = false;
            state.getAccountInfoLoading = true;
            state.getAccountInfoError = null;
        },
        [getAccountInfo.fulfilled]: (state, { payload }) => {
            state.getAccountInfoLoading = false;
            state.getAccountInfoSuccess = true;
            state.userInfo = payload;
            state.isAdmin = payload.isAdmin
        },
        [getAccountInfo.rejected]: (state, { payload }) => {
            state.getAccountInfoSuccess = false;
            state.getAccountInfoLoading = false;
            state.getAccountInfoError = payload;
        },
    },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
