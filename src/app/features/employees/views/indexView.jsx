import React, { Component } from 'react';
import EmployeesContextProvider, { EmployeesContext } from '../contexts/employeesContext';
import "../stylesheets/index.scss";

class EmployeesIndexView extends Component {
  state = {  } 
  render() { 
    return (
      <EmployeesContextProvider>
        <div id="employees-page" className='page-container'>
          <h1 className="title">Employees</h1>
          <div className="custom-card filter-container">
            <div className="d-flex">
              <div className="search">
                <i className="bi bi-search"></i>
                <EmployeesContext.Consumer>{ context => {
                  const { query } = context

                  return (
                    <input type="text" name="search" id='search' className='form-control' placeholder='Search Order No...' autoComplete='off' onKeyUp={e => query()} />
                  )
                }}</EmployeesContext.Consumer>
              </div>
              <div className="actions d-flex justify-content-end">
                <button className='btn btn-primary btn-sm'>Add</button>
              </div>
            </div>

            <div className="filters d-flex">
              <div className="group d-flex">
                <div className="label">Type:</div>
                <select name="type" id="type-filter" className='form-select'>
                  <option value="">All Types</option>
                </select>
              </div>
              <div className="group d-flex">
                <div className="label">Branch:</div>
                <select name="branch" id="branch-filter" className='form-select'>
                  <option value="">All Branches</option>
                </select>
              </div>
              <div className="group d-flex">
                <div className="label">Brands:</div>
                <select name="brand" id="brand-filter" className='form-select'>
                  <option value="">All Brands</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </EmployeesContextProvider>
    );
  }
}
 
export default EmployeesIndexView;