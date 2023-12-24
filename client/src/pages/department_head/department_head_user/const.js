
const initParams = {
    page: 0, size: 5
}

const collumns = [
    { key: "name", header: "Tên người dùng" },
    { key: "email", header: "Email" },
    { key: "role", header: "Role" },
    { key: "phone", header: "Số điện thoại" },
    { key: "enabled", header: "Trạng thái" },
]

const statusFilterOptions = [
    { key: 'Trạng thái', value: 'all' },
    { key: 'Hoạt động', value: 'active' },
    { key: 'Dừng hoạt động', value: 'inactive' }
]

export {
    initParams,
    collumns,
    statusFilterOptions
}