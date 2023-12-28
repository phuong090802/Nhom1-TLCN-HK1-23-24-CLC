import { useDispatch, useSelector } from "react-redux"
import { depHInteractingUser } from "../../redux/selectors/depHeadSelector"
import { useEffect, useState } from "react"
import { errorMessage, hideLoading, showLoading, successMessage } from "../../redux/slices/commonSlice"
import { addFieldsToCounsellor, getCounsellorById, getFieldCounsellorNotHave } from "../../service/dephead_service/depCounsellorService"
import CounsellorProfileModal from "../../features/counsellor_profile_modal"
import MultiFieldsAddModal from "../multi_fields_add_modal/MultiFieldsAddModal"
import AddCounFieldsModal from "../add_coun_fields_modal/AddCounFieldsModal"

const DepHeadDetailCounModal = ({ handleClose }) => {
    const dispatch = useDispatch()

    const counsellorId = useSelector(depHInteractingUser)

    const [counsellorProfile, setCounsellorProfile] = useState({})
    const [fieldList, setFieldList] = useState([])
    const [showInfor, setShowInfor] = useState(true)
    useEffect(() => {
        getCounsellorProfile()
    }, [])

    const getCounsellorProfile = async () => {
        dispatch(showLoading())
        try {
            const counResponse = await getCounsellorById(counsellorId)
            if (counResponse.success)
                setCounsellorProfile(counResponse.data)
            else
                dispatch(errorMessage(counResponse?.message ? counResponse.message : 'Lỗi lấy dữ liệu tư vấn viên (DepdetailModal)'))
            const fieldResponse = await getFieldCounsellorNotHave(counsellorId)
            if (fieldResponse.success)
                setFieldList(fieldResponse.data)
            else
                dispatch(errorMessage(fieldResponse?.message ? fieldResponse.message : 'Lỗi lấy dữ liệu lĩnh vực (DepdetailModal)'))
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Lỗi lấy dữ liệu tư vấn viên (DepdetailModal)'))
        } finally {
            dispatch(hideLoading())
        }
    }



    return (
        showInfor ?
            <CounsellorProfileModal
                handleClose={handleClose}
                counsellorProfile={counsellorProfile}
                toggle={() => setShowInfor(false)} />
            :
            <AddCounFieldsModal
                handleClose={handleClose}
                initFieldList={fieldList}
                counsellorId={counsellorId}
                toggle={() => setShowInfor(true)}
                dataOnChange={getCounsellorProfile} />
    )
}
export default DepHeadDetailCounModal