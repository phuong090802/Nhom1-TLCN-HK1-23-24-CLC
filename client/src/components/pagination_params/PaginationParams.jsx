import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const PaginationParams = ({ params, setParams, totalPage }) => {

    const [searchParams, setSearchParams] = useSearchParams()

    const currPage = searchParams.get('page') ? Number(searchParams.get('page')) : 0
    

    useEffect(() => {
        setParams({
            ...params,
            page: currPage
        })
    }, [currPage])

    const handlePage = (page) => {
        setSearchParams({ page: page })
    }



    return (
        <div className="w-full justify-center flex mt-5">
            {(params.page !== 0 && totalPage) &&
                <button className="text-center bg-slate-400 text-white rounded-md mx-1"
                    onClick={() => handlePage(0)}
                >
                    <FirstPageIcon className='' />
                </button>
            }
            {(params.page - 1 > 0 && totalPage) &&
                <button className="text-center px-2 rounded-md mx-1 hover:bg-slate-300"
                    onClick={() => handlePage(Number(params.page) - 2)}>{Number(params.page) - 1}</button>}

            {
                (Number(params.page) > 0 && totalPage) &&
                <button className="text-center px-2 rounded-md mx-1 hover:bg-slate-300"
                    onClick={() => handlePage(Number(params.page) - 1)}>{Number(params.page)}</button>
            }
            {
                <button className="text-center bg-dark_blue text-white px-2 rounded-md mx-1">{Number(params.page) + 1}</button>
            }
            {
                (Number(params.page) + 2 <= totalPage && totalPage !== 0) &&
                <button className="text-center px-2 rounded-md mx-1 hover:bg-slate-300"
                    onClick={() => handlePage(Number(params.page) + 1)}>{Number(params.page) + 2}</button>
            }
            {
                (Number(params.page) + 3 <= totalPage && totalPage !== 0) &&
                <button className="text-center px-2 rounded-md mx-1 hover:bg-slate-300"
                    onClick={() => handlePage(Number(params.page) + 2)}>{Number(params.page) + 3}</button>
            }
            {
                (totalPage - 1 !== params.page && totalPage !== 0) &&
                <button className="text-center bg-slate-400 text-white rounded-md mx-1"
                    onClick={() => handlePage(totalPage - 1)}>
                    <LastPageIcon className='' />
                </button>
            }

        </div >
    )
}
export default PaginationParams