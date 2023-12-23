import { createSlice } from "@reduxjs/toolkit";

const adminDepSlice = createSlice({
    name: 'adminDepSlice',
    initialState: {
        depList: [],
        totalPage: 0,
        interactingDepId: ''
    },
    reducers: {
        setDep: (state, action) => {
            state.depList = action.payload.items
            state.totalPage = action.payload.pages
        },
        setInteractingDepId: (state, action) => {
            state.interactingDepId = action.payload
        }
    }
})

export default adminDepSlice.reducer
export const {
    setDep, 
    setInteractingDepId
} = adminDepSlice.actions