export const getForwardLink = (role) => {
    switch (role) {
        case 'ROLE_ADMIN':
            return '/admin/home'
        case 'ROLE_SUPERVISOR':
            return '/supervisor/home'
        case 'ROLE_DEPARTMENT_HEAD':
            return '/department-head/home'
        case 'ROLE_COUNSELLOR':
            return '/counsellor/home'
        case 'ROLE_USER':
            return '/'
        default:
            return '/'
    }
}
export const getRole = (role) => {
    switch (role) {
        case 'admin':
            return 'ROLE_ADMIN'
        case 'supervisor':
            return 'ROLE_SUPERVISOR'
        case 'departmentHead':
            return 'ROLE_DEPARTMENT_HEAD'
        case 'counsellor':
            return 'ROLE_COUNSELLOR'
        case 'user':
            return 'ROLE_USER'
        default:
            return 'ROLE_GUEST'
    }
}