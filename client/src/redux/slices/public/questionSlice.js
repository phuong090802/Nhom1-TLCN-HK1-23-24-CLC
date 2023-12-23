import { createSlice } from "@reduxjs/toolkit";

const questionSlice = createSlice({
    name: 'questionSlice',
    initialState: {
        questionList: [],
        totalPage: 0,
    }, reducers: {
        setQuestionList: (state, action) => {
            state.questionList = action.payload
        },
        setTotalPage: (state, action) => {
            state.totalPage = action.payload
        },
    }
})

export default questionSlice.reducer
export const { setQuestionList, setTotalPage } = questionSlice.actions