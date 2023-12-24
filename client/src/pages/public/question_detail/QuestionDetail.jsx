import { useNavigate, useParams } from "react-router"
import HomeIcon from '@mui/icons-material/Home';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import CropSquareOutlinedIcon from '@mui/icons-material/CropSquareOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import blankAvt from '../../../assets/image/blank_avt.png'
import { useDispatch } from "react-redux";
import { errorMessage, hideLoading, showLoading } from "../../../redux/slices/commonSlice";
import { getQuestionDeatailById } from "../../../service/public_service/publicQuestionService";
import { useEffect, useState } from "react";
import { dateFormat, truncate } from "../../../utils/string";
import HomeBanner from "../../../components/home_banner/HomeBanner";
import Loading from "../../../components/loading_component/Loading";

const QuestionDetail = () => {
    let { questionId } = useParams()
    const dispatch = useDispatch()
    const [question, setQuestion] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        getQuestionDetail()
    }, [])

    const getQuestionDetail = async () => {
        try {
            const response = await getQuestionDeatailById(questionId)
            setQuestion(response.data)
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Lỗi lấy dữ liệu'))
        }
    }

    return (
        <>
            <HomeBanner />
            {question ?
                <div className="grid cursor-default">
                    <div className="grid grid-cols-4 w-[45%] mx-auto gap-2 my-3 col-span-3">
                        <div className=" p-1 pl-3 col-span-4 ">
                            <div className="flex items-center text-[#EEEEEE] bg-dark_blue/80 rounded-t-lg p-1 pl-3">
                                <button
                                    onClick={() => { navigate('/') }}
                                    className='inline-block text-lg font-bold cursor-pointer hover:bg-white hover:text-gray-600 duration-500 rounded-lg px-2'>
                                    <HomeIcon />
                                </button>
                                <ChevronRightIcon />
                                <p className='inline-block text-lg font-bold cursor-pointer hover:bg-white hover:text-gray-600 duration-500 rounded-lg px-2'
                                    onClick={() => history.back()}>Hỏi đáp</p>
                                <ChevronRightIcon />
                                <p className='inline-block text-lg font-bold'>{truncate(question.title, 30)}</p>
                            </div>
                            <div className="bg-white p-4 mt-1 rounded-t-md">
                                <h1 className=" text-3xl font-bold text-[#2A2A2A]">{question.title}</h1>

                                <span className="flex gap-2 text-sm items-center content-center text-gray-600">
                                    <p className="font-semibold"><CalendarMonthOutlinedIcon fontSize="small" className="pb-[2px]" />{dateFormat(question.date)}</p>
                                    <p><RemoveRedEyeOutlinedIcon fontSize="small" className="pb-[2px]" /><span className="font-semibold">{question.views}</span> lượt xem</p>
                                    {question?.answer ?
                                        <p><CheckBoxOutlinedIcon fontSize="small" className="pb-[2px]" />Đã được trả lời</p>
                                        :
                                        <p><CropSquareOutlinedIcon fontSize="small" className="pb-[2px]" />Chưa được trả lời</p>}

                                </span>
                            </div>
                            <div className="bg-white p-4 rounded-md mt-1">
                                <div className="flex flex-row  mb-3">
                                    <img src={(question.user?.avatar) ? question.user.avatar : blankAvt}
                                        alt=""
                                        className="w-12 h-12 rounded-full border-2 border-dark_blue" />
                                    <span className=" bg-[#EFF1F3] ml-2 px-3 rounded-lg w-full text-[#2A2A2A]">
                                        <p className="text-sm mt-2"><span className="text-blue-500 font-semibold">
                                            {question.user.name}</span> thắc mắc:
                                        </p>
                                        <p className="text-md mt-3" dangerouslySetInnerHTML={{ __html: question.content }}>
                                        </p>
                                    </span>
                                </div>
                            </div>

                            <div className="bg-white p-4 rounded-md mt-1">
                                <h1 className="text-xl font-bold text-[#2A2A2A]">Phản hồi</h1>
                                {
                                    (question.status === 2 && question?.answer) ?
                                        <div className="flex flex-row mt-2 mb-3">
                                            <img src={(question.answer.user?.avatar) ? question.answer.user.avatar : blankAvt}
                                                alt=""
                                                className="w-12  h-12 rounded-full border-2 border-dark_blue" />
                                            <span className=" bg-[#EFF1F3] ml-2 px-3 rounded-lg w-full text-[#2A2A2A]">
                                                <p className="text-sm mt-2"><span className="text-blue-500 font-semibold">
                                                    {question.answer.user.name}</span> đã trả lời lúc <span className="font-semibold">{dateFormat(question.answer.date)}</span>
                                                </p>
                                                <p className="text-md mt-3" dangerouslySetInnerHTML={{ __html: question.answer.content }}>
                                                </p>
                                            </span>
                                        </div>
                                        :
                                        <div className="flex flex-row  mb-3">
                                            <span className=" bg-[#EFF1F3] ml-2 px-3 rounded-lg w-full text-[#2A2A2A] py-3 text-center">
                                                Chưa có phản hồi
                                            </span>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                :
                <Loading />}
        </>

    )
}

export default QuestionDetail