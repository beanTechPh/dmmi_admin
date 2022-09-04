import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarComponent from './sidebar';

const Layout = () => {

  return (
    <React.Fragment>
      <div className='d-flex app-content'>
        <SidebarComponent/>
        <div className="body">
          <Outlet />
        </div>
      </div>
    </React.Fragment>
  )
}

export default Layout;