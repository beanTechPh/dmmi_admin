import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SidebarContextProvider, { SidebarContext } from '../contexts/sidebarContext';
import '../stylesheets/sidebar.scss';

class SidebarComponent extends Component {
  state = {  } 

  componentDidMount() {
    var tab = window.location.pathname.split('/')[1]
    tab = tab === '' || tab === null || tab === undefined ? 'dashboard' : tab
    document.querySelector(`#sidebar-${tab}`).classList.add('active')
  }

  sidebarMenuClick = (e) => {
    var element = e.target 

    while (!element.tagName === "li") {
      element = element.parentElement
    }

    var activeElements = document.querySelectorAll("#sidebar li.active")
    for (let i = 0; i < activeElements.length; i++) {
      const activeElement = activeElements[i];
      activeElement.classList.remove('active')
    }

    element.classList.add('active')
  }

  render() { 
    return (
      <SidebarContextProvider>
        <div id="sidebar">
          <div className="company-name">
            <img src={require("../images/logo.png")} alt="" />
            <div className="name">DMMI</div>
          </div>
          
          <div className="section">
            <div className="label">Menu</div>
            <div className="menu">
              <ul>
                <Link to={'/'} onClick={this.sidebarMenuClick}>
                  <li className='d-flex' id='sidebar-dashboard'>
                    <img src={require("../images/sidebar/dashboard.png")} alt="" />
                    Dashboard
                  </li>
                </Link>
                {/* <Link to={'/orders'} onClick={this.sidebarMenuClick}>
                  <li className='d-flex' id='sidebar-orders'>
                    <img src={require("../images/sidebar/order.png")} alt="" />
                    Orders
                  </li>
                </Link> */}
                <Link to={'/equipments'} onClick={this.sidebarMenuClick}>
                  <li className='d-flex' id='sidebar-equipments'>
                    <img src={require("../images/sidebar/equipment.png")} alt="" />
                    Equipment
                  </li>
                </Link>
                <Link to={'/inquiries'} onClick={this.sidebarMenuClick}>
                  <li className='d-flex' id='sidebar-inquiries'>
                    <img src={require("../images/sidebar/inquiry.png")} alt="" />
                    Inquiries
                  </li>
                </Link>
                {/* <Link to={'/quotations'} onClick={this.sidebarMenuClick}>
                  <li className='d-flex' id='sidebar-quotations'>
                    <img src={require("../images/sidebar/quotation.png")} alt="" />
                    Quotations
                  </li>
                </Link> */}
                <Link to={'/contacts'} onClick={this.sidebarMenuClick}>
                  <li className='d-flex' id='sidebar-contacts'>
                    <img src={require("../images/sidebar/inquiry.png")} alt="" />
                    Contacts
                  </li>
                </Link>
                <Link to={'/admins'} onClick={this.sidebarMenuClick}>
                  <li className='d-flex' id='sidebar-admins'>
                    <img src={require("../images/sidebar/personnel.png")} alt="" />
                    Admins
                  </li>
                </Link>
              </ul>
            </div>
          </div>

          <div id="logout">
            <SidebarContext.Consumer>{ context => {
              const { logout } = context 

              return (
                <button className="btn btn-primary btn-sm" onClick={logout}>Logout</button>
              )
            }}</SidebarContext.Consumer>
          </div>
        </div>
      </SidebarContextProvider>
    );
  }
}
 
export default SidebarComponent;