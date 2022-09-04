import React, { Component } from 'react';
import EquipmentsContextProvider, { EquipmentsContext } from '../contexts/equipmentsContext';
import '../stylesheets/show.scss';

class EquipmentsShowView extends Component {
  state = {  } 
  render() { 
    return (
      <EquipmentsContextProvider>
        <EquipmentsContext.Consumer>{ context => {
          const { showEquipment } = context
          const equipment = showEquipment

          if(equipment === null) return

          return (
            <div id="equipments-show-page" className='page-container'>
              <h1 className="title">{equipment.name}</h1>
              <div className="equipment d-flex">
                <div className="image">
                  <img src={require("../../../core/images/free-standing-panel.jpg")} alt="" />
                </div>
                <div className="details">
                  <div className="group d-flex">
                    <div className="label">Name:</div>
                    <div className="value">{equipment.name}</div>
                  </div>
                  <div className="group d-flex">
                    <div className="label">Type:</div>
                    <div className="value">{equipment.type}</div>
                  </div>
                  <div className="group d-flex">
                    <div className="label">Serial No:</div>
                    <div className="value">{equipment.serialNo}</div>
                  </div>
                  <div className="group d-flex">
                    <div className="label">Branch:</div>
                    <div className="value">{equipment.branch}</div>
                  </div>
                  <div className="group d-flex">
                    <div className="label">Origin:</div>
                    <div className="value">{equipment.origin}</div>
                  </div>
                  <div className="group d-flex">
                    <div className="label">Descirption:</div>
                    <div className="value">{equipment.description}</div>
                  </div>
                  <div className="group d-flex">
                    <div className="label">Age:</div>
                    <div className="value">{equipment.age}</div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="pms-content">

              </div>
              <div className="diagrams">

              </div>
              <div className="documentation">

              </div>
            </div>
          )
        }}</EquipmentsContext.Consumer>
      </EquipmentsContextProvider>
    );
  }
}
 
export default EquipmentsShowView;