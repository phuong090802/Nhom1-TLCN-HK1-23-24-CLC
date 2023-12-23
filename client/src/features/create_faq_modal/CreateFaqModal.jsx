import { useEffect, useState } from "react";
import ModalLayout from "../../components/modal_layout/ModalLayout"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from "react-redux";
import { errorMessage, hideLoading, showLoading, successMessage } from "../../redux/slices/commonSlice";
import { counsellorOwnField } from "../../service/counsellor_service/counsellorQuestionService";
import Filter from "../../components/filter";
import { createFaq } from "../../service/dephead_service/depHeadFaqService";

const CreateFaqModal = ({ handleClose, fieldList, dataChange }) => {

    const dispatch = useDispatch()

    const [onInteract, setOnInteract] = useState(false)

    const initData = { title: '', fieldId: '' }
    const [content, setContent] = useState('')
    const [faqData, setFaqData] = useState(initData)


    useEffect(() =>
        console.log(fieldList), [])

    const handleInputOnchange = (e) => {
        if (faqData.title === '' && faqData.fieldId === '' && content === '') {
            setOnInteract(false)
        } else {
            setOnInteract(true)
        }
        setFaqData({
            ...faqData,
            [e.target.name]: e.target.value
        })
    }

    // const getFieldData = async () => {
    //     dispatch(showLoading())

    //     try {
    //         const response = await counsellorOwnField()
    //         console.log(response);

    //         if (response.success) {
    //             setFieldList(response.data.map((field) => {
    //                 return { key: field.name, value: field.id }
    //             }))
    //         }
    //     } catch (error) {
    //         dispatch(errorMessage(error?.message ? error.message : 'Có lỗi xảy ra'))
    //     } finally {
    //         dispatch(hideLoading())
    //     }
    // }

    const handleCreateFaq = async () => {
        dispatch(showLoading())

        try {
            const response = await createFaq({ content, ...faqData })
            if (response.success) {
                dispatch(successMessage(response?.message ? response.message : 'Thêm faq thành công'))
                setFaqData(initData)
                setContent('')
                dataChange()
            } else {
                dispatch(errorMessage(response?.message ? response.message : 'Có lỗi xảy ra'))
            }
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Có lỗi xảy ra'))
        } finally {
            dispatch(hideLoading())
        }
    }

    return (
        <ModalLayout handleClose={handleClose} title={'Tạo FAQ'}>
            <div className="min-w-[450px] max-w-[550px]">
                <div className="mb-4 font-roboto">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-600 font-roboto">Câu hỏi</label>
                    <input
                        type="text"
                        id='title'
                        name="title"
                        value={faqData.title}
                        onChange={e => handleInputOnchange(e)}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>
                <Filter
                    data={[{ key: 'Chọn lĩnh vực', value: '' }, ...fieldList]}
                    params={faqData} setParams={setFaqData}
                    name={'fieldId'} w={'w-full'} />
                <div className="my-4 font-roboto">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-600 font-roboto">Phản hồi</label>
                    <ReactQuill
                        className='mt-3 bg-white'
                        theme='snow'
                        value={content}
                        onChange={setContent}
                        placeholder='Nội dung...'
                    />
                </div>
                <div className="flex justify-end gap-1 mt-3">
                    {onInteract && <button className={`px-4 py-2 bg-red-600 hover:bg-red-500 focus:border-red-300 text-white rounded-md  focus:outline-none focus:ring duration-500`}
                        onClick={() => {
                            setFaqData(initData)
                            setContent('')
                            setOnInteract(false)
                        }}>Hủy</button>}
                    <button className={`px-4 py-2  ${onInteract ? 'bg-green-600 hover:bg-green-500 focus:border-green-300 focus:outline-none focus:ring' : 'bg-gray-400 cursor-default'} text-white rounded-md duration-500`}
                        onClick={handleCreateFaq}>Đăng</button>
                </div>
            </div>
        </ModalLayout>
    )
}

export default CreateFaqModal