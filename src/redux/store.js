import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import eventsReducer from './eventsSlice'


const store = configureStore({
    reducer: { 
        user: userReducer,
        events: eventsReducer
    }
})

store.subscribe(() => {
    console.log("== state ", store.getState())
})
export default store
