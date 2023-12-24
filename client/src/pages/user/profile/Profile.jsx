import { useState } from 'react'
import blankAvt from '../../../assets/image/blank_avt.png'
import { useDispatch, useSelector } from 'react-redux'
import { userSelector } from '../../../redux/selectors/authSelector'
import PhotoIcon from '@mui/icons-material/Photo';
import { errorMessage, hideLoading, showLoading, successMessage } from '../../../redux/slices/commonSlice';
import validator from 'validator';
import { updateUserInfor } from '../../../service/auth_service/authenticate';
import { setUser } from '../../../redux/slices/authSlice';
import UploadModal from '../../../features/upload_modal/UploadModal';

const Profile = () => {
    const dispatch = useDispatch()

    const [onEdit, setOnEdit] = useState(false)

    const user = useSelector(userSelector)

    const [userInfor, setUserInfor] = useState({ ...user })

    const [showUpload, setShowUpload] = useState(false)

    const inputOnChange = (e) => {
        setUserInfor({
            ...userInfor,
            [e.target.name]: e.target.value
        })
    }

    const nameValidator = () => {
        if (userInfor.name === '') {
            dispatch(errorMessage('Tên người dùng không được để trống!!'))
            return false
        }
        return true
    }

    const phoneValidator = () => {
        if (userInfor.phone === '') {
            dispatch(errorMessage('Số điện thoại không được để trống!!'))
            return false
        } else if (!validator.isMobilePhone(userInfor.phone)) {
            dispatch(errorMessage('Số điện thoại không hợp lệ!!'))
            return false
        }
        return true
    }

    const mailValidator = () => {
        if (userInfor.email === '') {
            dispatch(errorMessage('Email không được để trống!!'))
            return false
        } else if (!validator.isEmail(userInfor.email)) {
            dispatch(errorMessage('Email không hợp lệ!!'))
            return false
        }
        return true
    }

    const occupationValidator = () => {
        if (userInfor.role !== 'ROLE_USER') return true;
        if (userInfor.occupation === '') {
            dispatch(errorMessage('Nghề nghiệp không được để trống!!'))
            return false
        }
        return true
    }

    const isDataChange = () => {
        const key = ['name', 'phone', 'email', 'occupation']
        let data = {}
        key.forEach((k) => {
            if (user[k] !== userInfor[k]) {
                data = {
                    ...data,
                    [k]: userInfor[k],
                }
            }
        })
        return data
    }

    const handleUpdate = async () => {
        const data = isDataChange()
        if (nameValidator() && phoneValidator() && mailValidator() && occupationValidator()) {
            if (Object.keys(data).length === 0) {
                dispatch(errorMessage('Không có thông tin nào được sửa đổi'))
                return
            }

            try {
                const response = await updateUserInfor({ name: userInfor.name, occupation: userInfor.occupation })

                dispatch(successMessage(response?.message ? response.message : 'Cập nhật thông tin thành công'))
                dispatch(setUser(userInfor))
                setOnEdit(false)
            } catch (error) {
                dispatch(errorMessage(error?.message ? error.message : 'Có lỗi xảy ra'))
            }
        }
    }



    return (
        <>
            {showUpload &&
                <UploadModal
                    handleClose={() => setShowUpload(false)} />}
            <div className="bg-gray-100 h-[80vh] flex items-center justify-center">
                <div className="bg-white p-8 rounded shadow-md">
                    <div className="flex mb-4">
                        <div className=' flex justify-center items-center mr-5 relative'>
                            <img src={user?.avatar ? user.avatar : blankAvt} alt="Avatar" className="w-20 h-20 rounded-full border border-dark_blue col-span-1" />
                            <span className='absolute bottom-0 right-0 cursor-pointer' onClick={() => { console.log('wwork'); setShowUpload(true) }}>
                                <PhotoIcon fontSize='small' className='text-dark_blue' />
                            </span>
                        </div>
                        <div className='flex flex-col justify-center'>
                            <input
                                className={`text-2xl font-bold ${onEdit ? 'border-b' : ''} border-black outline-none mb-2`}
                                value={userInfor.name}
                                name='name'
                                onChange={e => inputOnChange(e)}
                                disabled={!onEdit}
                            />
                            <p className="text-white text-xs mb-4 border bg-my_red border-red-700 rounded-md w-fit py-[2px] px-1 font-bold">{userInfor.role === 'ROLE_USER' ? 'Người dùng' : 'Nhân viên hệ thống'}</p>
                        </div>
                    </div>
                    <div className="">
                        <div className='flex'>
                            <p className="text-gray-600 text-sm mb-4 w-[40%]">Số điện thoại:</p>
                            <p
                                type="text"
                                className={`text-gray-600 text-sm mb-4 ml-1 font-bold outline-none w-[300px]`}
                                name='email'
                            >{userInfor.phone}</p>
                        </div>
                        <div className='flex'>
                            <p className="text-gray-600 text-sm mb-4 w-[40%]">Email:</p>
                            <p
                                type="text"
                                className={`text-gray-600 text-sm mb-4 ml-1 font-bold outline-none w-[300px]`}
                                name='email'
                            >{userInfor.email}</p>
                        </div>
                        <div className='flex'>
                            <p className="text-gray-600 text-sm mb-4 w-[40%]">{(userInfor.role === 'ROLE_USER') ? 'Nghề nghiệp' : 'Chức vụ'}:</p>
                            {
                                userInfor.role === 'ROLE_USER' ?
                                    <select
                                        type="text"
                                        className={`text-gray-600 text-sm mb-4 ml-1 font-bold outline-none w-[300px] ${onEdit ? ' border-b border-black' : 'cursor-default'}`}
                                        value={userInfor.occupation}
                                        name='occupation'
                                        onChange={e => inputOnChange(e)}
                                        disabled={!onEdit} >
                                        <option value="">Chưa cập nhật</option>
                                        <option value="Học Sinh">Học Sinh</option>
                                        <option value="Sinh Viên">Sinh Viên</option>
                                        <option value="Cựu Sinh Viên">Cựu Sinh Viên</option>
                                        <option value="Phụ huynh">Phụ huynh</option>
                                    </select>
                                    :
                                    <p type="text"
                                        className='text-gray-600 text-sm mb-4 ml-1 font-bold outline-none w-[300px]'
                                    >{userInfor.role}</p>
                            }
                        </div>
                    </div>
                    <div className='w-full flex justify-end mt-4'>
                        {
                            onEdit ?
                                <>
                                    <button className={`mr-3 px-4 py-2 duration-500 bg-red-500 hover:bg-red-600 text-white rounded-md  focus:outline-none focus:ring focus:border-red-300`}
                                        onClick={() => {
                                            setUserInfor(user)
                                            setOnEdit(false)
                                        }}>Hủy
                                    </button>
                                    <button className={`px-4 py-2 duration-500 bg-green-500 hover:bg-green-600 text-white rounded-md  focus:outline-none focus:ring focus:border-green-300`}
                                        onClick={handleUpdate}>Cập nhật
                                    </button>
                                </>
                                :
                                <button className={`px-4 py-2 duration-500 bg-blue-500 hover:bg-blue-600 text-white rounded-md  focus:outline-none focus:ring focus:border-blue-300`}
                                    onClick={() => { setOnEdit(true) }}>Chỉnh sửa
                                </button>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile