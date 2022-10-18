import {createAsyncThunk} from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

export const signupUser = createAsyncThunk(
    "user/signupUser",
    async ({ email, password, returnSecureToken }, thunkAPI) => {
        try {
            const response = await fetch(
                "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC8MgaNDTIsyoaELRhpLs2XvY9dQkVQ1lA",
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                        returnSecureToken,
                    }),
                }
            );

            let data = await response.json();
            // console.log("data", data);
            if (response.status === 200) {
                // store user's token in local storage
                localStorage.setItem('idToken', data.idToken);
                return { ...data, email: email };
            } else {
                toast.error(data.error.message);
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e) {
            console.log("Error", e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const signInUser = createAsyncThunk(
    "user/signinUser",
    async ({ displayName, email, password, returnSecureToken }, thunkAPI) => {
        try {
            const response = await fetch(
                "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC8MgaNDTIsyoaELRhpLs2XvY9dQkVQ1lA",
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        displayName,
                        email,
                        password,
                        returnSecureToken,
                    }),
                }
            );
            let data = await response.json();
            // console.log("data", data);
            if (response.status === 200) {
                localStorage.setItem("idToken", data.idToken);
                toast.success('Successfully signed in');
                return { ...data, displayName: displayName, email: email };
            } else {
                toast.error(data.error.message);
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e) {
            console.log("Error", e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const resetPassword = createAsyncThunk(
    'user/newPassword',
    async ({password, returnSecureToken, idToken}, thunkAPI) => {
        try {
            const response = await fetch(
                "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC8MgaNDTIsyoaELRhpLs2XvY9dQkVQ1lA",
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        idToken,
                        password,
                        returnSecureToken,
                    }),
                }
            );
            let data = await response.json();
            // console.log("data", data);
            if (response.status === 200) {
                // return { ...data, password: password};
                toast.success('Successfully updated');
                console.log('reset ok');
            } else {
                // return thunkAPI.rejectWithValue(data);
            }
        } catch (e) {
            console.log("reset Error", e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const getUserInfo = createAsyncThunk(
    'user/getUserInfo',
    async ({ idToken, photoUrl, displayName }, thunkAPI) => {
        try{
            const response = await fetch(
                "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyC8MgaNDTIsyoaELRhpLs2XvY9dQkVQ1lA",
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        idToken,
                    }),
                }
            );
            let data = await response.json();
            // console.log("data", data);
            if (response.status === 200) {
                return { ...data, photoUrl: data.photoUrl, displayName: data.displayName };
            } else {
                toast.error(data.error.message);
                return thunkAPI.rejectWithValue(data);
            }
        }
        catch (e) {
            console.log("Error", e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);
