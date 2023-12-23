import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router"
import { errorMessage, hideLoading, showLoading, successMessage } from "../../../redux/slices/commonSlice"
import { data } from "autoprefixer"
import { resetPassword } from "../../../service/auth_service/authenticate"

const ResetPassword = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { requestId } = useParams()



    const initInfor = {
        password: '',
        confirmPassword: ''
    }

    const [resetPasswordData, setResetPasswordData] = useState(initInfor)

    const inputOnchange = (e) => {
        setResetPasswordData({
            ...resetPasswordData,
            [e.target.name]: e.target.value
        })
    }

    const handleResetPassword = async () => {
        console.log(resetPasswordData);
        dispatch(showLoading())

        try {
            const data = { id: requestId, data: resetPasswordData }
            const response = await resetPassword(data)
            if (response.success) {
                dispatch(successMessage(response?.message ? response.message : 'Đặt lại mật khẩu thành công'));
                navigate('/login')
            } else {
                dispatch(errorMessage(response?.message ? response.message : 'Có lỗi xảy ra'))
            }
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Có lỗi xảy ra'))
        } finally {
            dispatch(hideLoading())
        }
    }

    return <div className="w-full h-[70vh] flex justify-center">
        <div className="min-w-[350px] max-w-[500px] border bg-white p-5 rounded-lg self-center">
            <h1 className="font-bold text-2xl mb-5 text-my_red">Đặt lại mật khẩu</h1>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Mật khẩu</label>
            <input type="password"
                name="password"
                id="password"
                onChange={e => inputOnchange(e)}
                value={resetPasswordData.password}
                className="mt-1 p-2 w-full rounded-md border-2 border-primary text-sm" />
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600 mt-1">Xác nhận mật khẩu</label>
            <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                onChange={e => inputOnchange(e)}
                value={resetPasswordData.confirmPassword}
                className="mt-1 p-2 w-full rounded-md border-2 border-primary text-sm" />
            <button
                className=" duration-500 w-full bg-[#19376D] hover:bg-[#466bb0] text-white p-2 rounded-md hover:bg-secondary font-roboto mt-5"
                onClick={handleResetPassword}
            >Đặt lại mật khẩu</button>
        </div>
    </div>
}

export default ResetPassword