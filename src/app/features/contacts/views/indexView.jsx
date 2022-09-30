import React, { Component } from 'react';
import Pagination from '../../../core/utils/pagination';
import ContactsContextProvider, { ContactsContext } from '../contexts/contactsContext';
import ContactTableRows from './components/contactTableRows';
import "../stylesheets/index.scss";

class ContactsIndexView extends Component {
  state = {  } 
  render() { 
    return (
      <ContactsContextProvider>
        <div id="contacts-page" className='page-container'>
          <h1 className="title">Contacts From Website</h1>
          <div className="custom-card filter-container">
            <div className="d-flex">
              <div className="search">
                <i className="bi bi-search"></i>
                <ContactsContext.Consumer>{ context => {
                  const { query } = context

                  return (
                    <input type="text" name="search" id='search' className='form-control' placeholder='Search Admin...' autoComplete='off' onKeyUp={e => query()} />
                  )
                }}</ContactsContext.Consumer>
              </div>
              <div className="actions d-flex justify-content-end">
              </div>
            </div>
          </div>
          <table className="table data-table">
            <thead className="table-dark">
              <tr>
                <th className='name'>Name</th>
                <th className='company'>Company</th>
                <th className='email'>Email</th>
                <th className="mobile-no">Mobile No</th>
                <th className="message">Message</th>
              </tr>
            </thead>
            <tbody>
              <ContactTableRows/>
            </tbody>
          </table>
          <ContactsContext.Consumer>{context => {
            const { contactsPage, contactsTotalPage, query } = context 

            return(
              <Pagination page={contactsPage} totalPage={contactsTotalPage} query={query} />
            )
          }}</ContactsContext.Consumer>
        </div>
      </ContactsContextProvider>
    );
  }
}
 
export default ContactsIndexView;