import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userapi from "../services/userapi";

const initialState = {
    user: {},
    status: "idle",
    error: null,

};

export const getUsers = createAsyncThunk("users/getUsers", async () => {
    const response = await userapi.getAll();
    return response.data;
});
export const getUser = createAsyncThunk("users/getUser", async (username) => {
    const response = await userapi.get(username);
    return response.data;
});
export const createUser = createAsyncThunk("users/createUser", async (data) => {
    const response = await userapi.create(data);
    return response.data;
});
export const updatePWD = createAsyncThunk("users/updatePWD", async (data) => {
    const response = await userapi.updatePassword(data);
    return response.data;
});
export const updateUser = createAsyncThunk("users/updateUser", async (data) => {
    const response = await userapi.update(data);
    return response.data;
});
export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
    const response = await userapi.delete(id);
    return response.data;
});




export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            console.log('setUser', action.payload)
            state.value = action.payload
        },
        setError : (state, action) => {
            state.error = action.payload
        }
    },
    extraReducers: {
        [getUsers.pending]: (state, action) => {
            state.status = "loading";
        },
        [getUsers.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.user = action.payload;
        },
        [getUsers.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        },
        [getUser.pending]: (state, action) => {
            state.status = "loading";
        },
        [getUser.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.user = action.payload;
        },
        [getUser.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        },
        [createUser.pending]: (state, action) => {
            state.status = "loading";
        },
        [createUser.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.user = action.payload;
        },
        [createUser.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        },
        [updatePWD.pending]: (state, action) => {
            state.status = "loading";
        },
        [updatePWD.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.user = action.payload;
        },
        [updatePWD.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        },
        [updateUser.pending]: (state, action) => {
            state.status = "loading";
        },
        [updateUser.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.user = action.payload;
        },
        [updateUser.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        },
        [deleteUser.pending]: (state, action) => {
            state.status = "loading";
        },
        [deleteUser.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.user = action.payload;
        },
        [deleteUser.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        }

    }


})

// Action creators are generated for each case reducer function
export const {setUser,setError } = userSlice.actions

export default userSlice.reducer