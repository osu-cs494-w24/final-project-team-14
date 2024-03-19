import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
<<<<<<< Updated upstream
    reducer: { 
=======
    reducer: {
        user: userReducer,
>>>>>>> Stashed changes
        events: eventsReducer
    }
})

store.subscribe(() => {
    console.log("== updated store: ", store.getState())
})
export default store
