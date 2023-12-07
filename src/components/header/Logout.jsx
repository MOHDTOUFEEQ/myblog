import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'
import authService from '../../appwrite/auth'
function Logout() {
    const dispatch  = useDispatch()
    const navigate = useNavigate()
    const doingLogout = ()=>{
        authService.logout().then(()=>{
            dispatch(logout())
            navigate("/")
        })
}
    return (
        <button onClick={doingLogout}> Logout </button>
  )
}

export default Logout