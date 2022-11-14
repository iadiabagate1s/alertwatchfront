import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserSiteApi from "../services/usersiteapi";


const initialState = {
    AllUsersSites: [],
    currentUserSites: [],
    status: "idle",
    error: null,
}

export const getAllSitesByUserAsync = createAsyncThunk("usersites/getAllSitesByUserAsync", async (data,{ rejectWithValue }) => {
    try{
    
    const response = await UserSiteApi.getAllSitesByUser(data);
    console.log('response site by user', response)
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

export const getAllUsersAndSitesAsync = createAsyncThunk("usersites/getAllUsersAndSitesAsync", async (data,{ rejectWithValue }) => {
    try{
        
    
    const response = await UserSiteApi.getAllUsersAndSites();

 
    console.log('response all users and sites', response)

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

export const linkUserSiteAsync = createAsyncThunk("usersites/linkUserSiteAsync", async (data,{ rejectWithValue }) => {
    try{
     
    const response = await UserSiteApi.linkUserSite(data.username, data.site);
    console.log('response link user site', response)
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

export const unlinkUserSiteAsync = createAsyncThunk("usersites/unlinkUserSiteAsync", async (data,{ rejectWithValue }) => {
    try{
        console.log('unlink user site async')
    const response = await UserSiteApi.unlinkUserSite(data.username, data.site);

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


export const userSiteSlice = createSlice({
    name: 'usersites',
    initialState,
    reducers: {
        setUserLogin: (state, action) => {
            state.value = action.payload
        }
    },
    extraReducers: {
        [getAllSitesByUserAsync.fulfilled]: (state, action) => {
      
            state.status = "fulfilled";
            state.currentUserSites = action.payload;
            state.error = null
        },
        [getAllSitesByUserAsync.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
            state.currentUserSites = null
        }
        ,
        [getAllUsersAndSitesAsync.fulfilled]: (state, action) => {
          
            state.status = "fulfilled";
            state.AllUsersSites = action.payload;
            state.error = null
        },
        [getAllUsersAndSitesAsync.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
            state.AllUsersSites = null
        },
        [linkUserSiteAsync.fulfilled]: (state, action) => {
    
            state.status = "fulfilled";
            state.error = null
        },
        [linkUserSiteAsync.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        },
        [unlinkUserSiteAsync.fulfilled]: (state, action) => {
         
            state.status = "fulfilled";
            state.error = null
        },
        [unlinkUserSiteAsync.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        }


    }
});

//action creators are generated for each case reducer function
export const { setUserLogin } = userSiteSlice.actions;
export default userSiteSlice.reducer