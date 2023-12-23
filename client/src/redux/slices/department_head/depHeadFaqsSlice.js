import { createSlice } from "@reduxjs/toolkit"

const depHeadFaqsSlice = createSlice({
    name: 'depHeadFaqsSlice',
    initialState: {
        faqList: [],
        onInteractingFaqId: '',
        totalPage: ''
    }, reducers: {
        setFaqList: (state, action) => {
            state.faqList = action.payload;
        },
        setTotalPage: (state, action) => {
            state.totalPage = action.payload
        },
        setOnInteractingFaqId: (state, action) => {
            state.onInteractingFaqId = action.payload
        }
    }
})

export default depHeadFaqsSlice.reducer
export const {
    setFaqList,
    setTotalPage,
    setOnInteractingFaqId
} = depHeadFaqsSlice.actions