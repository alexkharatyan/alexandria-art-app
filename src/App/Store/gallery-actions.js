import {createAsyncThunk} from '@reduxjs/toolkit';

// ADAPTERS //
const adaptedGalleryList = (adaptedData) => {
    let arr = [];
    for (const [key, value, userId] of Object.entries(adaptedData)) {
        const item = {...value, key: key, userId: userId};
        arr.push(item);
    }
    return arr;
}

const apiUrl = 'https://alex-react-project-default-rtdb.firebaseio.com';

export const fetchGalleryList = createAsyncThunk(
    'gallery/getGallery',
    async (thunkAPI) => {
        try {
            const response = await fetch(
                `${apiUrl}/galleryItems.json`)
            let data = await response.json();
            if (response.status === 200) {
                // debugger;
                const newData = adaptedGalleryList(data);
                // debugger;
                // console.log('get data', newData);
                return newData;
            } else {
                return data;
            }
        } catch (e) {
            // Handle HTTP errors since fetch won't.
            console.log("Error", e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const addGalleryList = createAsyncThunk(
    'gallery/addToGallery',
    async ({isFavorite, category, name, description, price, image}, thunkAPI) => {
        try {
            const response = await fetch(
                `${apiUrl}/galleryItems.json`,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        price,
                        image,
                        category,
                        isFavorite,
                        description
                    }),
                }
            );
            let data = await response.json();
            // debugger;
            if (response.status === 200) {
                return {data:data};
            } else {
                return {data:data};
            }
        } catch (e) {
            // Handle HTTP errors since fetch won't.
            console.log("Error", e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const editGalleryItem = createAsyncThunk(
    'gallery/editGalleryItem',
    async ({key, name, price, image, category, description, isFavorite}, thunkAPI) => {
        // debugger;
        try {
            const response = await fetch(
                `${apiUrl}/galleryItems/${key}.json`,
                {
                    method: "PATCH",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        key,
                        name,
                        price,
                        image,
                        category,
                        isFavorite,
                        description
                    }),
                }
            );
            let data = await response.json();
            // console.log(data);
            if (response.status === 200) {
                return {...data, key: key, name, price: price, image: image, category: category, description: description, isFavorite: isFavorite};
            } else {
                return {data:data};
            }
        } catch (e) {
            // Handle HTTP errors since fetch won't.
            console.log("Error", e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const deleteGalleryItem = createAsyncThunk(
    'gallery/deleteGalleryItem',
    async ({key}, thunkAPI) => {
        try {
            const response = await fetch(
                `${apiUrl}/galleryItems/${key}.json`,
                {
                    method: "DELETE",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        key,
                    }),
                }
            );
            let data = await response.json();
            if (response.status === 200) {
                return {...data, key: key};
            } else {
                return {data:data};
            }
        } catch (e) {
            // Handle HTTP errors since fetch won't.
            console.log("Error", e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const getUserFavoritesData = createAsyncThunk(
    'favoritesList/getUserFavoritesData',
    async ({userId}, thunkAPI) => {
        // debugger;
        try {
            const response = await fetch(
                `${apiUrl}/usersData/${userId}/favoritesList.json`,
            );
            let data = await response.json();
            if (response.status === 200) {
                // debugger;
                let newData = data === null ? [] : adaptedGalleryList(data);
                // debugger;
                return newData;
            } else {
                return {data:data};
            }
        } catch (e) {
            // Handle HTTP errors since fetch won't.
            console.log("Error", e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const addUserFavoritesData = createAsyncThunk(
    'favoritesList/addUserFavoritesData',
    async ({userId, isFavorite, key, name, price, image, category, description}, thunkAPI) => {
        try {
            const response = await fetch(
                `${apiUrl}/usersData/${userId}/favoritesList/${key}.json`,
                {
                    method: "PATCH",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        key,
                        isFavorite,
                        name,
                        price,
                        image,
                        category,
                        description
                    }),
                }
            );
            // debugger;
            let data = await response.json();
            if (response.status === 200) {
                // const newData = adaptedGalleryList(data);
                return {...data};
            } else {
                return {data:data};
            }
        } catch (e) {
            // Handle HTTP errors since fetch won't.
            console.log("Error", e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const deleteUserFavoritesData = createAsyncThunk(
    'favoritesList/deleteUserFavoritesData',
    async ({key, userId}, thunkAPI) => {
        try {
            const response = await fetch(
                `${apiUrl}/usersData/${userId}/favoritesList/${key}.json`,
                {
                    method: "DELETE",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.status === 200) {
                // {TODO: FILTER delete the item from existing list}
                // return {key: key};
            }
        } catch (e) {
            // Handle HTTP errors since fetch won't.
            console.log("Error", e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);
