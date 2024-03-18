import { configureStore } from '@reduxjs/toolkit'

import eventsReducer from './eventsSlice'


const store = configureStore({
    reducer: { 
        events: eventsReducer
    }
})

store.subscribe(() => {
    console.log("== updated store: ", store.getState())
})
export default store
