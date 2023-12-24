import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import HomeBanner from '../../../components/home_banner/HomeBanner';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthenticatedSelector } from '../../../redux/selectors/authSelector';
import { errorMessage, hideLoading, showLoading, successMessage } from '../../../redux/slices/commonSlice';
import { useEffect, useState } from 'react';
import { createQuestion, getDepList, getFieldList } from '../../../service/user/uQuestionService';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export const UserCreateQuestion = () => {
    const dispatch = useDispatch()
    const isAuthen = useSelector(isAuthenticatedSelector)

    const [depList, setDepList] = useState([])
    const [fieldList, setFieldList] = useState([])
    const [depId, setDepId] = useState('')
    const [fieldId, setFieldId] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    useEffect(() => {
        getDepListData()
    }, [])

    useEffect(() => {
        getFieldListData()
    }, [depId])


    const getDepListData = async () => {

        try {
            const response = await getDepList()

            if (response.success) {
                setDepList(response.data)
            } else {
                dispatch(errorMessage('Lỗi lấy danh sách khoa'))
            }
        } catch (error) {
            dispatch(errorMessage('Lỗi lấy danh sách khoa'))
        }
    }

    const getFieldListData = async () => {
        if (depId === '') {
            setFieldList([])
            return
        }


        try {
            const response = await getFieldList(depId)

            if (response.success) {
                console.log(response);
                setFieldList(response.data)
            } else {
                dispatch(errorMessage('Lỗi lấy danh sách lĩnh vực'))
            }
        } catch (error) {
            dispatch(errorMessage('Lỗi lấy danh sách lĩnh vực'))
        }
    }

    const handleCreateQuestion = async () => {
        if(title === '') {
            dispatch(errorMessage('Tiêu đề không được để trống'))
            return
        }
        if(content === '') {
            dispatch(errorMessage('Nội dung không được để trống'))
            return
        }

        dispatch(showLoading())

        try {
            const data = {
                title, content, departmentId: depId, fieldId
            }
            console.log(data);
            const response = await createQuestion(data)
            dispatch(successMessage('Đặt câu hỏi thành công'))
            setContent('')
            setTitle('')
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Đặt câu hỏi không thành công'))
        } finally {
            dispatch(hideLoading())
        }
    }

    const ButtonClick = () => {
        handleCreateQuestion()
    }

    return (
        <>
            <HomeBanner isAuthen={isAuthen} />
            <div className="border-x my-3 shadow-lg w-[80%] mx-auto rounded-md">
                <div className="text-xl font-bold text-white bg-dark_blue font-roboto rounded-t-md pl-3 py-1 cursor-default flex items-center">
                    <HomeIcon></HomeIcon>
                    <ChevronRightIcon></ChevronRightIcon>
                    <p className="">Đặt câu hỏi</p>
                </div>

                <div className='my-3 p-2 flex flex-row'>
                    <select
                        className="border p-2 rounded w-64"
                        onChange={(e) => {
                            setFieldId('')
                            setDepId(e.target.value)
                        }}>
                        <option value="">Chọn khoa</option>
                        {depList && depList.map((dep) => {
                            return <option value={dep.id} className='py-1'>{dep.name}</option>
                        })}
                    </select>
                    {(depId !== '') &&
                        <select className="border p-2 rounded w-64 mx-4"
                            onChange={(e) => setFieldId(e.target.value)}>
                            <option value="">Chọn lĩnh vực</option>
                            {fieldList && fieldList.map((field) => {
                                return <option value={field.id} className='py-1'>{field.name}</option>
                            })}
                        </select>}
                </div>

                <div className='p-2'>
                    <input
                        type='text'
                        className='w-full border border-gray-600 rounded shadow-md text-xl p-2'
                        name='title'
                        placeholder='Tiêu đề'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <ReactQuill
                        className='mt-3 bg-white'
                        theme='snow'
                        onChange={setContent}
                        placeholder='Nội dung...'
                    />
                    {/* <textarea
                        name='content'
                        rows={7}
                        className='w-full border border-gray-600 rounded shadow-md mt-3 p-1'
                        placeholder='Nội dung...'
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    /> */}
                </div>
                <div className='p-2 flex flex-row-reverse'>
                    <button className='px-7 py-2 font-roboto text-white bg-green-500 rounded-md'
                        onClick={ButtonClick}>Đăng</button>
                </div>
            </div>

        </>
    )
}

export default UserCreateQuestion