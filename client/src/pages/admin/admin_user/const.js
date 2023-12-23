const initParams = { page: 0, size: 10 }
const collumns = [
    { key: "name", header: "Tên người dùng" },
    { key: "email", header: "Email" },
    { key: "phone", header: "Số điện thoại" },
    { key: "occupation", header: "Ngề nghiệp" },
    { key: "role", header: "Role" },
    { key: "enabled", header: "Trạng thái" },
]
const roleFilterOptions = [
    { key: "Role", value: "" },
    { key: "Giám sát viên", value: "supervisor" },
    { key: "Trưởng khoa", value: "departmentHead" },
    { key: "Tư vấn viên", value: "counsellor" },
    { key: "Người dùng", value: "user" },
]
const statusFilterOptions = [
    { key: "Trạng thái", value: "all" },
    { key: "Hoạt động", value: "enabled" },
    { key: "Dừng hoạt động", value: "disabled" },
]

export {
    initParams,
    collumns,
    roleFilterOptions,
    statusFilterOptions
}