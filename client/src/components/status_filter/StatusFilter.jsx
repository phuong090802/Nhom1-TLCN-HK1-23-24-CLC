const StatusFilter = ({ handleFilter }) => {
    return (
        <select className="border p-2 rounded" onChange={e => handleFilter(e)}>
            <option value="all">Trạng thái</option>
            <option value="enabled">Hoạt động</option>
            <option value="disabled">Dừng hoạt động</option>
        </select>)
}

export default StatusFilter