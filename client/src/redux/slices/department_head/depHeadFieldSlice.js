import { createSlice } from "@reduxjs/toolkit";

const depHeadFieldSlice = createSlice({
    name: 'depHeadFieldSlice',
    initialState: {
        fieldList: [],
        totalPage: 0
    }, reducers: {
        setFieldList: (state, action) => {
            state.fieldList = action.payload;
        },
        setTotalPage: (state, action) => {
            state.totalPage = action.payload
        }
    }
})

export default depHeadFieldSlice.reducer
export const {
    setTotalPage,
    setFieldList
} = depHeadFieldSlice.actions