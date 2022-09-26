import React, { Component } from 'react';
import EquipmentsContextProvider, { EquipmentsContext } from '../contexts/equipmentsContext';
import "../stylesheets/edit.scss";
import NewComponents from './components/newComponents';

class EquipmentsEditView extends Component {
  state = {  } 
  render() { 
    return (
      <EquipmentsContextProvider>
        <EquipmentsContext.Consumer>{ context => {
          const { companies, productTypes, branches, companyPick, createEquipment, onCheckFromDMMI } = context 

          return (
            <div id="equipments-edit-page" className="page-container">
              <h1 className="title">Edit Equipment</h1>
              <div className="details custom-card d-flex">
                <div className='section'>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" />
                  </div>
                  <div className="d-flex">
                    <div className="form-group">
                      <label htmlFor="product-type">Type</label>
                      <select name="product-type" id="product-type" className='form-select'>
                        <option value=""></option>
                        { productTypes.map( productType => 
                          <option value={productType.id} key={productType.id}>{productType.name}</option>  
                        )}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="installed-date">Installed Date</label>
                      <input type="date" name="installed-date" id="installed-date" className='form-control' />
                    </div>
                  </div>
                  <div className="form-group check d-flex">
                    <input className="form-check-input" type="checkbox" value="" id="is-from-dmmi" onChange={onCheckFromDMMI}/>
                    <label className="form-check-label" htmlFor="is-from-dmmi">
                      Is the Equipment From DMMI?
                    </label>
                  </div>
                  <div className="form-group hide">
                    <label htmlFor="brand">Brand</label>
                    <input type="text" name="brand" id="brand" className="form-control" placeholder='Optional...' />
                  </div>
                  <div className="d-flex">
                    <div className="form-group">
                      <label htmlFor="company">Company</label>
                      <select name="company" id="company" className="form-select" onChange={companyPick}>
                        <option value=""></option>
                        { companies.map( company => 
                          <option value={company.id} key={company.id}>{company.name}</option>  
                        )}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="branch">Branch</label>
                      <select name="branch" id="branch" className="form-select">
                        <option value=""></option>
                        { branches.map( branch => 
                          <option value={branch.id} key={branch.id}>{branch.name}</option>  
                        )}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="images">Images</label>
                    <input type="file" name="images" id="images" className='form-control' multiple/>
                  </div>
                </div>
                <div className='section'>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" cols="30" rows="10" className="form-control"></textarea>
                  </div>
                </div>
              </div>
              <div className="components custom-card">
                <div className="d-flex header">
                  <h3>Components</h3>
                  <EquipmentsContext.Consumer>{ context => {
                    const { addComponent } = context 

                    return (
                      <button className="btn btn-primary btn-sm" onClick={addComponent}>Add</button>
                    )
                  }}</EquipmentsContext.Consumer>
                </div>
                <div className="d-flex content">
                  <NewComponents />
                </div>
              </div>
              <div className="files custom-card">
                <h3>Files</h3>
                <div className="form-group">
                  <label htmlFor="schematics">Schematics</label>
                  <input type="file" name="schematics" id="schematics" className='form-control' multiple/>
                </div>
                <div className="form-group">
                  <label htmlFor="documentation">Documentation</label>
                  <input type="file" name="documentation" id="documentation" className='form-control'/>
                </div>
              </div>
              <button className="btn btn-primary btn-sm" id='save' onClick={createEquipment}>Save</button>
            </div>
          )
        }}</EquipmentsContext.Consumer>
      </EquipmentsContextProvider>
    );
  }
}
 
export default EquipmentsEditView;