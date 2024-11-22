import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'

const AdminProtected = ({children}) => {
     const navigate = useNavigate()
    
    const {isLoggedIn} =useContext(UserContext)
  return (
    isLoggedIn ? children : navigate('/login')
  )
}

export default AdminProtected