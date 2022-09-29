import React, { Component } from 'react';
import Pagination from '../../../core/utils/pagination';
import InquiriesContextProvider, { InquiriesContext } from '../contexts/inquiriesContext';
import InquiryTableRows from './components/inquiryTableRows';
import "../stylesheets/index.scss";
import InquiryCreateModal from './components/inquiryCreateModal';

class InquiriesIndexView extends Component {
  state = {  } 

  inquire = (e) => {
    document.querySelector("#equipment-create-modal").classList.remove('hide')
  }

  render() { 
    return (
      <InquiriesContextProvider>
        <div id="inquiries-page" className='page-container'>
          <h1 className="title">Inquiries</h1>
          <div className="custom-card filter-container">
            <div className="d-flex">
              <div className="search">
                <i className="bi bi-search"></i>
                <InquiriesContext.Consumer>{ context => {
                  const { query } = context

                  return (
                    <input type="text" name="search" id='search' className='form-control' placeholder='Search Inquiry...' autoComplete='off' onKeyUp={e => query()} />
                  )
                }}</InquiriesContext.Consumer>
              </div>
              <div className="actions d-flex justify-content-end">
                <button className="btn btn-sm btn-primary" onClick={this.inquire}>Inquire</button>
              </div>
            </div>
          </div>
          <table className="table data-table">
            <thead className="table-dark">
              <tr>
                <th className='date'>Date</th>
                <th className='company'>Company</th>
                <th className='subject'>Subject</th>
                <th className="last-message">Last Message</th>
                <th className='num-unread'></th>
              </tr>
            </thead>
            <tbody>
              <InquiryTableRows/>
            </tbody>
          </table>
          <InquiriesContext.Consumer>{context => {
            const { inquiriesPage, inquiriesTotalPage, query } = context 

            return(
              <Pagination page={inquiriesPage} totalPage={inquiriesTotalPage} query={query} />
            )
          }}</InquiriesContext.Consumer>
          <InquiryCreateModal/>
        </div>
      </InquiriesContextProvider>
    );
  }
}
 
export default InquiriesIndexView;