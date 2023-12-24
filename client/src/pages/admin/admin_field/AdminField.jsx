import { useEffect, useState } from "react"
import StaffModuleHeader from "../../../components/staff_module_header/StaffModuleHeader"
import StaffButton from "../../../components/staff_button/StaffButton"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchBar from "../../../components/search_bar/SearchBar";
import Filter from "../../../components/filter";
import { useDispatch, useSelector } from "react-redux";
import { errorMessage, hideLoading, showLoading, successMessage } from "../../../redux/slices/commonSlice";
import { createField, getFields, updateFieldStatus } from "../../../service/admin_service/adminFieldService";
import { setField, setTotalPage } from "../../../redux/slices/admin/adminFieldSlice";
import { admFieldList, admFieldPages } from "../../../redux/selectors/adminSelector";
import Pagination from "../../../components/pagination";
import Table from "../../../components/table";
import AdminCreateFieldModal from "../../../features/adm_create_field_modal/AdminCreateFieldModal";
import { collumns, statusFilterOptions, initParams } from './const'

const AdminField = () => {

    const dispatch = useDispatch()

    const totalPage = useSelector(admFieldPages)
    const fieldList = useSelector(admFieldList)

    const [params, setParams] = useState(initParams)
    const [showCreateField, setShowCreateField] = useState(false)

    useEffect(() => {
        getFieldData()
    }, [params])

    const getFieldData = async () => {
        dispatch(showLoading())
        try {
            const response = await getFields(params)
            dispatch(setField(response.data.items))
            dispatch(setTotalPage(response.data.pages))
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Có lỗi xảy ra'))
        } finally {
            dispatch(hideLoading())
        }
    }

    const handleupdateFieldStatus = async (id) => {
        if (!confirm('Bạn muốn đổi trạng thái của lĩnh vực?')) return

        dispatch(showLoading())
        try {
            const response = await updateFieldStatus(id)
            const message = response.data ? 'Đã chuyển trạng thái của lĩnh vực sang hoạt động' : 'Đã chuyển trạng thái của lĩnh vực sang không hoạt động'
            dispatch(successMessage(message))
            getFieldData()
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Có lỗi xảy ra'))
        } finally {
            dispatch(hideLoading())
        }
    }


    return (
        <>
            {showCreateField &&
                <AdminCreateFieldModal
                    handleClose={() => setShowCreateField(false)}
                    dataOnchange={getFieldData} />}
            <StaffModuleHeader moduleTitle={'Quản lí lĩnh vực'} role={'admin'} >
                <div className="grid grid-cols-1 lg:grid-cols-2 my-4">
                    <div className="flex space-x-2 mb-2 lg:mb-0">
                        <StaffButton oC={() => { setShowCreateField(true) }}>
                            <AddCircleOutlineIcon className="mb-1 mr-1"></AddCircleOutlineIcon>
                            Thêm lĩnh vực
                        </StaffButton>
                    </div>
                    <div className="flex justify-start lg:justify-end space-x-4">
                        <SearchBar params={params} setParams={setParams} />
                        <Filter params={params} setParams={setParams} data={statusFilterOptions} name={'status'} />
                    </div>
                </div>

                <Table
                    data={fieldList}
                    collumns={collumns}
                    page={params.page}
                    size={params.size}
                    // action={true}
                    // onUpdate={() => { }}
                    statusUpdate={handleupdateFieldStatus}
                />

                <Pagination params={params} setParams={setParams} totalPage={totalPage} />
            </StaffModuleHeader>
        </>
    )
}
export default AdminField