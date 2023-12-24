import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { errorMessage, hideLoading, showLoading } from "../../../redux/slices/commonSlice"
import { getFAQs } from "../../../service/counsellor_service/counsellorQuestionService"
import PaginationParams from "../../../components/pagination_params/PaginationParams"
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useSearchParams } from "react-router-dom"
import Filter from "../../../components/filter"
import { getDepList } from "../../../service/admin_service/adminUserService"
import Loading from "../../../components/loading_component/Loading"

const FaqsPage = () => {
    const dispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams()

    const [isLoad, setIsLoad] = useState(false)
    const [faqList, setFaqList] = useState([])
    const [showAnswer, setShowAnswer] = useState('')
    const page = searchParams.get('page') ? Number(searchParams.get('page')) : 0
    const [params, setParams] = useState({ size: 5 })
    const [totalPage, setTotalPage] = useState(0)
    const [depList, setDepList] = useState([])

    useEffect(() => {
        getFAQList({ ...params, page: page })
        getDepListData()
    }, [params, page])

    const getFAQList = async () => {
        setIsLoad(true)

        try {
            const response = await getFAQs(params)
            setFaqList(response.data.items)
            setTotalPage(response.data.pages)
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Cõ lỗi xảy ra'))
        } finally {
            setIsLoad(false)
        }
    }

    const getDepListData = async () => {
        try {
            const response = await getDepList()
            if (response.success) {
                setDepList(
                    response.data.map((dep, i) => {
                        return { key: dep.name, value: dep.id }
                    })
                )
                console.log(response.data);
            } else {
                dispatch(errorMessage(response?.message ? response.message : 'Lỗi lấy dữ liệu'))
            }
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Lỗi lấy dữ liệu'))
        }
    }

    const handleShowAnswer = (id) => {
        setShowAnswer(id === showAnswer ? '' : id)
    }


    return (
        <div className="bg-white h-[80vh] w-[60%] mx-auto p-8">
            <h1 class="text-3xl font-bold mb-4 ">Câu hỏi thường gặp</h1>
            <div className="w-full flex mb-4 ">
                <Filter name='departmentId' params={params} setParams={setParams} data={[{ key: 'Tất cả khoa', value: 'all' }, ...depList]} />
            </div>
            {
                !isLoad ?
                    (faqList.length !== 0) ?
                        faqList.map((faq, i) => {
                            return (
                                <div key={i} className="mt-2">
                                    <div className="text-gray-600 font-bold text-lg w-full hover:bg-blue-400 hover:text-white cursor-pointer flex items-center duration-300 p-1"
                                        onClick={() => handleShowAnswer(faq.id)}>
                                        {(showAnswer !== faq.id) ?
                                            <ControlPointIcon fontSize='small' className="" /> : <RemoveCircleOutlineIcon fontSize='small' className="" />}
                                        <p>{faq.title}</p>
                                    </div>
                                    <div className={`flex ${(showAnswer === faq.id) ? '' : 'hidden'} items-center text-md ml-5 bg-gray-200 text-gray-600 rounded-md py-2 px-2 mt-1 duration-500`}>
                                        <p dangerouslySetInnerHTML={{ __html: faq.content }}></p>
                                    </div>
                                </div>
                            )
                        })
                        :
                        <div className="mt-2 flex items-center justify-center w-full border rounded-lg">
                            <h1 className="py-5 font-bold text-xl text-gray-600">Không có câu hỏi chung !!!</h1>
                        </div>
                    :
                    <Loading />
            }
            <PaginationParams params={params} setParams={setParams} totalPage={totalPage} />
        </div>)
}

export default FaqsPage