import React, { Component } from 'react';
import EquipmentsContextProvider, { EquipmentsContext } from '../contexts/equipmentsContext';
import '../stylesheets/show.scss';
import Carousel from 'react-bootstrap/Carousel';
import ComponentCard from './components/componentCard';
import PDFViewer from '../../../core/utils/pdfViewer';
import { Link } from 'react-router-dom';
import EquipmentEditDetailsModal from './components/equipmentEditDetailsModal';

class EquipmentsShowView extends Component {
  state = {  } 

  editDetailsClick = (e) => {
    document.querySelector("#equipment-edit-details-modal").classList.remove('hide')
  }

  render() { 
    return (
      <EquipmentsContextProvider>
        <EquipmentsContext.Consumer>{ context => {
          const { showEquipment } = context
          const equipment = showEquipment

          if(equipment === null) return

          return (
            <div id="equipments-show-page" className='page-container'>
              <div className="d-flex justify-content-between">
                <div className="d-flex header">
                  <h1 className="title">{equipment.name}</h1>
                  <i className="bi bi-pencil-fill" id="edit-details" onClick={this.editDetailsClick}></i>
                </div>
                <div className="action-btns">
                  {/* <Link to={"/equipments/" + equipment.id + "/edit"} className='btn btn-primary btn-sm'>Edit</Link> */}
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="equipment d-flex">
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
                  <div className="details">
                    <div className="group d-flex">
                      <div className="label">Name:</div>
                      <div className="value">{equipment.name}</div>
                    </div>
                    <div className="group d-flex">
                      <div className="label">Type:</div>
                      <div className="value">{equipment.productType.name}</div>
                    </div>
                    <div className="group d-flex">
                      <div className="label">Serial No:</div>
                      <div className="value">{equipment.serialNo}</div>
                    </div>
                    <div className="group d-flex">
                      <div className="label">Branch:</div>
                      <div className="value">{equipment.branch.name}</div>
                    </div>
                    <div className="group d-flex">
                      <div className="label">Brand:</div>
                      <div className="value">{equipment.brand}</div>
                    </div>
                    <div className="group d-flex">
                      <div className="label">Descirption:</div>
                      <div className="value">{equipment.description}</div>
                    </div>
                    <div className="group d-flex">
                      <div className="label">Installed Date:</div>
                      <div className="value">{equipment.installedDate}</div>
                    </div>
                    <div className="group d-flex">
                      <div className="label">Age:</div>
                      <div className="value">{equipment.age}</div>
                    </div>
                  </div>
                </div>
                <div className="qr-code">
                  <img src={equipment.qrCode} alt="" />
                </div>
              </div>
              <hr />
              <div className="components">
                <h3 className='sub-title'>Components</h3>
                <div className="content d-flex">
                  {equipment.components.map(component => 
                    <ComponentCard key={component.id} component={component} />
                  )}
                </div>
              </div>
              <hr />
              <div className="schematics">
                <h3 className='sub-title'>Schematics</h3>
                <Carousel variant="dark">
                  {equipment.schematics.length > 0 ?
                    equipment.schematics.map(schematic => 
                      <Carousel.Item key={schematic}>
                        <img src={schematic} alt="" />
                      </Carousel.Item>
                    )
                    :
                    <Carousel.Item>
                      <img src={require("../../../core/images/free-standing-panel.jpg")} alt="" />
                    </Carousel.Item>
                  }
                </Carousel>
              </div>
              <hr />
              <div className="pms-content">
                <h3 className='sub-title'>PMS / Test Report</h3>
              </div>
              <hr />
              <div className="documentation">
                <h3 className='sub-title'>Documentation</h3>
                <PDFViewer url={equipment.documentation} />
              </div>
              <EquipmentEditDetailsModal/>
            </div>
          )
        }}</EquipmentsContext.Consumer>
      </EquipmentsContextProvider>
    );
  }
}
 
export default EquipmentsShowView;