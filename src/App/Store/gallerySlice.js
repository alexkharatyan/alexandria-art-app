import {createSlice} from '@reduxjs/toolkit';
import {fetchGalleryList} from '../Store/gallery-actions';

const initialAuthState = {
    galleryItems: null,
    galleryArrayList: [],
    loading: false,
    success: false,
    error: false
}

const gallerySlice = createSlice({
    name: 'gallery',
    initialState: initialAuthState,
    reducers: {

    },
    extraReducers: {
        [fetchGalleryList.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [fetchGalleryList.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.success = true;
            state.galleryItems = payload;
        },
        [fetchGalleryList.rejected]: (state) => {
            state.loading = false;
            state.success = false;
            state.error = true;
        },
    }
});

export const galleryActions = gallerySlice.actions;
export default gallerySlice.reducer;
