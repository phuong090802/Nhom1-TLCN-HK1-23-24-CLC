import { createSlice } from "@reduxjs/toolkit";

const counsellorQuestionSlice = createSlice({
    name: 'counsellorQuestionSlice',
    initialState: {
        questionList: [],
        totalPage: 0,
        interactingQuestionId: ''
    }, reducers: {
        setQuestionList: (state, action) => {
            state.questionList = action.payload;
        },
        setTotalPage: (state, action) => {
            state.totalPage = action.payload;
        },
        setInteractingQuestionId: (state, action) => {
            state.interactingQuestionId = action.payload
        }

    }
})

export default counsellorQuestionSlice.reducer

export const {
    setTotalPage,
    setQuestionList,
    setInteractingQuestionId
} = counsellorQuestionSlice.actions