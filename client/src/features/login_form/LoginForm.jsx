import { useState } from "react"
import validator from "validator"
import { addCookie } from "../../utils/cookie"
import { useDispatch } from "react-redux"
import { setUser } from "../../redux/slices/authSlice"
import { errorMessage, successMessage } from "../../redux/slices/commonSlice"
import { login } from "../../service/auth_service/authenticate"

const LoginForm = ({  toggle }) => {
    const dispatch = useDispatch()

    const initInfor = {
        username: '', password: ''
    }
    const [loginInfor, setLoginInfor] = useState(initInfor)

    const [error, setError] = useState(initInfor)

    const [isLoad, setIsLoad] = useState(false)

    const handleInputOnChange = (e) => {
        setLoginInfor({
            ...loginInfor,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = async () => {
        if (isLoad) return
        if (!usernameValidate() || !passwordValidate()) return

        setIsLoad(true)
        try {
            const response = await login(loginInfor)
            if (response.success) {
                addCookie('accessToken', response.data.token)
                dispatch(setUser(response.data))
                dispatch(successMessage('Đăng nhập thành công'))
            }
        } catch (error) {
            dispatch(errorMessage(error.message))
        }
        finally {
            setIsLoad(false)
        }
    }

    const usernameValidate = () => {
        if (loginInfor.username === '') {
            setError({ ...error, username: 'Số điện thoại không được để trống' })
            return false
        }
        else if (!validator.isMobilePhone(loginInfor.username)) {
            setError({ ...error, username: 'Số điện thoại không hợp lệ' })
            return false
        }
        else {
            setError({ ...error, username: '' })
            return true
        }

    }
    const passwordValidate = () => {
        if (loginInfor.password === '') {
            setError({ ...error, password: 'Mật khẩu không được để trống' })
            return false
        } else {
            setError({ ...error, password: '' })
            return true
        }

    }

    const LoginClick = () => {
        if (!usernameValidate() || !passwordValidate()) return
        handleLogin(loginInfor)
    }



    return (
        <div className="w-[640px]">
            <h2 className="text-3xl font-semibold mb-4 text-[#332370] font-roboto md:ml-3 ml-0 inline-block">
                Đăng Nhập - <p className="text-[#CF2F2C] md:inline-block block">Tư Vấn Sinh Viên HCMUTE</p>
            </h2>
            <div className={`w-full border-t border-gray-300 mb-3}`}></div>
            <div className="w-80">
                <div className={`${(error.username !== '') ? "" : "mb-6"}`}>
                    <label htmlFor="phone" className="inline-block text-sm font-medium text-gray-600 font-roboto">Số điện thoại</label>
                    <input type="tel"
                        name="username"
                        className="mt-1 p-2 w-full rounded-md border-2 border-primary text-sm"
                        value={loginInfor.username}
                        onChange={e => handleInputOnChange(e)}
                        onBlur={() => usernameValidate()}
                    />
                    {(error.username !== '') && <p className="inline-block text-xs text-red-500">{error.username}</p>}
                </div>
                <div className={`${error.password !== '' ? "" : "mb-6"}`}>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-600">Mật khẩu</label>
                    <input type="password"
                        name="password"
                        className="mt-1 p-2 w-full rounded-md border-2 border-primary text-sm"
                        value={loginInfor.password}
                        onChange={e => handleInputOnChange(e)}
                        onBlur={() => passwordValidate()}
                    />
                    {(error.password !== 0) && <p className="inline-block text-xs text-red-500">{error.password}</p>}
                </div>
                <button
                    className=" duration-500 w-full bg-[#19376D] hover:bg-[#466bb0] text-white p-2 rounded-md hover:bg-secondary font-roboto"
                    onClick={() => LoginClick()}
                >Đăng nhập</button>
                <div className="flex justify-between">
                    <p className="text-xs  mt-2 ">Chưa có tài khoản? <span className="font-bold text-[#19376D] inline-block cursor-pointer"
                        onClick={() => toggle(2)}>Đăng kí</span></p>
                    <p className="text-xs  mt-2 "><span className="font-bold text-[#19376D] inline-block cursor-pointer"
                        onClick={() => toggle(3)}>Quên mật khẩu?</span></p>
                </div>
            </div>
        </div>
    )
}
export default LoginForm