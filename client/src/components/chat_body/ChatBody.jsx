import ReactQuill from 'react-quill';
import blankAvt from '../../assets/image/blank_avt.png'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from 'react';
import { getAllMessage } from '../../service/user/uMessageService';
import { useDispatch } from 'react-redux';
import { errorMessage } from '../../redux/slices/commonSlice';


const ChatBody = ({ message }) => {

    const dispatch = useDispatch()

    const [messages, setMessage] = useState([])

    useEffect(() => {
        fetchGetAllMessage()
    }, [message])

    const fetchGetAllMessage = async() => {
        try {
            const response = await getAllMessage(message.get.id)
            setMessage(response.data)
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Lỗi lấy cuộc hội thoại'))
        }
    }

    return (
        <div className="col-span-3 border bg-[#EFF3F7] flex flex-col h-[90vh] relative">
            <div className="flex items-center px-4 py-2 shadow-md relative">
                <img src={blankAvt} alt="user avatar" className='w-12 h-12 rounded-full border-2 border-blue-300' />
                <div className='ml-2'>
                    <p>Nhân viên 1</p>
                    <p className='text-xs'>Nhân viên hệ thống</p>
                </div>
                <div className='absolute text-gray-600 right-5 hover:bg-[#c8def3] p-2 rounded-full hover:text-white duration-300'>
                    <DeleteOutlineOutlinedIcon />
                </div>
            </div>
            <div className='py-3 px-6 flex flex-col text-gray-600 overflow-y-auto'>
                <div className='bg-green-300 w-fit p-3 max-w-[70%] rounded-b-lg rounded-r-lg relative my-2'>
                    Tao đang rep đây Tao đang rep đây Tao đang rep đây Tao đang rep đây Tao đang rep đây Tao đang rep đâyTao đang rep đâyTao đang rep đâyTao đang rep đâyTao đang rep đây
                    <span className='absolute top-0 left-[-8px] border-x-[8px] border-y-[8px] border-t-green-300 border-r-green-300 border-l-transparent border-b-transparent'></span>
                </div>

                <div className='bg-blue-300 w-fit p-3 max-w-[70%] rounded-b-lg rounded-l-lg relative my-2 self-end'>
                    alo
                    <span className='absolute top-0 right-[-8px] border-x-[8px] border-y-[8px] border-t-blue-300 border-l-blue-300 border-r-transparent border-b-transparent'></span>
                </div>
            </div>
            <div className='bg-[#efefef] flex items-center justify-between border-t-gray-200 border-t absolute bottom-0 right-0 left-0'>
                <div className='w-[95%] p-1'>
                    <ReactQuill
                        className='bg-white min-h-11 overflow-y-auto max-h-48 rounded-lg shadow-md'
                        theme='snow'
                        placeholder='Nội dung...'
                        modules={{ toolbar: false }}
                    />
                </div>
                <div className='p-3 text-blue-400'>
                    <SendIcon />
                </div>
            </div>
        </div>
    )
}

export default ChatBody