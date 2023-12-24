import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css";
import Layout from "./features/layout";
import Auth from "./pages/public/auth";
import { useDispatch, useSelector } from "react-redux";
import { loadingSelector, messageSelector } from "./redux/selectors/commonSelector";
import Spinner from "./components/spinner";
import ToastMessage from "./components/toast_message/ToastMessage";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { resetMessage } from "./redux/slices/commonSlice";
import AdminRoute from "./routes/AdminRoute";
import SupervisorRoute from "./routes/Supervisor";
import DepartmentHeadRoute from "./routes/DepartmentHead";
import CounsellorRoute from "./routes/Counsellor";
import UserRoute from "./routes/User";
import AdminHome from "./pages/admin/admin_home";
import SupervisorHome from "./pages/supervisor/supervisor_home";
import DepartmentHeadHome from "./pages/department_head/department_head_home";
import CounsellorHome from "./pages/counsellor/counsellor_home";
import UserHome from "./pages/user/user_home";
import DepartmentHeadUser from "./pages/department_head/department_head_user";
import AdminUser from "./pages/admin/admin_user";
import AdminDepartment from "./pages/admin/admin_department";
import AdminField from "./pages/admin/admin_field";
import DepartmentHeadField from "./pages/department_head/department_head_field";
import CounsellorQuestion from "./pages/counsellor/counsellor_question";
import PublicHome from "./pages/public/public_home";
import UserCreateQuestion from "./pages/user/user_create_question";
import QuestionDetail from "./pages/public/question_detail";
import DepartmentHeadAnswer from "./pages/department_head/department_head_answer";
import ResetPassword from "./pages/public/reset_password";
import ProtectedRoute from "./routes/ProtectedRoute";
import Profile from "./pages/user/profile";
import FaqsPage from "./pages/public/faq";
import DepartmentHeadFaqs from "./pages/department_head/department_head_faqs";
import CounsellorFeedback from "./pages/counsellor/counsellor_feedback";
import UserMessage from "./pages/user/user_message";
import CounsellorList from "./pages/public/counsellor_list/CounsellorList";

function App() {
  const dispatch = useDispatch()
  const loading = useSelector(loadingSelector)
  const message = useSelector(messageSelector)

  useEffect(() => {
    const toastConfig = {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    }
    if (message.type === '') return
    else if (message.type === 'error') {
      toast.error(message.content, toastConfig);
    }
    else if (message.type === 'success') {
      toast.success(message.content, toastConfig);
    }
    else if (message.type === 'info') {
      toast.info(message.content, toastConfig);
    }
    dispatch(resetMessage())
  }, [message])
  return (
    <>
      {loading && <Spinner></Spinner>}
      <ToastMessage></ToastMessage>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/counsellorlist" element={<CounsellorList />} />
            <Route path="/login" element={<Auth />}></Route>
            <Route path="/login/:tog" element={<Auth />}></Route>
            <Route path="/" element={<PublicHome />} />
            <Route path="/question">
              <Route path=":questionId" element={<QuestionDetail />} />
            </Route>
            <Route path="/password/reset">
              <Route path=":requestId" element={<ResetPassword />} />
            </Route>
            <Route path="/faqs" element={<FaqsPage />} />

            {/* ProtectedRoute */}
            <Route element={<ProtectedRoute />} >
              <Route path="/profile" element={<Profile />} />
            </Route>

            {/* adminRoute */}
            <Route path="/admin" element={<AdminRoute />}>
              <Route path="home" element={<AdminHome />} />
              <Route path="users" element={<AdminUser />} />
              <Route path="departments" element={<AdminDepartment />} />
              <Route path="fields" element={<AdminField />} />
            </Route>

            {/* supervisorRoute */}
            <Route path="/supervisor" element={<SupervisorRoute />}>
              <Route path="home" element={<SupervisorHome />} />
            </Route>

            {/* departmentHeadRoute */}
            <Route path="/department-head" element={<DepartmentHeadRoute />}>
              <Route path="home" element={<DepartmentHeadHome />} />
              <Route path="users" element={<DepartmentHeadUser />} />
              <Route path="fields" element={<DepartmentHeadField />} />
              <Route path="questions" element={<CounsellorQuestion />} />
              <Route path="answers" element={<DepartmentHeadAnswer />} />
              <Route path="faqs" element={<DepartmentHeadFaqs />} />
            </Route>

            {/* counsellorRoute */}
            <Route path="/counsellor" element={<CounsellorRoute />}>
              <Route path="home" element={<CounsellorHome />} />
              <Route path="questions" element={<CounsellorQuestion />} />
              <Route path="feedback" element={<CounsellorFeedback />} />
              <Route path="message" element={<UserMessage />} />
            </Route>

            {/* userRoute */}
            <Route path="/user" element={<UserRoute />}>
              <Route path="home" element={<UserHome />} />
              <Route path="message" element={<UserMessage />} />
              <Route path="question/create" element={<UserCreateQuestion />} />
            </Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
