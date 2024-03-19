import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'

const store = configureStore({
    // one argument : option
    reducer: { 
        user: userReducer
    }
})

store.subscribe(() => {
    console.log("== user ", store.getState())
})
export default store