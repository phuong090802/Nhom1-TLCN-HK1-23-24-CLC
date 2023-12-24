import { useDispatch, useSelector } from "react-redux"
import ModalLayout from "../../components/modal_layout"
import { depHInteractingAnswer } from "../../redux/selectors/depHeadSelector"
import { errorMessage, hideLoading, showLoading, successMessage } from "../../redux/slices/commonSlice"
import { acceptAnswer, getWaitingAnswerById, refuseAnswer } from "../../service/dephead_service/depAnswerService"
import { useEffect, useState } from "react"
import blankAvt from '../../assets/image/blank_avt.png'
import { dateFormat } from "../../utils/string"

const WatingAnswerModal = ({ handleClose, onDataChange }) => {
    const dispatch = useDispatch()

    const answerId = useSelector(depHInteractingAnswer)

    const [answerData, setAnswerData] = useState({})
    const [refuse, setRefuse] = useState(false)
    const [content, setContent] = useState('')

    useEffect(() => {
        getAnswer()
    }, [answerId])

    const getAnswer = async () => {
        dispatch(showLoading())

        try {
            const response = await getWaitingAnswerById(answerId)
            if (response.success) {
                setAnswerData(response.data)
            } else {
                dispatch(error(response?.message ? response.message : 'Có lỗi xảy ra'))
            }
        } catch (error) {
            dispatch(error(error?.message ? error.message : 'Có lỗi xảy ra'))
        } finally {
            dispatch(hideLoading())
        }
    }

    const handleRefuseClick = () => {
        const data = content === '' ?
            {
                id: answerData.answer.id,
                data: {}
            }
            :
            {
                id: answerData.answer.id,
                data: { content }
            }
        handleRefuseAnswer(data)
    }

    const handleAcceptAnswer = async () => {
        if (!answerData.answer.id) return
        dispatch(showLoading())

        try {
            const response = await acceptAnswer(answerData.answer.id)
            dispatch(successMessage(response?.message ? response.message : 'Duyệt câu trả lời thành công'))
            onDataChange()
            setTimeout(() => {
                handleClose()
            }, 1000)
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Có lỗi xảy ra'))
        } finally {
            dispatch(hideLoading())
        }
    }

    const handleRefuseAnswer = async () => {
        if (!answerId) return
        dispatch(showLoading())

        try {
            const data = content === '' ? { id: answerData.answer.id, data: {} }
                : { id: answerData.answer.id, data: { content } }
            const response = await refuseAnswer(data)
            dispatch(successMessage(response?.message ? response.message : 'Từ chối câu trả lời thành công'))
            onDataChange()
            setTimeout(() => {
                handleClose()
            }, 1000)
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Có lỗi xảy ra'))
        } finally {
            dispatch(hideLoading())
        }
    }



    return (
        <ModalLayout handleClose={handleClose} title={'Duyệt câu trả lời'}>
            <div className="mx-auto bg-white px-4 py-2 rounded-md shadow-md border">
                <p className="font-bold text-lg">{answerData.title}</p>
                <p className="border border-[#DBD6A4] inline-block bg-[#E7E3B3] p-[2px] rounded-md text-xs">{answerData.fieldName}</p>
                <div className="border-2 rounded-md mt-3 p-1 max-w-[700px]" dangerouslySetInnerHTML={{ __html: answerData.content }}></div>
            </div>
            <div className="mx-auto bg-white px-4 py-2 rounded-md shadow-md border mt-1 max-w-[900px]">
                <div className="flex flex-row  my-3">
                    <img src={(answerData.counsellor?.avatar) ? answerData.counsellor.avatar : blankAvt}
                        alt=""
                        className="w-12 h-12 rounded-full border-2 border-dark_blue" />
                    <span className=" bg-[#EFF1F3] ml-2 px-3 rounded-lg w-full text-[#2A2A2A]">
                        <p className="text-sm mt-2"><span className="text-blue-500 font-semibold">
                            {answerData.counsellor?.name}</span> đã trả lời lúc <span className="font-semibold">{(answerData.answer?.date ? dateFormat(answerData.answer.date) : '')}</span>
                        </p>
                        <p className="text-md mt-3" dangerouslySetInnerHTML={{ __html: answerData.answer?.content }}>
                        </p>
                    </span>
                </div>
            </div>
            {refuse &&
                <div className="mx-auto bg-white px-4 py-2 rounded-md shadow-md border duration-500 mt-1">
                    <h1 className="font-sm text-gray-600 font-bold">Phản hồi cho nhân viên:</h1>
                    <input
                        type="text"
                        className="outline-none border-b border-black w-full mt-5 text-sm"
                        value={content}
                        onChange={e => setContent(e.target.value)} />
                </div>
            }
            {refuse &&
                <div className="flex justify-around gap-1 mt-3">
                    <button className={`px-4 py-2 min-w-[100px] bg-red-600 hover:bg-red-500 focus:border-red-300 text-white rounded-md  focus:outline-none focus:ring duration-500`}
                        onClick={() => { setRefuse(false) }}>Hủy</button>
                    <button className={`px-4 py-2 min-w-[100px] bg-green-600 hover:bg-green-500 focus:border-green-300 text-white rounded-md  focus:outline-none focus:ring duration-500`}
                        onClick={handleRefuseAnswer}>Gửi phản hồi</button>
                </div>
            }
            {!refuse &&
                <div className="flex justify-around gap-1 mt-3">
                    <button className={`px-4 py-2 min-w-[100px] bg-red-600 hover:bg-red-500 focus:border-red-300 text-white rounded-md  focus:outline-none focus:ring duration-500`}
                        onClick={() => { setRefuse(true) }}>Từ chối duyệt</button>
                    <button className={`px-4 py-2 min-w-[100px] bg-green-600 hover:bg-green-500 focus:border-green-300 text-white rounded-md  focus:outline-none focus:ring duration-500`}
                        onClick={() => handleAcceptAnswer()}>Duyệt</button>
                </div>
            }
        </ModalLayout>
    )
}

export default WatingAnswerModal