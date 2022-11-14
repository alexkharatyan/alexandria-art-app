import {createAsyncThunk} from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const ADMIN_LOCAL_ID = '9Z3ZMwqQ7hRhkHWx5rLOwb8gOET2';
export const getAccountInfo = createAsyncThunk(
  'account/getAccountInfo',
    async ({ idToken, photoUrl, displayName }, thunkAPI) => {
      try{
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
                      photoUrl,
                      displayName
                  }),
              }
          );
          let data = await response.json();
          if (response.status === 200) {
              const isAdmin = data.localId === ADMIN_LOCAL_ID;
              return { ...data, photoUrl: data.photoUrl, displayName: data.displayName, isAdmin: isAdmin };
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
