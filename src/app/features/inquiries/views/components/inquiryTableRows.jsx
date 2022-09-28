import React from 'react';
import { useContext } from 'react';
import { InquiriesContext } from '../../contexts/inquiriesContext';

const InquiryTableRows = () => {
  const context = useContext( InquiriesContext );
  const { inquiries, inquiryTableRowClick } = context;

  if(inquiries.length > 0){
    return (
      <React.Fragment>
        {inquiries.map( inquiry => 
          <tr key={inquiry.id} onClick={e => inquiryTableRowClick(inquiry)}>
            <td className='date'>{inquiry.date}</td>
            <td className='company'>{inquiry.company.name}</td>
            <td className='subject'>{inquiry.subject}</td>
            <td className='last-message'>{inquiry.lastMessage.body}</td>
            <td className="num-unread">
              <div className={inquiry.numUnread === 0 ? '' : 'active'}>
                {inquiry.numUnread}
              </div>
            </td>
          </tr>
        )}
      </React.Fragment>
    )
  }else{
    return (
      <tr className="empty-table">
        <td colSpan={4}>
          <img src={require("../../../../core/images/empty-table.png")} alt="" />
          <h3>No Data</h3>
        </td>
      </tr>
    )
  }
}

export default InquiryTableRows;