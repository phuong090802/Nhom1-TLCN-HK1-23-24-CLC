import { useNavigate } from "react-router"

import feedback from "../../../assets/image/feedback.jpg"
import questionManage from "../../../assets/image/question_manage.jpg"

const CounsellorHome = () => {

    const navigate = useNavigate()

    return (
        <div className="flex items-center justify-center min-h-[600px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
                <div className="bg-white p-2 rounded-lg shadow-md border hover:bg-blue-100"
                    onClick={() => navigate('/counsellor/questions')}>
                    <img src={questionManage} alt="" className="w-60 h-60 rounded-lg" />
                    <p className="font-roboto text-lg font-semibold text-center text-primary mt-2">Danh sách câu hỏi</p>
                </div>
                <div className="bg-white p-2 rounded-lg shadow-md border hover:bg-blue-100"
                    onClick={() => navigate('/counsellor/feedback')}>
                    <img src={feedback} alt="" className="w-60 h-60 rounded-lg" />
                    <p className="font-roboto text-lg font-semibold text-center text-primary mt-2">Feedback</p>
                </div>
                {/* <div className="bg-white p-2 rounded-lg shadow-md border hover:bg-blue-100">
                    <img src={statistic} alt="" className="w-60 h-60 rounded-lg" />
                    <p className="font-roboto text-lg font-semibold text-center text-primary mt-2">Thống kê</p>
                </div> */}
            </div>
        </div>)
}

export default CounsellorHome