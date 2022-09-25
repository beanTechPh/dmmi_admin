import React from 'react';
import { useContext } from 'react';
import { AdminsContext } from '../../contexts/adminsContext';

const AdminTableRows = () => {
  const context = useContext( AdminsContext );
  const { admins } = context;

  if(admins.length > 0){
    return (
      <React.Fragment>
        {admins.map( admin => 
          <tr key={admin.id}>
            <td className='name'>{admin.name}</td>
            <td className='email'>{admin.email}</td>
            <td className="mobile-no">{admin.mobileNo}</td>
            <td className="address">{admin.address}</td>
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

export default AdminTableRows;