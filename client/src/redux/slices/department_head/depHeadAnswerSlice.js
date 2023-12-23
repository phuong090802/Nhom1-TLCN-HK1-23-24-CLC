import { createSlice } from "@reduxjs/toolkit";

const depHeadAnswerSlice = createSlice({
    name: 'depHeadAnswerSlice',
    initialState: {
        answerList: [],
        onInteractingAnswerId: '',
        totalPage: 0
    },
    reducers: {
        setAnswerList: (state, action) => {
            state.answerList = action.payload;
        },
        setTotalPage: (state, action) => {
            state.totalPage = action.payload
        },
        setOnInteractingAnswerId: (state, action) => {
            state.onInteractingAnswerId = action.payload
        }
    }
})

export default depHeadAnswerSlice.reducer
export const {
    setAnswerList,
    setTotalPage,
    setOnInteractingAnswerId
} = depHeadAnswerSlice.actions