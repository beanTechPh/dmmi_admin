import React from 'react';
import { useContext } from 'react';
import { EquipmentsContext } from '../../contexts/equipmentsContext';

const EquipmentTableRows = () => {
  const context = useContext( EquipmentsContext );
  const { equipments, equipmentTableRowClick } = context;

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
          <td className='type'>{equipment.type}</td>
          <td className="branch">{equipment.branch}</td>
          <td className="brand">{equipment.brand}</td>
        </tr>
      )}
    </React.Fragment>
  )
}

export default EquipmentTableRows;