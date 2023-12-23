import { createSlice } from "@reduxjs/toolkit";

const commonSlice = createSlice({
    name: 'commonSlice',
    initialState: {
        loading: false,
        message: { type: '', content: '' },
    },
    reducers: {
        showLoading: (state) => {
            state.loading = true;
        },
        hideLoading: (state) => {
            state.loading = false;
        },
        successMessage: (state, action) => {
            state.message = { type: 'success', content: action.payload }
        },
        errorMessage: (state, action) => {
            state.message = { type: 'error', content: action.payload }
        },
        resetMessage: (state) => {
            state.message = { type: '', content: '' }
        },
        inforMessage: (state, action) => {
            state.message = { type: 'info', content: action.payload }
        },
    }
})

export default commonSlice.reducer
export const {
    showLoading,
    hideLoading,
    successMessage,
    resetMessage,
    errorMessage,
    inforMessage
} = commonSlice.actions