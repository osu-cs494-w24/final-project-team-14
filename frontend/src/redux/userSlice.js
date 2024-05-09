import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: "user",
    initialState: [],
    reducers: {
        loginUser(state, action) {
            return action.payload
        },
        logoutUser(state, action) {
            return {}
        }
    }
})

export default userSlice.reducer // reducer's' 아님
export const { loginUser, logoutUser } = userSlice.actions
export const selectUser = userSlice.selectSlice