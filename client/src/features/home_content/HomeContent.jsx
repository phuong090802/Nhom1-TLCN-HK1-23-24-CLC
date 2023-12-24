import HomeIcon from '@mui/icons-material/Home';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import QuestionBox from '../../components/question_box/QuestionBox';
import { useDispatch, useSelector } from 'react-redux';
import { errorMessage, hideLoading, showLoading } from '../../redux/slices/commonSlice';
import { getQuestionList } from '../../service/public_service/publicQuestionService';
import { useEffect, useState } from 'react';
import { setQuestionList, setTotalPage } from '../../redux/slices/public/questionSlice';
import { questionList, questionListPages } from '../../redux/selectors/publicSelector';
import Filter from '../../components/filter/Filter';
import { getDepList } from '../../service/admin_service/adminUserService';
import { useNavigate } from 'react-router';
import PaginationParams from '../../components/pagination_params/PaginationParams';
import { useSearchParams } from 'react-router-dom';
import { increaseView } from '../../service/counsellor_service/counsellorQuestionService';
import Loading from '../../components/loading_component/Loading';


const HomeContent = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [searchParams, setSearchParams] = useSearchParams()

    const totalPage = useSelector(questionListPages)

    const currPage = searchParams.get('page') ? Number(searchParams.get('page')) : 0

    const initParams = { size: 10, page: currPage }

    const [params, setParams] = useState(initParams)
    const questions = useSelector(questionList)
    const [depList, setDepList] = useState([])
    const [title, setTitle] = useState('Tất cả khoa')
    const [isLoad, setIsLoad] = useState(false)

    useEffect(() => {
        getQuestionData()
        if (depList.length === 0) {
            getDepListData()
        }
    }, [params])

    const getQuestionData = async () => {
        setIsLoad(true)

        try {
            const response = await getQuestionList(params)
            if (response.success) {
                dispatch(setQuestionList(response.data.items))
                dispatch(setTotalPage(response.data.pages))
            } else {
                dispatch(errorMessage(response?.message ? response.message : 'Lỗi lấy dữ liệu'))
            }
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Lỗi lấy dữ liệu'))
        } finally {
            setIsLoad(false)
        }
    }

    const getDepListData = async () => {
        try {
            const response = await getDepList()
            setDepList(response.data)
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Lỗi lấy dữ liệu'))
        }
    }

    const handleDepFilter = (id) => {
        if (params.departmentId === id) return
        if (!params?.departmentId && id === '') return
        else if (params?.departmentId && id === '') {
            setParams(Object.fromEntries(Object.entries(params).filter(([key, value]) => key !== 'departmentId')))
            setSearchParams({ page: 0 })
        } else {
            setParams({ ...params, departmentId: id })
            setSearchParams({ page: 0 })
        }
    }

    const handleQuestionClick = async (id) => {
        try {
            await increaseView(id)
        } catch (error) {

        } finally {
            navigate(`/question/${id}`)
        }
    }

    return (
        <>
            <div className="grid grid-cols-4 w-[95%] mx-auto gap-2 my-3">
                <div className="border rounded-t-lg p-1 pl-3 col-span-4 flex items-center text-white bg-dark_blue/80">
                    <HomeIcon />
                    <ChevronRightIcon />
                    <p className='inline-block text-lg font-bold'>Hỏi đáp</p>
                </div>
                <div className="col-span-3">
                    <div className='w-full bg-[#EEEEEE] flex justify-between '>
                        <p className='w-fit p-2 font-bold rounded-t-lg px-10 border-b text-white bg-dark_blue/80'>{title}</p>
                    </div>
                    <div className='bg-white rounded-r-lg rounded-b-lg shadow-lg border border-dark_blue/30'>
                        {
                            isLoad ?
                                <Loading />
                                :
                                (questions.length === 0) ?
                                    <div className='flex justify-center text-gray-600 py-24 mt-3 rounded-md font-bold text-xl'>
                                        Chưa có câu hỏi nào!!
                                    </div>
                                    :
                                    questions.map((ques, i) => {
                                        return <QuestionBox key={i} question={ques} handleQuestionClick={handleQuestionClick} />
                                    })
                        }
                        <div className='w-full flex py-5'>
                            <PaginationParams params={params} setParams={setParams} totalPage={totalPage} />
                        </div>
                    </div>
                </div>
                <div className="h-fit ">
                    <div className='w-full bg-[#eee] flex justify-between rounded-t-lg'>
                        <p className='w-fit p-2 font-semibold px-5  rounded-t-lg border-b text-white bg-dark_blue/80'>Khoa</p>
                    </div>
                    <div className='rounded-r-lg overflow-hidden border shadow-lg border-dark_blue/30 rounded-b-lg'>
                        <div className='h-[366px] bg-white overflow-y-auto rounded-r-lg  '>
                            <div
                                className={`p-1 mb-[2px] text-sm font-bold border-b w-full px-2 cursor-pointer hover:bg-[#d8e8f5] duration-300 py-2 text-gray-600 ${(!params.departmentId) ? 'bg-[#d8e8f5]' : ''}`}
                                onClick={() => {
                                    handleDepFilter('')
                                    setTitle('Tất cả khoa')
                                }}>
                                Tất cả khoa
                            </div>
                            {depList.map((dep, i) => {
                                return (
                                    <div
                                        key={dep.id}
                                        className={`p-1 mb-[2px] text-sm font-bold text-gray-600 border-b w-full px-2 cursor-pointer hover:bg-[#d8e8f5] duration-300 py-2 ${(params.departmentId === dep.id) ? 'bg-[#d8e8f5]' : ''}`}
                                        onClick={() => {
                                            handleDepFilter(dep.id)
                                            setTitle(dep.name)
                                        }}>
                                        {dep.name}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}


export default HomeContent


