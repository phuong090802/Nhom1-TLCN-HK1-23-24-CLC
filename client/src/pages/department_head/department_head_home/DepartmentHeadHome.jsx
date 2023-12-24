import { useNavigate } from "react-router-dom"


import userManage from "../../../assets/image/user_manage.jpg"
import statistic from "../../../assets/image/statistic.jpg"
import fieldManage from "../../../assets/image/field_manage.jpg"
import questionManage from "../../../assets/image/question_manage.jpg"
import faqManage from "../../../assets/image/faq_manage.jpg"
import ansManage from "../../../assets/image/answer_manage.jpg"


const DepartmentHeadHome = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className="flex items-center justify-center min-h-screen">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    <div className="bg-white p-2 rounded-lg shadow-md border hover:bg-blue-100 mx-auto"
                        onClick={() => navigate('/department-head/users')}>
                        <img src={userManage} alt="" className="w-60 h-60 rounded-lg" />
                        <p className="font-roboto text-lg font-semibold text-center text-primary mt-2">Quản lý nhân sự</p>
                    </div>
                    <div className="bg-white p-2 rounded-lg shadow-md border hover:bg-blue-100"
                        onClick={() => navigate('/department-head/fields')}>
                        <img src={fieldManage} alt="" className="w-60 h-60 rounded-lg" />
                        <p className="font-roboto text-lg font-semibold text-center text-primary mt-2">Quản lý Lĩnh vực</p>
                    </div>
                    <div className="bg-white p-2 rounded-lg shadow-md border hover:bg-blue-100"
                        onClick={() => navigate('/department-head/questions')}>
                        <img src={questionManage} alt="" className="w-60 h-60 rounded-lg" />
                        <p className="font-roboto text-lg font-semibold text-center text-primary mt-2">Danh sách câu hỏi</p>
                    </div>
                    {/* <div className="bg-white p-2 rounded-lg shadow-md border hover:bg-blue-100">
                        <img src={statistic} alt="" className="w-60 h-60 rounded-lg" />
                        <p className="font-roboto text-lg font-semibold text-center text-primary mt-2">Thống kê</p>
                    </div> */}
                    <div className="bg-white p-2 rounded-lg shadow-md border hover:bg-blue-100"
                        onClick={() => navigate('/department-head/answers')}>
                        <img src={ansManage} alt="" className="w-60 h-60 rounded-lg" />
                        <p className="font-roboto text-lg font-semibold text-center text-primary mt-2">Duyệt câu trả lời</p>
                    </div>
                    <div className="bg-white p-2 rounded-lg shadow-md border hover:bg-blue-100"
                        onClick={() => navigate('/department-head/faqs')}>
                        <img src={faqManage} alt="" className="w-60 h-60 rounded-lg" />
                        <p className="font-roboto text-lg font-semibold text-center text-primary mt-2">FAQs</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DepartmentHeadHome