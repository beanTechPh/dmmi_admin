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
          <td className='name'>{equipment.name}</td>
          <td className='type'>{equipment.type}</td>
          <td className="serial-no">{equipment.serialNo}</td>
          <td className="branch">{equipment.branch}</td>
          <td className='origin'>{equipment.origin}</td>
        </tr>
      )}
    </React.Fragment>
  )
}

export default EquipmentTableRows;