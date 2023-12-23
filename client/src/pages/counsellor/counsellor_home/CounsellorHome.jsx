import { useNavigate } from "react-router"

import statistic from "../../../assets/image/statistic.jpg"
import questionManage from "../../../assets/image/question_manage.jpg"

const CounsellorHome = () => {

    const navigate = useNavigate()

    return (
        <div className="flex items-center justify-center min-h-[600px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                <div className="bg-white p-2 rounded-lg shadow-md border hover:bg-blue-100"
                    onClick={() => navigate('/counsellor/questions')}>
                    <img src={questionManage} alt="" className="w-60 h-60 rounded-lg" />
                    <p className="font-roboto text-lg font-semibold text-center text-primary mt-2">Quản lý câu hỏi</p>
                </div>
                <div className="bg-white p-2 rounded-lg shadow-md border hover:bg-blue-100"
                    onClick={() => navigate('/counsellor/feedback')}>
                    <img src={statistic} alt="" className="w-60 h-60 rounded-lg" />
                    <p className="font-roboto text-lg font-semibold text-center text-primary mt-2">Feedback</p>
                </div>
                <div className="bg-white p-2 rounded-lg shadow-md border hover:bg-blue-100">
                    <img src={statistic} alt="" className="w-60 h-60 rounded-lg" />
                    <p className="font-roboto text-lg font-semibold text-center text-primary mt-2">Thống kê</p>
                </div>
            </div>
        </div>)
}

export default CounsellorHome