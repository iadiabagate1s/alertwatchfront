import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authapi from "../services/authapi";

const initialState = {
    user: {},
    status: "idle",
    error: null,
}

export const loginAsync = createAsyncThunk("auth/login", async (data,{ rejectWithValue }) => {
    try{
    const response = await authapi.login(data);
    return response.data;
    } catch (err) {
        console.log('err in login', err)
        let respObj = 
        {status_code: err.response.status,
        message : err.response.data.message
    }

        return rejectWithValue(respObj)

    }
}
);
export const forgotPasswordAsync = createAsyncThunk("auth/forgotpassword", async (data,{ rejectWithValue }) => {
    try{
    const response = await authapi.forgotPassword(data);
    return response.data;
    }
    catch (err) {
        console.log('err in forgotpassword', err)
        let respObj =
        {status_code: err.response.status,
        message : err.response.data.message
    }

        return rejectWithValue(respObj)

    }
}
);


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserLogin: (state, action) => {
            state.value = action.payload
        }
    },
    extraReducers: {
        [loginAsync.pending]: (state, action) => {
       
            state.status = "loading";
        },
        [loginAsync.fulfilled]: (state, action) => {
            state.status = "fulfilled";
            state.user = action.payload;
            state.error = null
        },
        [loginAsync.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
            state.user = null
        },
        [forgotPasswordAsync.pending]: (state, action) => {
            state.status = "loading";
        },
        [forgotPasswordAsync.fulfilled]: (state, action) => {
            state.status = "fulfilled";
            state.user = action.payload;
            state.error = null
        }
        ,
        [forgotPasswordAsync.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
            state.user = null
        }
    }
});

//action creators are generated for each case reducer function
export const { setUserLogin } = authSlice.actions;
export default authSlice.reducer
