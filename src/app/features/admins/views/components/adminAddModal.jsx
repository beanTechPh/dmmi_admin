import React from 'react';
import { useContext } from 'react';
import Modal from '../../../../core/utils/modal';
import { AdminsContext } from '../../contexts/adminsContext';

const AdminAddModal = () => {
  const context = useContext( AdminsContext );
  const { addAdmin } = context;

  return (
    <Modal id="admin-add-modal" title="Add Admin">
      <p className='caption'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem soluta recusandae numquam amet expedita officia. Eveniet ipsum necessitatibus laboriosam architecto officiis!</p>
      <form action="#" method="post" id='admin-add-form'>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" className="form-control" />
        </div>
        <center>
          <button className="btn btn-primary" onClick={addAdmin}>Send Invite</button>
        </center>
      </form>
    </Modal>
  )
}

export default AdminAddModal;