import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice';
import galleryReducer from './gallerySlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        gallery: galleryReducer,
    }
});

export default store;
