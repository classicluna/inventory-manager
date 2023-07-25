import React from 'react';

const InventoryList = ({ materials, editMaterial }) => {
  return (
    <div className='inventory-list-container'>
      {materials.map((material) => (
        <div key={material.id} className='inventory-item'>
          <p>Material Name: {material.materialName}</p>
          <p>Quantity: {material.quantity}</p>
          <p>Reorder Point: {material.reorderPoint}</p>
          <button
            onClick={() => editMaterial(material)}
            className='edit-button'
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
};

export default InventoryList;
