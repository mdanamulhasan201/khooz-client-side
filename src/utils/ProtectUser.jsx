

import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectUser = () => {
    const { userInfo } = useSelector(state => state.auth)
    if (userInfo) {
        return <Outlet></Outlet>
    } else {
        return <Navigate to='/login' replace={true}></Navigate>
    }
}

export default ProtectUser;