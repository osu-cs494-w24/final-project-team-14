import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'

import eventsReducer from './eventsSlice'


import eventsReducer from './eventsSlice'


const store = configureStore({
    reducer: { 
        user: userReducer,
        events: eventsReducer
    }
})

store.subscribe(() => {
    console.log("== user ", store.getState())
})
export default store
