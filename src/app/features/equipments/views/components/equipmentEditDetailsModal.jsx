import React from 'react';
import { useContext } from 'react';
import { stringDateToInputDate } from '../../../../core/functions/dateHandler';
import Modal from '../../../../core/utils/modal';
import { EquipmentsContext } from '../../contexts/equipmentsContext';
import Carousel from 'react-bootstrap/Carousel';

const EquipmentEditDetailsModal = () => {
  const context = useContext( EquipmentsContext );
  const { onCheckFromDMMI, showEquipment, productTypes, companies, companyPick, branches, equipmentUpdateDetails } = context;
  const equipment = showEquipment

  if(equipment === null) return

  return (
    <Modal id="equipment-edit-details-modal" title="Edit Details">
      <form action="#" method="post" id='admin-add-form'>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id='name' className="form-control" value={equipment.name} />
        </div>
        <div className="form-group">
          <label htmlFor="product-type">Type</label>
          <select name="product-type" id="product-type" className='form-select'>
            { productTypes.map( productType => 
              equipment.productType.id === productType.id ?
                <option value={productType.id} key={productType.id} selected>{productType.name}</option>  
              :
                <option value={productType.id} key={productType.id}>{productType.name}</option>  
            )}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="installed-date">Installed Date</label>
          <input type="date" name="installed-date" id="installed-date" className='form-control' defaultValue={stringDateToInputDate(equipment.installedDate)}/>
        </div>
        <div className="form-group check d-flex">
          <input className="form-check-input" type="checkbox" value="" id="is-from-dmmi" onChange={onCheckFromDMMI} />
          <label className="form-check-label" htmlFor="is-from-dmmi">
            Is the Equipment From DMMI?
          </label>
        </div>
        <div className={"form-group " + (equipment.brand === "DMMI" ? "hide" : "")}>
          <label htmlFor="brand">Brand</label>
          <input type="text" name="brand" id="brand" className="form-control" placeholder='Optional...' value={equipment.brand === "DMMI" || equipment.brand === "EXISTING" ? "" : equipment.brand} />
        </div>
        <div className="form-group">
          <label htmlFor="company">Company</label>
          <select name="company" id="company" className="form-select" dafaultValue={equipment.branch.companyId} onChange={companyPick}>
            { companies.map( company => 
              <option value={company.id} key={company.id}>{company.name}</option>  
            )}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="branch">Branch</label>
          <select name="branch" id="branch" className="form-select" defaultValue={equipment.branch.id}>
            { branches.map( branch => 
              <option value={branch.id} key={branch.id}>{branch.name}</option>  
            )}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea name="description" id="description" cols="30" rows="10" className="form-control">{equipment.description}</textarea>
        </div>
        <div className="images">
          <div className="label">Current Images</div>
          <Carousel variant="dark">
            {equipment.images.length > 0 ?
              equipment.images.map(image => 
                <Carousel.Item key={image}>
                  <img src={image} alt="" />
                </Carousel.Item>
              )
              :
              <Carousel.Item>
                <div className="not-available">
                  <i className="bi bi-file-earmark-image"></i>
                  <div className="label">IMAGE NOT AVAILABLE</div>
                </div>
              </Carousel.Item>
            }
          </Carousel>
        </div>
        <div className="form-group">
          <label htmlFor="images">Images</label>
          <input type="file" name="images" id="images" className='form-control' multiple/>
        </div>
        <center>
          <button className="btn btn-primary btn-sm" onClick={equipmentUpdateDetails}>Update</button>
        </center>
      </form>
    </Modal>
  )
}

export default EquipmentEditDetailsModal;