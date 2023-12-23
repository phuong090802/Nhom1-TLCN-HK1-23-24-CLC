import { useState } from "react";
import ModalLayout from "../../components/modal_layout/ModalLayout"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { data } from "autoprefixer";
import { useDispatch } from "react-redux";
import { errorMessage, hideLoading, showLoading, successMessage } from "../../redux/slices/commonSlice";
import { updateFaq } from "../../service/dephead_service/depHeadFaqService";

const FaqDetailModal = ({ handleClose, faq, dataChange }) => {
    const dispatch = useDispatch()

    const [faqData, setFaqData] = useState({ ...faq })

    const [onEdit, setOnEdit] = useState(false)

    const handleContentOnchange = (content) => {
        setFaqData({
            ...faqData,
            content: content
        })
    }

    const handleTitleOnChange = (title) => {
        setFaqData({
            ...faqData,
            title: title
        })
    }

    const handleFaqUpdate = async () => {
        dispatch(showLoading())

        try {
            const response = await updateFaq({
                id: faq.id, data: faqData
            })
            if (response.success) {
                dispatch(successMessage(response.message ? response.message : 'Cập nhật khoa thành công'))
                dataChange()
                setOnEdit(false)
            } else {
                dispatch(errorMessage(response?.message ? response.message : 'Có lỗi xảy ra'))
            }
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Có lỗi xảy ra'))
        } finally {
            dispatch(hideLoading)
        }
    }

    return (
        <ModalLayout handleClose={handleClose} title={'FAQ'} >
            <div className="min-w-[450px] max-w-[750px]">
                <label htmlFor="title" className="block text-sm font-medium text-gray-600 font-roboto">Câu hỏi</label>
                <input
                    type="text"
                    id='title'
                    name="title"
                    value={faqData.title}
                    onChange={e => handleTitleOnChange(e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md"
                    readOnly={!onEdit}
                />
                <div className="my-4 font-roboto">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-600 font-roboto">Phản hồi</label>
                    <ReactQuill
                        className='mt-3 bg-white'
                        value={faqData.content}
                        onChange={handleContentOnchange}
                        theme='snow'
                        placeholder='Nội dung...'
                        readOnly={!onEdit}
                    />
                </div>
                <div className="flex justify-end gap-1 mt-3">
                    {
                        !onEdit && <button className={`px-4 py-2  bg-blue-600 hover:bg-blue-500 focus:border-blue-300 focus:outline-none focus:ring text-white rounded-md duration-500`}
                            onClick={() => { setOnEdit(true) }}>Chỉnh sửa</button>
                    }
                    {
                        onEdit &&
                        <>
                            <button className={`px-4 py-2  bg-red-600 hover:bg-red-500 focus:border-red-300 focus:outline-none focus:ring text-white rounded-md duration-500`}
                                onClick={() => {
                                    setOnEdit(false)
                                    setFaqData({ ...faq })
                                }}>Hủy</button>
                            <button className={`px-4 py-2  bg-green-600 hover:bg-green-500 focus:border-green-300 focus:outline-none focus:ring text-white rounded-md duration-500`}
                                onClick={handleFaqUpdate}>Xác nhận</button>
                        </>

                    }
                </div>
            </div>
        </ModalLayout>
    )
}

export default FaqDetailModal