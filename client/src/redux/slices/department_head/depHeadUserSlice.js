import { createSlice } from "@reduxjs/toolkit";

const depHeadUserSlice = createSlice({
    name: 'depHeadUserSlice',
    initialState: {
        userList: [],
        totalPage: 0,
        interactingUserId: ''
    },
    reducers: {
        setUserList: (state, action) => {
            state.userList = action.payload;
        },
        setTotalPage: (state, action) => {
            state.totalPage = action.payload;
        },
        setInteractingUserId: (state, action) => {
            state.interactingUserId = action.payload
        }
    }
})

export default depHeadUserSlice.reducer
export const {
    setUserList,
    setTotalPage,
    setInteractingUserId
} = depHeadUserSlice.actions