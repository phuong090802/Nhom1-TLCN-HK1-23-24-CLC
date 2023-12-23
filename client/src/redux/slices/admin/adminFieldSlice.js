import { createSlice } from "@reduxjs/toolkit";

const adminFieldSlice = createSlice({
    name: 'adminFieldSlice',
    initialState: {
        fieldList: [],
        totalPage: 0
    }, reducers: {
        setField: (state, action) => {
            state.fieldList = action.payload
        },
        setTotalPage: (state, action) => {
            state.totalPage = action.payload
        }
    }
})

export default adminFieldSlice.reducer
export const {
    setField,
    setTotalPage
} = adminFieldSlice.actions