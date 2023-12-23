import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';

const Pagination = ({ params, setParams, totalPage }) => {

    const handlePage = (page) => {
        setParams({
            ...params,
            page: page
        })
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
                    onClick={() => handlePage(params.page - 2)}>{params.page - 1}</button>}

            {
                (params.page > 0 && totalPage) &&
                <button className="text-center px-2 rounded-md mx-1 hover:bg-slate-300"
                    onClick={() => handlePage(params.page - 1)}>{params.page}</button>
            }
            {
                <button className="text-center bg-dark_blue text-white px-2 rounded-md mx-1">{params.page + 1}</button>
            }
            {
                (params.page + 2 <= totalPage && totalPage !== 0) &&
                <button className="text-center px-2 rounded-md mx-1 hover:bg-slate-300"
                    onClick={() => handlePage(params.page + 1)}>{params.page + 2}</button>
            }
            {
                (params.page + 3 <= totalPage && totalPage !== 0) &&
                <button className="text-center px-2 rounded-md mx-1 hover:bg-slate-300"
                    onClick={() => handlePage(params.page + 2)}>{params.page + 3}</button>
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
export default Pagination