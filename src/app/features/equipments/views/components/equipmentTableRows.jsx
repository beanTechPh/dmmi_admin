import React from 'react';
import { useContext } from 'react';
import { EquipmentsContext } from '../../contexts/equipmentsContext';

const EquipmentTableRows = () => {
  const context = useContext( EquipmentsContext );
  const { equipments, equipmentTableRowClick } = context;

  if(equipments.length > 0){
    return (
      <React.Fragment>
        {equipments.map( equipment => 
          <tr key={equipment.id} onClick={e => equipmentTableRowClick(equipment)}>
            <td className='name'>
              {equipment.name}
              <div className="info">
                <div className="group d-flex">
                  <div className="label">Serial No:</div>
                  <div className="value">{equipment.serialNo}</div>
                </div>
              </div>
            </td>
            <td className='type'>{equipment.productType.name}</td>
            <td className="branch">{equipment.branch.name}</td>
            <td className="brand">{equipment.brand}</td>
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

export default EquipmentTableRows;