import { useDispatch, useSelector } from "react-redux"
import Filter from "../../../components/filter"
import StaffModuleHeader from "../../../components/staff_module_header/StaffModuleHeader"
import { errorMessage, hideLoading, showLoading, successMessage } from "../../../redux/slices/commonSlice"
import { acceptAnswer, getWaitingAnswer, refuseAnswer } from "../../../service/dephead_service/depAnswerService"
import { useEffect, useState } from "react"
import Table from "../../../components/table"
import { depHAnswerList, depHAnswerListPages } from "../../../redux/selectors/depHeadSelector"
import { setAnswerList, setOnInteractingAnswerId, setTotalPage } from "../../../redux/slices/department_head/depHeadAnswerSlice"
import Pagination from "../../../components/pagination"
import WatingAnswerModal from "../../../features/waiting_answer_modal/WatingAnswerModal"
import { counsellorOwnField } from "../../../service/counsellor_service/counsellorQuestionService"
import { collumns } from './const'

const DepartmentHeadAnswer = () => {

    const dispatch = useDispatch()
    const answerList = useSelector(depHAnswerList)
    const totalPage = useSelector(depHAnswerListPages)

    const [showDetailAnswer, setShowDetailAnswer] = useState(false)
    const [params, setParams] = useState({ page: 0, size: 5 })
    const [fields, setFields] = useState([])

    const [fieldFilterOptions, setFieldFilterOptions] = useState([])



    useEffect(() => {
        getWaitingAnswerData()
        if (fields.length === 0)
            getDepField()
    }, [params])

    const getWaitingAnswerData = async () => {
        dispatch(showLoading())

        try {
            const response = await getWaitingAnswer(params)

            if (response.success) {
                dispatch(setAnswerList(response.data.items))
                dispatch(setTotalPage(response.data.pages))
            } else {
                dispatch(errorMessage(response?.message ? response.message : 'Có lỗi xảy ra'))

            }
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Có lỗi xảy ra'))
        } finally {
            dispatch(hideLoading())
        }
    }





    const getDepField = async () => {
        dispatch(showLoading())

        try {
            const response = await counsellorOwnField()
            if (response.success) {
                setFieldFilterOptions(response.data.map((opt) => {
                    return { key: opt.name, value: opt.id }
                }))
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
        <>
            {showDetailAnswer &&
                <WatingAnswerModal
                    handleClose={() => setShowDetailAnswer(false)}
                    onDataChange={getWaitingAnswerData} />}
            <StaffModuleHeader role={'departmentHead'} moduleTitle={'Duyệt câu trả lời'} >
                <div className="grid grid-cols-1 lg:grid-cols-2 my-4">
                    <div className="md:flex space-x-2 mb-2 lg:mb-0 hidden">

                    </div>
                    <div className="flex justify-start lg:justify-end space-x-4">
                        <Filter data={[{ key: 'Tất cả', value: '' }, ...fieldFilterOptions]} params={params} setParams={setParams} name={'fieldId'} />
                    </div>
                </div>
                <Table
                    collumns={collumns}
                    data={answerList}
                    page={params.page}
                    size={params.size}
                    action={true}
                    onDetail={(id) => {
                        dispatch(setOnInteractingAnswerId(id))
                        setShowDetailAnswer(true)
                    }}
                />

                <Pagination
                    params={params}
                    setParams={setParams}
                    totalPage={totalPage} />
            </StaffModuleHeader>
        </>
    )
}

export default DepartmentHeadAnswer