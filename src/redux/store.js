import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import eventsReducer from './eventsSlice'

const store = configureStore({
    // one argument : option
    reducer: { 
        user: userReducer,
        events: eventsReducer
    }
})

store.subscribe(() => {
    console.log("== user ", store.getState())
})
export default store