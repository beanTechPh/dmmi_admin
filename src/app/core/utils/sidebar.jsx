import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/sidebar.scss';

class SidebarComponent extends Component {
  state = {  } 

  componentDidMount() {
    var tab = window.location.pathname.split('/')[1]
    tab = tab === '' || tab === null || tab === undefined ? 'equipments' : tab
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
      <div id="sidebar">
        <div className="company-name">
          <img src={require("../images/company-icon.png")} alt="" />
          <div className="name">DMMI</div>
        </div>
        
        <div className="section">
          <div className="label">Menu</div>
          <div className="menu">
            <ul>
              {/* <Link to={'/'} onClick={this.sidebarMenuClick}>
                <li className='d-flex' id='sidebar-dashboard'>
                  <img src={require("../images/sidebar/dashboard.png")} alt="" />
                  Dashboard
                </li>
              </Link>
              <Link to={'/orders'} onClick={this.sidebarMenuClick}>
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
              {/* <Link to={'/inquiries'} onClick={this.sidebarMenuClick}>
                <li className='d-flex' id='sidebar-inquiries'>
                  <img src={require("../images/sidebar/inquiry.png")} alt="" />
                  Inquiries
                </li>
              </Link>
              <Link to={'/quotations'} onClick={this.sidebarMenuClick}>
                <li className='d-flex' id='sidebar-quotations'>
                  <img src={require("../images/sidebar/quotation.png")} alt="" />
                  Quotations
                </li>
              </Link> */}
              <Link to={'/employees'} onClick={this.sidebarMenuClick}>
                <li className='d-flex' id='sidebar-employees'>
                  <img src={require("../images/sidebar/personnel.png")} alt="" />
                  Employees
                </li>
              </Link>
            </ul>
          </div>
        </div>

        <div id="logout">
          <button className="btn btn-primary btn-sm">Logout</button>
        </div>
      </div>
    );
  }
}
 
export default SidebarComponent;