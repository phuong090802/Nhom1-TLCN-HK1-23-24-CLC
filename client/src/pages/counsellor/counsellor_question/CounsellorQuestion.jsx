import { useDispatch, useSelector } from "react-redux"
import StaffModuleHeader from "../../../components/staff_module_header"
import { useEffect, useState } from "react"
import { errorMessage, hideLoading, showLoading, successMessage } from "../../../redux/slices/commonSlice"
import { counsellorGetQuestionList, counsellorOwnField, depHGetQuestionList, forwardQuestion, responseQuestion } from "../../../service/counsellor_service/counsellorQuestionService"
import { setTotalPage, setQuestionList, setInteractingQuestionId } from "../../../redux/slices/counsellor/counsellorQuestionSlice"
import Pagination from "../../../components/pagination"
import Table from "../../../components/table"
import { counQuestionList, counQuestionListPages } from "../../../redux/selectors/counsellorSelector"
import Filter from "../../../components/filter"
import ResponseModal from "../../../features/response_modal/ResponseModal"
import { userSelector } from "../../../redux/selectors/authSelector"
import { collumns } from './const'

const CounsellorQuestion = () => {
    const dispatch = useDispatch()

    const [fieldFilterOptions, setFieldFilterOptions] = useState([
        { key: 'Lĩnh vực', value: 'all' },
    ])

    const totalPage = useSelector(counQuestionListPages)
    const questionList = useSelector(counQuestionList)
    const user = useSelector(userSelector)

    const [params, setParams] = useState({ page: 0, size: 5, value: 'all' })
    const [showResponseModal, setShowResponseModal] = useState(false)


    useEffect(() => {
        getQuestionData()
        getFilterData()
    }, [params])

    const getQuestionData = async () => {
        dispatch(showLoading())

        try {
            let response;
            console.log();
            if (user.role === 'ROLE_DEPARTMENT_HEAD') {
                response = await depHGetQuestionList(params)
            } else {
                response = await counsellorGetQuestionList(params)
            }
            dispatch(setQuestionList(response.data.items))
            dispatch(setTotalPage(response.data.pages))

        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Lỗi lấy danh sách câu hỏi'))
        } finally {
            dispatch(hideLoading())
        }
    }

    const getFilterData = async () => {
        dispatch(showLoading())

        try {
            const response = await counsellorOwnField()
            setFieldFilterOptions(response.data.map((field) => {
                return { key: field.name, value: field.id }
            }))

        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Lỗi lấy lĩnh vực lỗi'))
        } finally {
            dispatch(hideLoading())
        }
    }







    return (
        <>{showResponseModal &&
            <ResponseModal
                handleClose={() => setShowResponseModal(false)}
                dataChange={getQuestionData} />}

            <StaffModuleHeader role={'counsellor'} moduleTitle={'Danh sách câu hỏi'} >
                <div className="grid grid-cols-1 lg:grid-cols-2 my-4">
                    <div className="md:flex space-x-2 mb-2 lg:mb-0 hidden">

                    </div>
                    <div className="flex justify-start lg:justify-end space-x-4">
                        <Filter name='value' params={params} setParams={setParams} data={[{ key: 'Lĩnh vực', value: 'all' }, ...fieldFilterOptions,]} />
                    </div>
                </div>

                <Table
                    data={questionList}
                    page={params.page}
                    size={params.size}
                    totalPage={totalPage}
                    collumns={collumns}
                    action={true}
                    onResponse={(id) => {
                        setShowResponseModal(true)
                        dispatch(setInteractingQuestionId(id))
                    }}
                />

                <Pagination params={params} setParams={setParams} totalPage={totalPage} />
            </StaffModuleHeader>
        </>
    )
}

export default CounsellorQuestion