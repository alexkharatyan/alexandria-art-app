import {createSlice} from '@reduxjs/toolkit';
import {updateGalleryList} from '../Store/gallery-actions';

const initialCartState = {
    items: [],
    selectedItems: {},
    totalQuantity: 0,
    totalPrice: 0,
    isFavorite: false,
    pending: false,
    error: false,
    success: false,
    favoriteLoading: false,
    favoriteError: false,
    favoriteSuccess: false,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find((item) => item.id === newItem.id);
            console.log('existingItem', existingItem);
            // console.log('existingItem', existingItem);
            if (!existingItem ) {
                state.totalQuantity++;
                state.selectedItems[newItem.id] = newItem;
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    description: newItem.description,
                    name: newItem.name,
                    image: newItem.image,
                    isFavorite: newItem.isFavorite
                });
            } else {
                delete state.selectedItems[newItem.id];
                state.items = state.items.filter(item => item.id !== existingItem.id);
                state.totalQuantity--;
                // existingItem.totalPrice = existingItem.totalPrice - newItem.price;
            }
            console.log(state.items);
        },
        updateGalleryListFavorites(state, action) {
            console.log('favorites=====', action.payload);

        },
        removeItemFromCart(state, action) {
            const id = action.payload;
            // const existingItem = state.items.find(item => item.id === id);
            delete state.selectedItems[id];
            state.items = state.items.filter(item => item.id !== id);
            state.totalQuantity--;
            // } else {
            //     existingItem.totalPrice = existingItem.totalPrice + existingItem.price;
            // }
        }
    },
    extraReducers: {
        [updateGalleryList.pending]: (state) => {
            state.favoriteLoading = true;
            state.favoriteError = null;
            state.favoriteSuccess = false;
        },
        [updateGalleryList.fulfilled]: (state, { payload }) => {
            state.favoriteLoading = false;
            state.favoriteSuccess = true;
            state.selectedItems = payload;
        },
        [updateGalleryList.rejected]: (state, { payload }) => {
            state.favoriteLoading = false;
            state.favoriteError = true;
            state.favoriteSuccess = false;
        },
    }
});
export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
