import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from "../SideBar/Sidebar"

const MailPage = () => {
  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default MailPage;
