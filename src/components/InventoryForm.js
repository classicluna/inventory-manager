import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './InventoryForm.css';

const InventoryForm = ({
  addMaterial,
  editingMaterial,
  saveEditedMaterial,
}) => {
  const [materialName, setMaterialName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [reorderPoint, setReorderPoint] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (editingMaterial) {
      setMaterialName(editingMaterial.materialName);
      setQuantity(editingMaterial.quantity);
      setReorderPoint(editingMaterial.reorderPoint);
    }
  }, [editingMaterial]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!materialName || !quantity || !reorderPoint) return;

    if (editingMaterial) {
      saveEditedMaterial({
        ...editingMaterial,
        materialName,
        quantity: Number(quantity),
        reorderPoint: Number(reorderPoint),
      });
    } else {
      const newMaterial = {
        id: uuidv4(),
        materialName,
        quantity: Number(quantity),
        reorderPoint: Number(reorderPoint),
      };
      addMaterial(newMaterial);
    }

    setMaterialName('');
    setQuantity('');
    setReorderPoint('');

    if (Number(quantity) <= Number(reorderPoint)) {
      setShowPopup(true);
    }
  };

  return (
    <div className='inventory-form-container'>
      <form onSubmit={handleSubmit} className='inventory-form'>
        <input
          type='text'
          placeholder='Material Name'
          value={materialName}
          onChange={(e) => setMaterialName(e.target.value)}
        />
        <input
          type='number'
          placeholder='Quantity'
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <input
          type='number'
          placeholder='Reorder Point'
          value={reorderPoint}
          onChange={(e) => setReorderPoint(e.target.value)}
        />
        <button type='submit'>
          {editingMaterial ? 'Save Changes' : 'Add Material'}
        </button>
      </form>

      {showPopup && (
        <div className='popup'>
          <p>{materialName} Quantity is below reorder point!</p>
          <button onClick={() => setShowPopup(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default InventoryForm;
