import React, { useState } from 'react';
import axios from 'axios';

function TubewellForm() {
  const [installationDate, setInstallationDate] = useState('');
  const [capacity, setCapacity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      installation_date: installationDate,
      capacity: parseInt(capacity, 10)
    };

    try {
      await axios.post('http://localhost:5000/api/tubewell', data);
      alert('Data submitted successfully');
    } catch (error) {
      console.error('There was an error submitting the data!', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleSubmit} style={{ textAlign: 'center', width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <h1>NEW TUBEWELL INSERTION FORM</h1>
        <div>
          <h3><label>Installation Date:</label></h3>
          <input
            type="date"
            value={installationDate}
            onChange={(e) => setInstallationDate(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </div>
        <div>
          <h3><label>Capacity:</label></h3>
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '20px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Submit</button>
      </form>
    </div>
  );
}

export default TubewellForm;
