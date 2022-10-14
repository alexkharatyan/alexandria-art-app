import {createSlice} from '@reduxjs/toolkit';
import {addGalleryList, deleteGalleryItem, editGalleryItem, fetchGalleryList} from '../Store/gallery-actions';

const initialAuthState = {
    galleryItems: [],
    favoritesList: {},
    loading: false,
    success: false,
    error: false,
    addedLoading: false,
    addedSuccess: false,
    addedError: false,
    editedLoading: false,
    editedSuccess: false,
    editedError: false,
    deletedLoading: false,
    deletedSuccess: false,
    deletedError: false,
}

const gallerySlice = createSlice({
    name: 'gallery',
    initialState: initialAuthState,
    reducers: {

    },
    extraReducers: {
        //GET GALLERY ITEMS
        [fetchGalleryList.pending]: (state) => {
            state.loading = true;
            state.success = false;
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

        //ADD GALLERY ITEM
        [addGalleryList.pending]: (state) => {
            state.addedLoading = true;
            state.addedSuccess = false;
            state.addedError = null;
        },
        [addGalleryList.fulfilled]: (state, {payload}) => {
            state.addedLoading = false;
            state.addedSuccess = true;
            // state.galleryItems = payload;
        },
        [addGalleryList.rejected]: (state) => {
            state.addedLoading = false;
            state.addedSuccess = false;
            state.addedError = true;
        },

        //EDIT GALLERY ITEM
        [editGalleryItem.pending]: (state) => {
            state.editedLoading = true;
            state.editedSuccess = false;
            state.editedError = null;
        },
        [editGalleryItem.fulfilled]: (state, {payload}) => {
            state.editedLoading = false;
            state.editedSuccess = true;
            console.log('editing payload', payload);
            // state.galleryItems = payload;
        },
        [editGalleryItem.rejected]: (state) => {
            state.editedLoading = false;
            state.editedSuccess = false;
            state.editedError = true;
        },

        //DELETE GALLERY ITEM
        [deleteGalleryItem.pending]: (state) => {
            state.deletedLoading = true;
            state.deletedSuccess = false;
            state.deletedError = null;
        },
        [deleteGalleryItem.fulfilled]: (state, {payload}) => {
            state.deletedLoading = false;
            state.deletedSuccess = true;
            // state.galleryItems = payload;
        },
        [deleteGalleryItem.rejected]: (state) => {
            state.deletedLoading = false;
            state.deletedSuccess = false;
            state.editedError = true;
        },
    }
});

export const galleryActions = gallerySlice.actions;
export default gallerySlice.reducer;
