import { useEffect, useState } from "react"
import LoginForm from "../../../features/login_form"
import bg from '../../../assets/image/auth_background.png'
import { getUser, login, regsiter, requestResetPassword } from '../../../service/auth_service/authenticate.js'
import { useDispatch, useSelector } from "react-redux"
import { errorMessage, hideLoading, showLoading, successMessage } from "../../../redux/slices/commonSlice.js"
import { addCookie } from "../../../utils/cookie.js"
import { setUser } from "../../../redux/slices/authSlice.js"
import { useNavigate, useParams } from "react-router-dom"
import { getForwardLink } from "../../../utils/route.js"
import { isAuthenticatedSelector, userSelector } from "../../../redux/selectors/authSelector.js"
import RegisterForm from "../../../features/register_form"
import ForgotPasswordForm from "../../../features/forgot_password_form"

const Auth = () => {
    let { tog } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [toggle, setToggle] = useState(tog ? 2 : 1)
    const isAuthen = useSelector(isAuthenticatedSelector)
    const user = useSelector(userSelector)
    const [isLoad, setIsLoad] = useState(false)

    useEffect(() => {
        getUserData()
        // if (isAuthen)
        //     navigate(getForwardLink(user.role))
    }, [])

    useEffect(() => {
        if (isAuthen)
            setTimeout(() => {
                navigate(getForwardLink(user.role))
            }, 1000)
    }, [isAuthen])


    const getUserData = async () => {
        if (isAuthen) {
            return
        }
        dispatch(showLoading())
        try {
            const res = await getUser()
            dispatch(setUser(res.data))
        } catch (error) {

        } finally {
            dispatch(hideLoading())
        }
    }


    const handleResetPassword = async (data) => {
        dispatch(showLoading())
        try {
            const res = await requestResetPassword(data)
            dispatch(successMessage('Yêu cầu đặt lại mật khẩu thành công. Vui lòng kiểm tra email'))
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Có lỗi xảy ra'))
        }
        finally {
            dispatch(hideLoading())
        }

    }
    return (
        <div className='flex  items-center justify-between h-screen grid-cols-2 bg-white'>
            <div className='md:ml-20 ml-16'>
                {(toggle === 1) ?
                    <LoginForm toggle={setToggle} />
                    :
                    (toggle === 2) ?
                        <RegisterForm toggle={setToggle} />
                        :
                        <ForgotPasswordForm handleResetPassword={handleResetPassword} toggle={setToggle} />
                }
            </div>
            <div className='ml-10 hidden md:hidden lg:block'>
                <img src={bg} alt="" className='h-screen' />
            </div>
        </div>
    )

}

export default Auth