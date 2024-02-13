// frontend/src/components/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { createLabel, getAllLabels } from '../services/labelService';

const AdminDashboard = () => {
  const [newLabel, setNewLabel] = useState('');
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchLabels = async () => {
      try {
        const data = await getAllLabels();
        setLabels(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLabels();
  }, []);

  const handleNewLabelChange = (event) => {
    setNewLabel(event.target.value);
  };

  const handleCreateLabel = async () => {
    try {
      await createLabel(newLabel);
      const updatedLabels = await getAllLabels();
      setLabels(updatedLabels);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>
        <h3>Create New Label</h3>
        <input type="text" value={newLabel} onChange={handleNewLabelChange} />
        <button onClick={handleCreateLabel}>Create Label</button>
      </div>
      <div>
        <h3>All Labels</h3>
        {loading ? (
          <p>Loading labels...</p>
        ) : (
          <ul>
            {labels.map((label) => (
              <li key={label._id}>{label.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

