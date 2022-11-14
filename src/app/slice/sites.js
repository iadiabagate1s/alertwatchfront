import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import siteApi from "../services/sitesapi";

const initialState = {
    AllSites: [],
    status: "idle",
    error: null,
}

export const getAllSitesAsync = createAsyncThunk("sites/getAllSitesAsync", async (data,{ rejectWithValue }) => {
    try{

    const response = await siteApi.getAllSites();
    console.log('response all sites', response)

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

export const createSiteAsync = createAsyncThunk("sites/createSiteAsync", async (data,{ rejectWithValue }) => {
    try{
     
    const response = await siteApi.createSite(data);
    console.log('response create site', response)

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

export const updateSiteAsync = createAsyncThunk("sites/updateSiteAsync", async (data,{ rejectWithValue }) => {
    try{
      
    const response = await siteApi.updateSite(data);
    console.log('response update site', response)
     
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
export const deleteSiteAsync = createAsyncThunk("sites/deleteSiteAsync", async (data,{ rejectWithValue }) => {
    try{
       
    const response = await siteApi.deleteSite(data);
    console.log('response delete site', response)

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




export const siteSlice = createSlice({
    name: 'sites',
    initialState,
    reducers: {
        setUserLogin: (state, action) => {
            state.value = action.payload
        }
    },
    extraReducers: {
        [getAllSitesAsync.fulfilled]: (state, action) => {
            state.AllSites = action.payload
            state.status = "success"
        },
        [getAllSitesAsync.rejected]: (state, action) => {
            state.status = "failed"
            state.error = action.payload
        },
        [createSiteAsync.fulfilled]: (state, action) => {
            state.AllSites = action.payload
            state.status = "success"
        },
        [createSiteAsync.rejected]: (state, action) => {
            state.status = "failed"
            state.error = action.payload
        },
        [updateSiteAsync.fulfilled]: (state, action) => {
            state.AllSites = action.payload
            state.status = "success"
        },
        [updateSiteAsync.rejected]: (state, action) => {
            state.status = "failed"
            state.error = action.payload
        },
        [deleteSiteAsync.fulfilled]: (state, action) => {
            state.AllSites = action.payload
            state.status = "success"
        },
        [deleteSiteAsync.rejected]: (state, action) => {
            state.status = "failed"
            state.error = action.payload
        }





    }
});

//action creators are generated for each case reducer function
export const { setUserLogin } = siteSlice.actions;
export default siteSlice.reducer