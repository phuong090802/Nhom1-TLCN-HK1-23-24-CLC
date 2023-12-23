import { useState } from "react"
import validator from "validator"

const ForgotPasswordForm = ({ toggle, handleResetPassword }) => {

    const [email, setEmail] = useState('')
    const [err, setErr] = useState('')

    const emailValidator = () => {
        if (email === '') {
            setErr('Email không được để trống')
            return false
        }
        else if (!validator.isEmail(email)) {
            setErr('Email không hợp lệ')
            return false
        }
        else {
            setErr('')
            return true
        }

    }

    const handleResetClick = () => {
        if (!emailValidator()) return
        handleResetPassword({ email })
        setEmail('')
    }

    return (
        <div className="w-[640px]">
            <h2 className="text-3xl font-semibold mb-4 text-[#332370] font-roboto md:ml-3 ml-0 inline-block">
                Quên mật khẩu - <p className="text-[#CF2F2C] md:inline-block block">Tư Vấn Sinh Viên HCMUTE</p>
            </h2>
            <div className={`w-full border-t border-gray-300 mb-3}`}></div>
            <div className="w-80">
                <div className={`${err !== '' ? "" : "mb-6"}`}>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-600 mt-3">Email</label>
                    <input type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        onBlur={emailValidator}
                        name="email"
                        className="mt-1 p-2 w-full rounded-md border-2 border-primary text-sm"
                    />
                    {(err !== '') && <p className="inline-block text-xs text-red-500">{err}</p>}
                </div>
                <button
                    className=" duration-500 w-full bg-[#19376D] hover:bg-[#466bb0] text-white p-2 rounded-md hover:bg-secondary font-roboto"
                    onClick={handleResetClick}
                >Đặt lại mật khẩu</button>
                <p className="text-xs  mt-2 text-center">Đã có tài khoản? <span className="font-bold text-[#19376D] inline-block cursor-pointer"
                    onClick={() => toggle(1)}>Đăng nhập</span></p>
            </div>

        </div>
    )
}

export default ForgotPasswordForm