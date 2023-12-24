import { useEffect, useState } from "react"
import { getCounsellorList } from "../../../service/auth_service/authenticate"
import Table from "../../../components/table"
import Pagination from "../../../components/pagination"

const CounsellorList = () => {

    const [params, setParams] = useState({ size: 5, page: 0 })


    const [counsellorList, setCounsellorList] = useState([])

    const [totalPage, setTotalPage] = useState('')

    const collumns = [
        { key: "name", header: "Tên tư vấn viên" },
        { key: "email", header: "Email" },
        { key: "phone", header: "Số điện thoại" },
    ]

    useEffect(() => {
        getCounsellorListData()
    }, [params])

    const getCounsellorListData = async () => {
        try {
            const response = await getCounsellorList(params)
            console.log(response.data.items);
            setCounsellorList(response.data.items)
            setTotalPage(response.data.pages)
        } catch (error) {

        }
    }

    return <>
        <div className="w-[70%] mx-auto pt-20">
            <h1 className="text-xl font-bold text-center text-gray-600 mb-5">Danh sách tư vấn viên</h1>
            <Table
                collumns={collumns}
                data={counsellorList}
                size={params.size}
                page={params.page}
            />
        </div>
        <Pagination 
            params={params}
            setParams={setParams}
            totalPage={totalPage}
        />
    </>
}

export default CounsellorList