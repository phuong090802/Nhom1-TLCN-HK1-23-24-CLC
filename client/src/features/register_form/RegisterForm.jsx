import { useState } from "react"
import validator from "validator"
import { regsiter } from "../../service/auth_service/authenticate"
import { useDispatch } from "react-redux"
import { errorMessage, successMessage } from "../../redux/slices/commonSlice"

const RegisterForm = ({ toggle }) => {

    const dispatch = useDispatch()

    const initInfor = {
        phone: '', password: '', email: '', name: '', occupation: 'Sinh Viên'
    }
    const [registerInfor, setregisterInfor] = useState(initInfor)

    const [error, setError] = useState({ ...initInfor, repassword: '' })

    const [isLoad, setIsLoad] = useState(false)

    const handleInputOnChange = (e) => {
        setregisterInfor({
            ...registerInfor,
            [e.target.name]: e.target.value
        })
        console.log(registerInfor);
    }
    const [repassword, setRepassword] = useState('')

    const phoneValidate = () => {
        if (registerInfor.phone === '') {
            setError({ ...error, phone: 'Số điện thoại không được để trống' })
            return false
        }
        else if (!validator.isMobilePhone(registerInfor.phone)) {
            setError({ ...error, phone: 'Số điện thoại không hợp lệ' })
            return false
        }
        else {
            setError({ ...error, phone: '' })
            return true
        }

    }
    const passwordValidate = () => {
        if (registerInfor.password === '') {
            setError({ ...error, password: 'Mật khẩu không được để trống' })
            return false
        }
        else if (registerInfor.password.length < 6) {
            setError({ ...error, password: 'Mật khẩu phải có từ 6 kí tự' })
            return false
        }
        else {
            setError({ ...error, password: '' })
            return true
        }

    }
    const emailValidate = () => {
        if (registerInfor.email === '') {
            setError({ ...error, email: 'Email không được để trống' })
            return false
        }
        else if (!validator.isEmail(registerInfor.email)) {
            setError({ ...error, email: 'Email không hợp lệ' })
            return false
        } else {
            setError({ ...error, email: '' })
            return true
        }
    }
    const nameValidate = () => {
        if (registerInfor.name === '') {
            setError({ ...error, name: 'Tên người dùng không được để trống' })
            return false
        } else {
            setError({ ...error, name: '' })
            return true
        }
    }
    const repasswordValidate = () => {
        if (repassword !== registerInfor.password) {
            setError({ ...error, repassword: "Nhập lại mật khẩu chưa đúng" })
            return false
        } else {
            setError({ ...error, repassword: '' })
            return true
        }
    }

    const RegisterClick = async () => {
        try {
            if (!phoneValidate() ||
                !emailValidate() ||
                !nameValidate() ||
                !passwordValidate() ||
                !repasswordValidate()) {
                return
            }
            await handleRegister(registerInfor)
            setregisterInfor(initInfor)
            setRepassword('')
        } catch (error) {

        }
    }


    const handleRegister = async () => {

        if (!phoneValidate() ||
            !emailValidate() ||
            !nameValidate() ||
            !passwordValidate() ||
            !repasswordValidate()) {
            return
        }
        if (isLoad) return

        setIsLoad(true)
        try {
            const res = await regsiter(registerInfor)
            dispatch(successMessage('Tạo tài khoản thành công'))
            toggle(1)
            setregisterInfor(initInfor)
            setRepassword('')
        } catch (error) {
            dispatch(errorMessage(error.message))
        }
        finally {
            setIsLoad(false)
        }

    }

    return (
        <div className="flex justify-center flex-col mt-56 mb-10 md:my-0">
            <h2 className="text-3xl font-semibold mb-4 text-[#332370] font-roboto md:ml-3 ml-0 inline-block">
                Đăng ký - <p className="text-[#CF2F2C] md:inline-block block">Tư Vấn Sinh Viên HCMUTE</p>
            </h2>
            <div className="w-full border-t border-gray-300 mb-3"></div>
            <div className="grid md:grid-cols-2">
                <div className="w-[310px] md:w-auto">
                    <div className={`${(error.phone === '') ? "mb-6" : ""}`}>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-600 font-roboto">Số điện thoại</label>
                        <input
                            type="tel"
                            name="phone"
                            className="mt-1 p-2 w-full rounded-md border-2 border-primary text-sm"
                            onChange={e => handleInputOnChange(e)}
                            onBlur={() => phoneValidate()}
                            value={registerInfor.phone} />
                        {(error.phone !== '') && <p className="inline-block text-xs text-red-500">{error.phone}</p>}
                    </div>
                    <div className={`${(error.email === '') ? "mb-6" : ""}`}>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600 font-roboto">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="mt-1 p-2 w-full rounded-md border-2 border-primary text-sm"
                            onChange={e => handleInputOnChange(e)}
                            onBlur={() => emailValidate()}
                            value={registerInfor.email} />
                        {(error.email !== '') && <p className="inline-block text-xs text-red-500">{error.email}</p>}
                    </div>
                    <div className={`${(error.name === '') ? "mb-6" : ""}`}>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-600 font-roboto">Họ & Tên</label>
                        <input
                            type="text"
                            name="name"
                            className="mt-1 p-2 w-full rounded-md border-2 border-primary text-sm"
                            onChange={e => handleInputOnChange(e)}
                            onBlur={() => nameValidate()}
                            value={registerInfor.name} />
                        {(error.name !== '') && <p className="inline-block text-xs text-red-500">{error.name}</p>}
                    </div>
                </div>
                <div className="w-[310px] md:ml-[20px]  md:w-auto">
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-600">Nghề nghiệp</label>
                        <select
                            className="mt-1 p-2 w-full rounded-md border-2 border-primary text-sm"
                            name="occupation"
                            id="ngheNghiep"
                            onChange={e => handleInputOnChange(e)}
                            value={registerInfor.occupation}
                        >
                            <option value="Sinh Viên">Sinh Viên</option>
                            <option value="Học Sinh">Học Sinh</option>
                            <option value="Phụ Huynh">Phụ Huynh</option>
                            <option value="Cựu Sinh Viên">Cựu Sinh Viên</option>
                        </select>
                    </div>
                    <div className={`${(error.password === '') ? "mb-6" : ""}`}>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">Mật khẩu</label>
                        <input
                            type="password"
                            name="password"
                            className="mt-1 p-2 w-full rounded-md border-2 border-primary text-sm"
                            onChange={e => handleInputOnChange(e)}
                            onBlur={() => passwordValidate()}
                            value={registerInfor.password} />
                        {(error.password !== '') && <p className="inline-block text-xs text-red-500">{error.password}</p>}
                    </div>
                    <div className={`${(error.repassword === '') ? "mb-6" : ""}`}>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">Xác nhận mật khẩu</label>
                        <input
                            type="password"
                            name="repassword"
                            className="mt-1 p-2 w-full rounded-md border-2 border-primary text-sm"
                            onChange={e => setRepassword(e.target.value)}
                            onBlur={() => repasswordValidate()}
                            value={repassword} />
                        {(error.repassword !== '') && <p className="inline-block text-xs text-red-500">{error.repassword}</p>}
                    </div>
                </div>
                <div className="flex md:mx-auto flex-col md:col-span-2 w-[310px]">
                    <button
                        className="w-[310px] bg-dark_blue text-white p-2 rounded-md hover:bg-secondary font-roboto mx-auto mt-3"
                        onClick={() => RegisterClick()}>Đăng kí</button>
                    <p className="text-xs  mt-2 text-center">Đã có tài khoản? <span onClick={() => toggle(1)} className="font-bold text-dark_blue cursor-pointer">Đăng Nhập</span></p>
                </div>
            </div>

        </div>
    )
}





export default RegisterForm