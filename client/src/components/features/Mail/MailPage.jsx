import React from 'react'
import Sidebar from '../components/SideBar/Sidebar'
import { Outlet } from 'react-router-dom'

const MailPage = () => {
  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default MailPage;
