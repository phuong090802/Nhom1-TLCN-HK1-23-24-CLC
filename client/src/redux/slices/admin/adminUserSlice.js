import { createSlice } from "@reduxjs/toolkit";

const adminUserSlice = createSlice({
    name: 'adminUserSlice',
    initialState: {
        userList: [],
        totalPage: 0,
        interactingUserId: '',
    },
    reducers: {
        setUserList: (state, action) => {
            state.userList = action.payload.items
            state.totalPage = action.payload.pages
        }
    }
})


export default adminUserSlice.reducer
export const {
    setUserList,
} = adminUserSlice.actions