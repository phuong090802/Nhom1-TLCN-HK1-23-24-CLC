import { useDispatch, useSelector } from "react-redux"
import ModalLayout from "../../components/modal_layout"
import { questionOnInteract } from "../../redux/selectors/counsellorSelector"
import { forwardQuestion, getQuestionById, privateResponse, responseQuestion } from "../../service/counsellor_service/counsellorQuestionService"
import { errorMessage, hideLoading, showLoading, successMessage } from "../../redux/slices/commonSlice"
import { useEffect, useState } from "react"
import { dateFormat } from "../../utils/string"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css';
import { getDepList } from "../../service/admin_service/adminUserService"


const ResponseModal = ({ handleClose, dataChange }) => {

    const dispatch = useDispatch()
    const questionId = useSelector(questionOnInteract)
    const [questionData, setQuestionData] = useState({})
    const [forwardDepId, setForwardDepId] = useState('')
    const [depList, setDepList] = useState([])
    const [showResponse, setShowResponse] = useState(false)
    const [showForwardOptions, setShowForwardOption] = useState(false)
    const [showPrivate, setShowPrivate] = useState(false)
    const [content, setContent] = useState('')
    const [privateMessage, setPrivateMessage] = useState('')

    useEffect(() => {
        getQuestionData()
    }, [])

    const getQuestionData = async () => {
        dispatch(showLoading())

        try {
            const response = await getQuestionById(questionId)
            setQuestionData(response.data)
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Lỗi lấy câu hỏi'))
        } finally {
            dispatch(hideLoading())
        }
    }

    const getDepListData = async () => {
        dispatch(showLoading())

        console.log('wwork');

        try {
            const response = await getDepList()
            setDepList(response.data)
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Lỗi lấy danh sách khoa'))
        } finally {
            dispatch(hideLoading())
        }
    }


    const handleResponse = async () => {
        if (content === '') {
            dispatch(errorMessage('Nội dung câu trả lời không được để trống'))
            return
        }

        dispatch(showLoading())

        try {
            const data = { isPrivate: false, content, questionId }
            const response = await responseQuestion(data)
            dispatch(successMessage(response?.message ? response.message : 'Phản hồi thành công'))
            dataChange()
            setTimeout(() => {
                handleClose()
            }, 1000);
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Có lỗi xảy ra'))
        } finally {
            dispatch(hideLoading())
        }
    }


    const handleForward = async () => {
        if (forwardDepId === '') {
            dispatch(errorMessage('Chưa chọn khoa chuyển đến'))
            return
        }

        dispatch(showLoading())

        try {
            const data = {
                questionId: questionId,
                departmentId: forwardDepId
            }
            const response = await forwardQuestion(data)
            dispatch(successMessage(response?.message ? response.message : 'Chuyển tiếp thành công'))
            dataChange()
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Lỗi chuyển tiếp người dùng'))
        } finally {
            dispatch(hideLoading())
        }
    }



    const handlePrivateResponse = async () => {
        dispatch(showLoading())

        try {
            const data = { questionId, content: privateMessage }
            const response = await privateResponse(data)
            dispatch(successMessage(response?.message ? response.message : 'Đã phản hồi qua hộp thư'))
            dataChange()
            handleClose()

        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Có lỗi xảy ra'))
        } finally {
            dispatch(hideLoading())
        }

    }
    return <>
        <ModalLayout role='counsellor' handleClose={handleClose} title={'Trả lời câu hỏi'}>
            <div className="text-[#2A2A2A] max-h-[700px] overflow-y-auto min-w-[400px] max-w-[550px]">
                {!showResponse && !showPrivate &&
                    <div className="bg-white px-4 rounded-md shadow-md border  duration-500">
                        <h2 className="text-xl font-semibold mb-4">Thông tin người hỏi</h2>
                        <div className="mb-4">
                            <label className="inline-block text-gray-600 text-sm">Tên người dùng:</label>
                            <p className="text-gray-800 text-md inline-block ml-1 font-bold">{questionData.userName}</p>
                        </div>
                        <div className="mb-4">
                            <label className="inline-block text-gray-600 text-sm">Email:</label>
                            <p className="text-gray-800 text-md text-sm inline-block ml-1 font-bold">{questionData.email}</p>
                        </div>
                    </div>
                }
                <div className="mx-auto bg-white px-4 py-2 rounded-md shadow-md border duration-500">
                    <p className="font-bold text-lg">{questionData.title}</p>
                    <p className="text-xs">Date: {dateFormat(questionData.date)}</p>
                    <p className="border border-dark_blue inline-block bg-gray-400 text-white p-[2px] rounded-md text-xs mr-2">{questionData.departmentName}</p>
                    <p className="border border-dark_blue inline-block bg-gray-400 text-white p-[2px] rounded-md text-xs">{questionData.fieldName}</p>
                    <div className="border-2 rounded-md mt-3 p-1 max-w-[700px]" dangerouslySetInnerHTML={{ __html: questionData.content }}></div>
                </div>
                {!showResponse && !showForwardOptions && !showPrivate &&
                    <div className="flex justify-end gap-1 mt-3  duration-500">
                        <button className={`px-4 py-2 bg-amber-600 hover:bg-amber-500 focus:border-amber-300 text-white rounded-md  focus:outline-none focus:ring duration-500`}
                            onClick={() => {
                                setShowPrivate(true)
                                setPrivateMessage(`<p><strong>Câu hỏi của bạn đến khoa: "${questionData.departmentName}".
                                    </strong></p><p><strong>Về lĩnh vực : "${questionData.fieldName}" .</strong></p>
                                    <p><strong>Với tiêu đề: "${questionData.title}".</strong></p>
                                    <p><strong>Đây là phản từ nhân viên hệ thống đến trực tiếp cho bạn về câu hỏi trên.</strong></p><p><br>
                                    </p><p>Nội dung phản hồi:</p><p><br></p>`)
                            }}>Trả lời qua tin nhắn</button>
                        <button className={`px-4 py-2 bg-blue-600 hover:bg-blue-500 focus:border-blue-300 text-white rounded-md  focus:outline-none focus:ring duration-500`}
                            onClick={() => {
                                getDepListData()
                                setShowForwardOption(true)
                            }}>Chuyển tiếp</button>
                        <button className={`px-4 py-2 bg-green-600 hover:bg-green-500 focus:border-green-300 text-white rounded-md  focus:outline-none focus:ring duration-500`}
                            onClick={() => {
                                if (showResponse) return
                                setShowResponse(true)
                            }}>Phản hồi</button>
                    </div>
                }
                {showResponse &&
                    <div className="mt-4 duration-500">
                        <p className="font-bold text-lg">Phản hồi:</p>
                        <ReactQuill
                            value={content}
                            className=' bg-white border border-[#CCCCCC] rounded-md overflow-hidden'
                            theme='snow'
                            placeholder='Nội dung...'
                            onChange={setContent}
                        />
                        <div className="flex justify-end gap-1 mt-3">
                            <button className={`px-4 py-2 bg-red-600 hover:bg-red-500 focus:border-red-300 text-white rounded-md  focus:outline-none focus:ring duration-500`}
                                onClick={() => {
                                    setShowResponse(false)
                                }}>Hủy</button>
                            <button className={`px-4 py-2 bg-green-600 hover:bg-green-500 focus:border-green-300 text-white rounded-md  focus:outline-none focus:ring duration-500`}
                                onClick={handleResponse}>Đăng</button>
                        </div>
                    </div>
                }
                {showPrivate &&
                    <div className="mt-4 duration-500">
                        <p className="font-bold text-lg">Tạo tin nhắn:</p>
                        <ReactQuill
                            className=' bg-white border border-[#CCCCCC] rounded-md overflow-hidden'
                            theme='snow'
                            placeholder='Nội dung...'
                            onChange={setPrivateMessage}
                            value={privateMessage}
                            modules={{ toolbar: false }}
                        />
                        <div className="flex justify-end gap-1 mt-3">
                            <button className={`px-4 py-2 bg-red-600 hover:bg-red-500 focus:border-red-300 text-white rounded-md  focus:outline-none focus:ring duration-500`}
                                onClick={() => {
                                    setShowPrivate(false)
                                }}>Hủy</button>
                            <button className={`px-4 py-2 bg-green-600 hover:bg-green-500 focus:border-green-300 text-white rounded-md  focus:outline-none focus:ring duration-500`}
                                onClick={handlePrivateResponse}>Gửi</button>
                        </div>
                    </div>
                }
                {showForwardOptions &&
                    <>
                        <div className="mt-3 border shadow-md rounded-md px-5 pt-2 pb-5">
                            <h1 className="font-bold text-lg">Chọn khoa muốn chuyển đến:</h1>
                            <select
                                className="border w-full py-1 rounded-md shadow-md"
                                onChange={e => setForwardDepId(e.target.value)}>
                                <option value="">Chọn khoa</option>
                                {depList.map((dep, i) => {
                                    return <option value={dep.id}>{dep.name}</option>
                                })}
                            </select>

                        </div>
                        <div className="flex justify-end gap-1 mt-3">
                            <button className={`px-4 py-2 bg-red-600 hover:bg-red-500 focus:border-red-300 text-white rounded-md  focus:outline-none focus:ring duration-500`}
                                onClick={() => {
                                    setShowForwardOption(false)
                                }}>Hủy</button>
                            <button className={`px-4 py-2 bg-green-600 hover:bg-green-500 focus:border-green-300 text-white rounded-md  focus:outline-none focus:ring duration-500`}
                                onClick={handleForward}>Chuyển đến</button>
                        </div>
                    </>
                }
            </div>
        </ModalLayout>
    </>
}
export default ResponseModal