import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

export default function VehiclePicker() {
  const { 
    vehicles, 
    selectedVehicleIdx, 
    selectVehicle, 
    addVehicle, 
    deleteVehicle 
  } = useContext(AppContext);

  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [batt, setBatt] = useState(75);
  const [eff, setEff] = useState(160);
  const [adapters, setAdapters] = useState([]);

  const handleAdapterChange = (adapter) => {
    if (adapters.includes(adapter)) {
      setAdapters(adapters.filter(a => a !== adapter));
    } else {
      setAdapters([...adapters, adapter]);
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    addVehicle(name.trim(), Number(batt), Number(eff), adapters);
    setName('');
    setBatt(75);
    setEff(160);
    setAdapters([]);
    setShowAddForm(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <h2 style={{ fontSize: '1.8rem' }}>Vehicle Garage</h2>
        <button 
          onClick={() => setShowAddForm(!showAddForm)} 
          className="btn btn-green btn-sm"
        >
          {showAddForm ? 'Cancel' : '+ Add Custom EV'}
        </button>
      </div>
      <p className="lede" style={{ marginBottom: '24px' }}>Select or add the electric vehicle you will drive. Real efficiency and battery capacity determine charging stops.</p>

      {showAddForm && (
        <form onSubmit={handleAddSubmit} className="panel" style={{ marginBottom: '24px', maxWidth: '600px' }}>
          <h3 style={{ color: 'var(--green-950)' }}>Add Custom Vehicle Specs</h3>
          
          <div className="field">
            <label htmlFor="custom-name">Vehicle Make &amp; Model</label>
            <input 
              type="text" 
              id="custom-name" 
              required 
              placeholder="e.g. Rivian R1S Dual-Motor" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="stripe-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="field">
              <label htmlFor="custom-batt">Battery Size (usable kWh)</label>
              <input 
                type="number" 
                id="custom-batt" 
                required 
                min="10"
                max="250"
                value={batt}
                onChange={(e) => setBatt(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="custom-eff">Consumption Rating (Wh/km)</label>
              <input 
                type="number" 
                id="custom-eff" 
                required 
                min="50"
                max="500"
                value={eff}
                onChange={(e) => setEff(e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label>Adapters you carry</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '6px' }}>
              {['CCS-to-NACS', 'NACS-to-CCS', 'CHAdeMO adapter', 'J1772 adapter'].map((ad) => (
                <label key={ad} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--body)', textTransform: 'none', fontSize: '.9rem', color: 'var(--ink)', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={adapters.includes(ad)} 
                    onChange={() => handleAdapterChange(ad)}
                    style={{ cursor: 'pointer' }}
                  />
                  {ad}
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="btn btn-green">Save Vehicle to Garage</button>
        </form>
      )}

      <div className="garage-grid">
        {vehicles.map((v, index) => {
          const isActive = index === selectedVehicleIdx;
          return (
            <div 
              key={index} 
              onClick={() => selectVehicle(index)}
              className={`vehicle-card ${isActive ? 'active' : ''}`}
            >
              <h4>{v.name}</h4>
              <p>Battery: <b>{v.batt} kWh</b></p>
              <p>Efficiency: <b>{v.eff} Wh/km</b></p>
              {v.adapters && v.adapters.length > 0 && (
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '6px' }}>
                  {v.adapters.map(ad => (
                    <span key={ad} className="chip" style={{ fontSize: '.55rem', padding: '2px 4px', background: isActive ? '#fff' : 'var(--green-100)' }}>
                      🔑 {ad}
                    </span>
                  ))}
                </div>
              )}
              {vehicles.length > 1 && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm(`Remove ${v.name} from your garage?`)) {
                      deleteVehicle(index);
                    }
                  }} 
                  className="delete-btn"
                  title="Remove vehicle"
                >
                  Delete
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
