import {createAsyncThunk} from '@reduxjs/toolkit';

export const fetchGalleryList = createAsyncThunk(
    'gallery/getGallery',
    async (thunkAPI) => {
        try {
            const response = await fetch(
                'https://alex-react-project-default-rtdb.firebaseio.com/galleryItems.json')
            let data = await response.json();
            if (response.status === 200) {
                return Object.values(data);
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

export const updateGalleryList = createAsyncThunk(
    'gallery/updateGallery',
    async ({id, isFavorite}, thunkAPI) => {
        try {
            const response = await fetch(
                `https://alex-react-project-default-rtdb.firebaseio.com/galleryItems/${id}.json`,
                {
                    method: "PATCH",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id,
                        isFavorite
                    }),
                }
            );
            let data = await response.json();
            if (response.status === 200) {
                return {...data, id: id, isFavorite: isFavorite};
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
