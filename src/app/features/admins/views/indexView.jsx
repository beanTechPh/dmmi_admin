import React, { Component } from 'react';
import AdminsContextProvider, { AdminsContext } from '../contexts/adminsContext';
import "../stylesheets/index.scss";
import AdminTableRows from './components/adminTableRows';

class AdminsIndexView extends Component {
  state = {  } 
  render() { 
    return (
      <AdminsContextProvider>
        <div id="admins-page" className='page-container'>
          <h1 className="title">Admins</h1>
          <div className="custom-card filter-container">
            <div className="d-flex">
              <div className="search">
                <i className="bi bi-search"></i>
                <AdminsContext.Consumer>{ context => {
                  const { query } = context

                  return (
                    <input type="text" name="search" id='search' className='form-control' placeholder='Search Admin...' autoComplete='off' onKeyUp={e => query()} />
                  )
                }}</AdminsContext.Consumer>
              </div>
              <div className="actions d-flex justify-content-end">
                <button className='btn btn-primary btn-sm'>Add</button>
              </div>
            </div>
          </div>
          <table className="table data-table">
            <thead className="table-dark">
              <tr>
                <th className='name'>Name</th>
                <th className='email'>Email</th>
                <th className="mobile-no">Mobile No</th>
                <th className="address">Address</th>
              </tr>
            </thead>
            <tbody>
              <AdminTableRows/>
            </tbody>
          </table>
        </div>
      </AdminsContextProvider>
    );
  }
}
 
export default AdminsIndexView;