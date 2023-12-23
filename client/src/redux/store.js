import { configureStore } from "@reduxjs/toolkit";
import commonSlice from "./slices/commonSlice";
import authSlice from "./slices/authSlice";
import adminUserSlice from "./slices/admin/adminUserSlice";
import adminDepSlice from "./slices/admin/adminDepSlice";
import adminFieldSlice from "./slices/admin/adminFieldSlice";
import depHeadUserSlice from "./slices/department_head/depHeadUserSlice";
import depHeadFieldSlice from "./slices/department_head/depHeadFieldSlice";
import questionSlice from "./slices/public/questionSlice";
import counsellorQuestionSlice from "./slices/counsellor/counsellorQuestionSlice";
import depHeadAnswerSlice from "./slices/department_head/depHeadAnswerSlice";
import DepartmentHeadFaqs from "../pages/department_head/department_head_faqs/DepartmentHeadFaqs";
import depHeadFaqsSlice from "./slices/department_head/depHeadFaqsSlice";

const store = configureStore({
    reducer: {
        common: commonSlice,
        auth: authSlice,

        adminUser: adminUserSlice,
        adminDep: adminDepSlice,
        adminField: adminFieldSlice,

        depHeadUser: depHeadUserSlice,
        depHeadField: depHeadFieldSlice,
        depHeadAnswer: depHeadAnswerSlice,
        depHeadFaq: depHeadFaqsSlice,

        counQuestion: counsellorQuestionSlice,

        question: questionSlice
    }
})

export default store