import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../slice/user'
import authReducer from '../slice/auth'
import userSiteReducer from '../slice/usersites'
import siteReducer from '../slice/sites'


const reducer = {
    user: userReducer,
    auth : authReducer,
    usersites : userSiteReducer,
    sites : siteReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;