import { useEffect, useState } from "react";
import Filter from "../../../components/filter";
import StaffButton from "../../../components/staff_button/StaffButton"
import StaffModuleHeader from "../../../components/staff_module_header/StaffModuleHeader"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch, useSelector } from "react-redux";
import { errorMessage, hideLoading, showLoading, successMessage } from "../../../redux/slices/commonSlice";
import { deleteFaq, getFaqList } from "../../../service/dephead_service/depHeadFaqService";
import Table from "../../../components/table";
import { depHFaqList, depHFaqListPages } from "../../../redux/selectors/depHeadSelector";
import { setFaqList, setTotalPage } from "../../../redux/slices/department_head/depHeadFaqsSlice";
import Pagination from "../../../components/pagination";
import CreateFaqModal from "../../../features/create_faq_modal/CreateFaqModal";
import FaqDetailModal from "../../../features/faq_deatil_modal/FaqDetailModal";
import { counsellorOwnField } from "../../../service/counsellor_service/counsellorQuestionService";



const DepartmentHeadFaqs = () => {

    const dispatch = useDispatch()

    const faqList = useSelector(depHFaqList)

    const totalPage = useSelector(depHFaqListPages)

    const [params, setParams] = useState({ page: 0, size: 5, department: 'all' })
    const [showCreateFaq, setShowCreateFaq] = useState(false)
    const [showDetailFaq, setShowDetailFaq] = useState(false)
    const [faq, setFaq] = useState({})
    const [fieldList, setFieldList] = useState([])


    useEffect(() => {
        getFaqListData()
        getFieldData()
    }, [params])


    const collumns = [
        { key: "title", header: "Tiêu đề" },
    ]

    const getFaqListData = async () => {

        dispatch(showLoading())

        try {
            const response = await getFaqList(params)
            if (response.success) {
                dispatch(setFaqList(response.data.items))
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

    const handledeleteFaq = async (id) => {
        if (!confirm('Bạn có chắc muốn xóa câu hỏi này?')) return

        dispatch(showLoading())

        try {
            const response = await deleteFaq(id)
            if (response.success) {
                dispatch(successMessage(response?.message ? response.message : 'Xóa Faq thành công'));
                getFaqListData()
            } else {
                dispatch(errorMessage(response?.message ? response.message : 'Có lỗi xảy ra'))
            }
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Có lỗi xảy ra'))
        } finally {
            dispatch(hideLoading())
        }
    }

    const getFieldData = async () => {
        dispatch(showLoading())

        try {
            const response = await counsellorOwnField()
            console.log(response);

            if (response.success) {
                setFieldList(response.data.map((field) => {
                    return { key: field.name, value: field.id }
                }))
            }
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Có lỗi xảy ra'))
        } finally {
            dispatch(hideLoading())
        }
    }

    return (
        <>
            {showCreateFaq &&
                <CreateFaqModal
                    handleClose={() => setShowCreateFaq(false)}
                    fieldList={fieldList}
                    dataChange={getFaqListData} />}
            {showDetailFaq &&
                <FaqDetailModal
                    handleClose={() => setShowDetailFaq(false)}
                    faq={faq}
                    dataChange={getFaqListData} />
            }
            <StaffModuleHeader role={'departmentHead'} moduleTitle={'Quản lý FAQs'} >
                <div className="grid grid-cols-1 lg:grid-cols-2 my-4">
                    <div className="flex space-x-2 mb-2 lg:mb-0">
                        <StaffButton oC={() => setShowCreateFaq(true)}>
                            <AddCircleOutlineIcon className="mb-1 mr-1" />Thêm FAQs
                        </StaffButton>
                    </div>
                    <div className="flex justify-start lg:justify-end space-x-4">
                        <Filter params={params} setParams={setParams} data={fieldList} name={'fieldId'} />
                    </div>
                </div>
                <Table
                    data={faqList}
                    page={params.page}
                    size={params.size}
                    collumns={collumns}
                    action={true}
                    onDetail={(id) => {
                        setShowDetailFaq(true)
                        setFaq(faqList.find((faq) => {
                            return faq.id === id
                        }));
                    }}
                    onDelete={handledeleteFaq} />
                <Pagination params={params} setParams={setParams} totalPage={totalPage} />
            </StaffModuleHeader>
        </>
    )
}

export default DepartmentHeadFaqs