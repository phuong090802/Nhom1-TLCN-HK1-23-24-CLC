import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'authSlice',
    initialState: {
        user: null,
        isAuthenticated: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
            state.isAuthenticated = true
        },
        deleteUser: (state) => {
            state.user = null
            state.isAuthenticated = false
        }
    }
})

export default authSlice.reducer
export const {
    setUser,
    deleteUser
} = authSlice.actions