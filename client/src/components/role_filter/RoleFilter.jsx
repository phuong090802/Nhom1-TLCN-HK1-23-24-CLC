const RoleFilter = ({ handleFilter }) => {
    return (
        <select className="border p-2 rounded" onChange={e => handleFilter(e)}>
            <option value="">Role</option>
            <option value="counsellor">Tư vấn viên</option>
            <option value="user">Người dùng</option>
            <option value="departmentHead">Trưởng khoa</option>
            <option value="supervisor">Giám sát viên</option>
        </select>
    )
}

export default RoleFilter