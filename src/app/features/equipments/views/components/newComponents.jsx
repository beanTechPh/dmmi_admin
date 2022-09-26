import React from 'react';
import { useContext } from 'react';
import { EquipmentsContext } from '../../contexts/equipmentsContext';

const NewComponents = () => {
  const context = useContext( EquipmentsContext );
  const { newComponents, deleteComponent } = context;

  return (
    <React.Fragment>
      {newComponents.map( component => 
        <div className="custom-card component-card" key={component.id} id={'component-' + component.id}>
          <i className="bi bi-x-lg" onClick={e => deleteComponent(component)}></i>
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input type="file" name="image" id="" className='form-control' value={component.tempImage}/>
          </div>
          <div className="form-group">
            <label htmlFor="comp-name">Name</label>
            <input type="text" name="comp-name" id="" className="form-control name" />
          </div>
          <div className="form-group">
            <label htmlFor="comp-brand">Brand</label>
            <input type="text" name="comp-brand" id="" className="form-control brand" />
          </div>
          <div className="form-group">
            <label htmlFor="comp-qty">Qty</label>
            <input type="number" name="comp-qty" id="" className="form-control qty" min={1} />
          </div>
          <div className="form-group">
            <label htmlFor="comp-description">Description</label>
            <input type="text" name="comp-description" id="" className="form-control description" />
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

export default NewComponents;