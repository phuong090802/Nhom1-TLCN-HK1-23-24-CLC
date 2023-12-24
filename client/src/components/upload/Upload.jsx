import { useState } from 'react'
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { getUser, updateUserAvatar } from '../../service/auth_service/authenticate';
import StaffButton from '../staff_button/StaffButton';
import { data } from 'autoprefixer';
import { setUser } from '../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { successMessage } from '../../redux/slices/commonSlice';

const Upload = ({handleClose}) => {
    const dispatch = useDispatch()

    const [imageName, setImageName] = useState('No file Selected')
    const [imageFormData, setImageFormData] = useState(null)

    const handleUpdateAvatar = async () => {
        try {
            const data = new FormData()
            data.append('avatar', imageFormData)
            const response = await updateUserAvatar(data)
            getUserInfor()
            dispatch(successMessage(response?.message ? response.message : 'Cập nhật avatar thành công' ))
            handleClose()
        } catch (error) {
            dispatch(error(error?.message ? error.message : 'Cập nhật avatar không thành công' ))
            console.log(error);
        }
    }

    const handleImageChange = async (e) => {
        if (e.target.files && e.target.files[0]) {
            const selectedImage = e.target.files[0];
            setImageFormData(selectedImage)
            setImageName(selectedImage.name)
        }
    }

    const getUserInfor = async () => {
        try {
            const response = await getUser()
            dispatch(setUser(response.data))
        }catch {

        }
    }

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <form
                action=""
                className=' flex flex-col justify-center items-center border-2 border-dashed border-blue-400 h-80 w-[500px] rounded-md cursor-pointer'
                onClick={() => { document.getElementById('input-element').click() }}>

                <p className='text-gray-600/50 text-lg font-bold'>Browse file to upload</p>
                <CloudUploadOutlinedIcon />
                <p className='text-gray-600 text-lg font-bold'>Supported Files</p>
                <p className='text-gray-600 text-md'>JPG, JPEG, PNG</p>

                <input
                    type="file"
                    accept='image/*'
                    id='input-element'
                    className='hidden'
                    onChange={(e) => handleImageChange(e)} />

            </form>

            <div
                className='flex flex-row w-[500px] justify-between items-center my-3 py-4 px-5 rounded-md bg-slate-400/30 '>
                <AttachFileOutlinedIcon>
                </AttachFileOutlinedIcon>

                <span className=''>
                    <h1 className='inline-block mr-3'>{imageName}</h1>
                    <button onClick={() => setImageName('No file Selected')}>
                        <DeleteOutlineOutlinedIcon>
                        </DeleteOutlineOutlinedIcon>
                    </button>
                </span>
            </div>
            <div className='w-full flex justify-end mt-3'>
                <StaffButton oC={handleUpdateAvatar}>Cập nhật</StaffButton>
            </div>
        </div>

    )
}

export default Upload