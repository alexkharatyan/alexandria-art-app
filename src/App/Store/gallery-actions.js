import {createAsyncThunk} from '@reduxjs/toolkit';

// ADAPTERS //
const adaptedGalleryList = (adaptedData) => {
    const dataValues = Object.values(adaptedData);
    for (const [key, value] of Object.entries(adaptedData)) {
        for(const item of dataValues) {
            item.key = `${key}`;
        }
    }
    return dataValues;
}

export const fetchGalleryList = createAsyncThunk(
    'gallery/getGallery',
    async (thunkAPI) => {
        // debugger;
        try {
            const response = await fetch(
                'https://alex-react-project-default-rtdb.firebaseio.com/galleryItems.json')
            let data = await response.json();
            if (response.status === 200) {
                const newData = adaptedGalleryList(data);
                console.log('get data', newData);
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
                `https://alex-react-project-default-rtdb.firebaseio.com/galleryItems.json`,
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

export const updateGalleryFavoritesList = createAsyncThunk(
    'gallery/updateGallery',
    async ({key, isFavorite}, thunkAPI) => {
        try {
            const response = await fetch(
                `https://alex-react-project-default-rtdb.firebaseio.com/galleryItems/${key}.json`,
                {
                    method: "PATCH",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        key,
                        isFavorite
                    }),
                }
            );
            let data = await response.json();
            if (response.status === 200) {
                return {...data, key: key, isFavorite: isFavorite};
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
                `https://alex-react-project-default-rtdb.firebaseio.com/galleryItems/${key}.json`,
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
            console.log(data);
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
                `https://alex-react-project-default-rtdb.firebaseio.com/galleryItems/${key}.json`,
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
