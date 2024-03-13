import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    // one argument : option
    reducer: { 
    }
})

store.subscribe(() => {
    console.log("== updated store: ", store.getState())
})
export default store