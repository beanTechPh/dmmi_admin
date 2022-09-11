import React, { Component } from 'react';
import EquipmentsContextProvider, { EquipmentsContext } from '../contexts/equipmentsContext';
import '../stylesheets/show.scss';
import Carousel from 'react-bootstrap/Carousel';

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
                <Carousel variant="dark">
                  {equipment.images.lenght > 0 ?
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