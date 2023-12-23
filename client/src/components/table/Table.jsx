import { toUpperCase } from "../../utils/string"
import Switch from "../switch"
import EditNoteIcon from '@mui/icons-material/EditNote';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { useEffect } from "react";

const Table = ({
    data = [], collumns, page, size, statusUpdate, action = false, onUpdate, onDetail, onDelete, onResponse
}) => {


    return (
        <div className="border rounded-md overflow-hidden shadow-md">
            <table className="w-full">
                <thead className=" bg-dark_blue text-white">
                    <tr>
                        <th >STT</th>
                        {collumns.map((header, i) => {
                            return <th key={i}>{toUpperCase(header.header)}</th>
                        })}
                        {action && <th>HÀNH ĐỘNG</th>
                        }
                    </tr>
                </thead>
                {
                    (data.length !== 0)
                    &&
                    <tbody>
                        {data &&
                            data.map((row, index) => {
                                return (
                                    <tr key={row.id}>
                                        <td className={`${index % 2 === 0 ? '' : 'bg-gray-200'} text-center`}>{page * size + index + 1}</td>
                                        {collumns &&
                                            collumns.map((col, i) => {
                                                return ((col.key !== 'enabled') && (col.key !== 'status'))
                                                    ?
                                                    <td key={i} className={`${index % 2 === 0 ? '' : 'bg-gray-200'} py-3 border-l pl-5`}>{row[col.key]}</td>
                                                    :
                                                    <td key={i} className={`${index % 2 === 0 ? '' : 'bg-gray-200'} py-3 border-l`}>
                                                        <div className="w-full flex justify-center">
                                                            <Switch
                                                                active={row[col.key]}
                                                                oC={statusUpdate}
                                                                id={row.id}></Switch>
                                                        </div>
                                                    </td>
                                            })}
                                        {action && <td className={`${index % 2 === 0 ? '' : 'bg-gray-200'} text-center border-l`}>
                                            <div className="w-full  grid md:grid-cols-2 grid-cols-1 gap-1 md:gap-0">
                                                {onUpdate &&
                                                    <div className={`w-full flex justify-center ${onDetail ? '' : 'col-span-2'}`}>
                                                        <button className="p-1 mx-1 duration-500 bg-yellow-500 hover:bg-yellow-400 text-white rounded-lg"
                                                            onClick={() => onUpdate(row.id)}>
                                                            <EditNoteIcon />
                                                        </button>
                                                    </div>}
                                                {onDetail &&
                                                    <div className={`w-full flex justify-center ${onUpdate || onDelete ? '' : 'col-span-2'}`}>
                                                        <button className="p-1 mx-1 duration-500 bg-blue-500 hover:bg-blue-400 text-white rounded-lg"
                                                            onClick={() => onDetail(row.id)}>
                                                            <InfoOutlinedIcon />
                                                        </button>
                                                    </div>
                                                }
                                                {onDelete &&
                                                    <div className={`w-full flex justify-center ${onDetail ? '' : 'col-span-2'}`}>
                                                        <button className="p-1 mx-1 duration-500 bg-red-500 hover:bg-red-400 text-white rounded-lg"
                                                            onClick={() => onDelete(row.id)}>
                                                            <DeleteOutlineIcon />
                                                        </button>
                                                    </div>}
                                                {onResponse &&
                                                    <div className={`w-full flex justify-center ${onDetail ? '' : 'col-span-2'}`}>
                                                        <button className="p-1 mx-1 duration-500 bg-green-500 hover:bg-green-400 text-white rounded-lg"
                                                            onClick={() => onResponse(row.id)}>
                                                            <QuestionAnswerIcon />
                                                        </button>
                                                    </div>}
                                            </div>
                                        </td>
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                }
            </table>
            {(data.length === 0) &&
                <div className="py-3">
                    <p className="text-center text-gray-400 font-semibold">Không có gì để xem ở đây</p>
                </div>}
        </div>
    )
}
export default Table