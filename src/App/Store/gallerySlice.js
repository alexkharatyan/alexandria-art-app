import {createSlice} from '@reduxjs/toolkit';
import {
    addGalleryList,
    editGalleryItem,
    fetchGalleryList,
    deleteGalleryItem,
    getUserFavoritesData,
    addUserFavoritesData, deleteUserFavoritesData
} from '../Store/gallery-actions';

const initialAuthState = {
    galleryItems: [],
    userFavoritesList: [],
    galleryListLoading: false,
    galleryListSuccess: false,
    galleryListError: false,
    addedLoading: false,
    addedSuccess: false,
    addedError: false,
    editedLoading: false,
    editedSuccess: false,
    editedError: false,
    deletedLoading: false,
    deletedSuccess: false,
    deletedError: false,
    getUserFavoritesLoading: false,
    getUserFavoritesSuccess: false,
    getUserFavoritesError: false,
    addUserFavoritesLoading: false,
    addUserFavoritesSuccess: false,
    addUserFavoritesError: false,
    deleteUserFavoritesLoading: false,
    deleteUserFavoritesSuccess: false,
    deleteUserFavoritesError: false,
}

const gallerySlice = createSlice({
    name: 'gallery',
    initialState: initialAuthState,
    reducers: {},
    extraReducers: {
        //GET GALLERY ITEMS
        [fetchGalleryList.pending]: (state) => {
            state.galleryListLoading = true;
            state.galleryListSuccess = false;
            state.galleryListError = null;
        },
        [fetchGalleryList.fulfilled]: (state, {payload}) => {
            state.galleryListLoading = false;
            state.galleryListSuccess = true;
            state.galleryItems = payload;
        },
        [fetchGalleryList.rejected]: (state) => {
            state.galleryListLoading = false;
            state.galleryListSuccess = false;
            state.galleryListError = true;
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
            // console.log('editing payload', payload);
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
            state.deletedError = true;
        },

        // //UPDATE GALLERY ITEM
        [getUserFavoritesData.pending]: (state) => {
            state.getUserFavoritesLoading = true;
            state.getUserFavoritesSuccess = false;
            state.getUserFavoritesError = null;
        },
        [getUserFavoritesData.fulfilled]: (state, {payload}) => {
            state.getUserFavoritesLoading = false;
            state.getUserFavoritesSuccess = true;
            state.userFavoritesList = payload || [];
        },
        [getUserFavoritesData.rejected]: (state) => {
            state.getUserFavoritesLoading = false;
            state.getUserFavoritesSuccess = false;
            state.getUserFavoritesError = true;
        },

        // //UPDATE GALLERY ITEM
        [addUserFavoritesData.pending]: (state) => {
            state.addUserFavoritesLoading = true;
            state.addUserFavoritesSuccess = false;
            state.addUserFavoritesError = null;
        },
        [addUserFavoritesData.fulfilled]: (state, {payload}) => {
            state.addUserFavoritesLoading = false;
            state.addUserFavoritesSuccess = true;
            // NO NEED TO MODIFY HERE OR MODIFY BY PUSHING RIGHT HERE
            // state.userFavoritesList = payload;
        },
        [addUserFavoritesData.rejected]: (state) => {
            state.addUserFavoritesLoading = false;
            state.addUserFavoritesSuccess = false;
            state.addUserFavoritesError = true;
        },

        // //UPDATE GALLERY ITEM
        [deleteUserFavoritesData.pending]: (state) => {
            state.deleteUserFavoritesLoading = true;
            state.deleteUserFavoritesSuccess = false;
            state.deleteUserFavoritesError = null;
        },
        [deleteUserFavoritesData.fulfilled]: (state, {payload}) => {
            state.deleteUserFavoritesLoading = false;
            state.deleteUserFavoritesSuccess = true;
            // state.userFavoritesList = payload;
        },
        [deleteUserFavoritesData.rejected]: (state) => {
            state.deleteUserFavoritesLoading = false;
            state.deleteUserFavoritesSuccess = false;
            state.deleteUserFavoritesError = true;
        },
    }
});

export const galleryActions = gallerySlice.actions;
export default gallerySlice.reducer;
