import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice';
import galleryReducer from './gallerySlice';
import cartReducer from './cartSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        gallery: galleryReducer,
        cart: cartReducer
    }
});

export default store;
