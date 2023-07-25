import React, { useState } from 'react';
import './App.css';
import InventoryForm from './components/InventoryForm';
import InventoryList from './components/InventoryList';

function App() {
  const [materials, setMaterials] = useState([]);
  const [editingMaterial, setEditingMaterial] = useState(null);

  const addMaterial = (material) => {
    setMaterials([...materials, material]);
  };

  const editMaterial = (material) => {
    setEditingMaterial(material);
  };

  const saveEditedMaterial = (editedMaterial) => {
    setMaterials(
      materials.map((material) =>
        material.id === editedMaterial.id ? editedMaterial : material
      )
    );
    setEditingMaterial(null);
  };

  return (
    <div className='app-container'>
      <h1>Material Inventory Manager</h1>
      <InventoryForm
        addMaterial={addMaterial}
        editingMaterial={editingMaterial}
        saveEditedMaterial={saveEditedMaterial}
      />
      <InventoryList materials={materials} editMaterial={editMaterial} />
    </div>
  );
}

export default App;
