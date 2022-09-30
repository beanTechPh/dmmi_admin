import React from 'react';
import { useContext } from 'react';
import { ContactsContext } from '../../contexts/contactsContext';

const ContactTableRows = () => {
  const context = useContext( ContactsContext );
  const { contacts } = context;

  if(contacts.length > 0){
    return (
      <React.Fragment>
        {contacts.map( contact => 
          <tr key={contact.id}>
            <td className='name'>{contact.name}</td>
            <td className='company'>{contact.company}</td>
            <td className='email'>{contact.email}</td>
            <td className="mobile-no">{contact.mobileNo}</td>
            <td className="message">{contact.message}</td>
          </tr>
        )}
      </React.Fragment>
    )
  }else{
    return (
      <tr className="empty-table">
        <td colSpan={5}>
          <img src={require("../../../../core/images/empty-table.png")} alt="" />
          <h3>No Data</h3>
        </td>
      </tr>
    )
  }
}

export default ContactTableRows;