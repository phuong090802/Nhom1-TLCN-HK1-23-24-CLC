import { useEffect, useState } from "react"
import StaffModuleHeader from "../../../components/staff_module_header/StaffModuleHeader"
import { useDispatch } from "react-redux"
import { errorMessage, hideLoading, showLoading, successMessage } from "../../../redux/slices/commonSlice"
import { deleteAllFeedbacks, deleteFeedback, getFeedBackList } from "../../../service/counsellor_service/counsellorFeedbackService"
import Table from "../../../components/table"
import Pagination from "../../../components/pagination"
import StaffButton from "../../../components/staff_button/StaffButton"
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { collumns } from './const'

const CounsellorFeedback = () => {

    const [params, setParams] = useState({ page: 0, size: 5 })

    const dispatch = useDispatch()

    const [feedbackList, setFeedBackList] = useState([])

    const [totalPage, setTotalPage] = useState(0)

    useEffect(() => {
        getFeedbackListData()
    }, [])

    const getFeedbackListData = async () => {
        dispatch(showLoading())

        try {
            const response = await getFeedBackList(params)
            setFeedBackList(response.data.items)
            setTotalPage(response.data.pages)

        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Có lỗi xảy ra'))
        }
        dispatch(hideLoading())
    }

    const handleDeleteFeedback = async (id) => {
        dispatch(showLoading())

        try {
            const response = await deleteFeedback(id)
            if (response.success) {
                getFeedbackListData()
            } else {
                dispatch(errorMessage(response?.message ? response.message : 'Có lỗi xảy ra'))
            }

        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Có lỗi xảy ra'))
        }
        dispatch(hideLoading())
    }

    const handleDeleteAllFeedback = async () => {
        dispatch(showLoading())

        try {
            const response = await deleteAllFeedbacks()
            if (response.success) {
                getFeedbackListData()
            } else {
                dispatch(errorMessage(response?.message ? response.message : 'Có lỗi xảy ra'))
            }

        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Có lỗi xảy ra'))
        } finally {
            dispatch(hideLoading())
        }
    }




    return (<>
        <StaffModuleHeader moduleTitle={'Phản hồi từ trưởng khoa'} role={'departmentHead'} >
            <div className="grid grid-cols-1 lg:grid-cols-2 my-4">
                <div className="md:flex space-x-2 mb-2 lg:mb-0 hidden">
                    <StaffButton color='red'
                        oC={handleDeleteAllFeedback}>
                        <div>
                            <DeleteOutlineOutlinedIcon className="mb-1 mr-1" />Đã đọc tất cả
                        </div>
                    </StaffButton>
                </div>
                <div className="flex justify-start lg:justify-end space-x-4">
                </div>
            </div>
            <Table
                data={feedbackList}
                collumns={collumns}
                page={params.page}
                size={params.size}
                action
                onDelete={handleDeleteFeedback}
            />
            <Pagination
                params={params}
                setParams={setParams}
                totalPage={totalPage}
            />
        </StaffModuleHeader>
    </>)
}

export default CounsellorFeedback