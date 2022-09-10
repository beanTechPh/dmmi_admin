import React from 'react';
import { Outlet } from 'react-router-dom';
import FlashComponent from './flash';
import SidebarComponent from './sidebar';

const Layout = () => {

  return (
    <React.Fragment>
      <FlashComponent/>
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