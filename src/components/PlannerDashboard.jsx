import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

const ROUTES = [
  { name: 'San Francisco → Los Angeles', tag: 'I-5 corridor', km: 614, drive: 5.9, rate: .52,
    stops: [
      { n: 'Kettleman City · 250 kW', g: 'A',  note: 'last good charge 38 min ago · usually free 2–4 pm' },
      { n: 'Tejon Ranch · 150 kW',    g: 'B+', note: 'stall 3 throttles to 62 kW — use 1, 2 or 4' }
    ],
    planb: 'Buttonwillow (A−) held in reserve, +9 min'
  },
  { name: 'London → Edinburgh', tag: 'A1 / M6 corridor', km: 650, drive: 6.8, rate: .62,
    stops: [
      { n: 'Wetherby Services · 350 kW', g: 'A',  note: '12 stalls · queue rare before 4 pm' },
      { n: 'Abington · 150 kW',          g: 'B',  note: '2 of 6 stalls capped at 90 kW this week' }
    ],
    planb: 'Gretna Green (A) held in reserve, +6 min'
  },
  { name: 'Berlin → Munich', tag: 'A9 corridor', km: 585, drive: 5.7, rate: .58,
    stops: [
      { n: 'Leipzig Süd · 300 kW',        g: 'A',  note: 'reliable · café on site' },
      { n: 'Nürnberg-Feucht · 150 kW',    g: 'B+', note: 'busy 5–7 pm · time your stop earlier' }
    ],
    planb: 'Ingolstadt Nord (A−) held in reserve, +7 min'
  },
  { name: 'Toronto → Montréal', tag: 'Hwy 401 corridor', km: 541, drive: 5.4, rate: .44,
    stops: [
      { n: 'Kingston · 180 kW',  g: 'A−', note: 'winter queue common on Fridays' },
      { n: 'Cornwall · 100 kW',  g: 'C+', note: '1 of 2 stalls flaky — Plan B recommended' }
    ],
    planb: 'Brockville (B+) held in reserve, +11 min'
  }
];

const TEMP = {
  mild: { k: 1.0, band: 6 },
  cold: { k: 1.22, band: 12 },
  hot: { k: 1.10, band: 9 }
};

const GRADEPTS = { 'A': 97, 'A−': 94, 'B+': 90, 'B': 86, 'C+': 78, 'C': 72 };

export default function PlannerDashboard() {
  const { 
    selectedVehicle, 
    user, 
    saveTrip, 
    addCorrection, 
    notifications, 
    dismissNotification,
    telematics,
    connectTelematics,
    disconnectTelematics
  } = useContext(AppContext);
  const [routeIdx, setRouteIdx] = useState(0);
  const [tempKey, setTempKey] = useState('mild');
  const [soc, setSoc] = useState(90);
  
  // Premium Modifiers
  const [liveWeather, setLiveWeather] = useState(false);
  
  // States
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showCorrectionForm, setShowCorrectionForm] = useState(false);
  const [correctionStation, setCorrectionStation] = useState('');
  const [correctionCategory, setCorrectionCategory] = useState('wrong coordinate');
  const [correctionNote, setCorrectionNote] = useState('');

  const [output, setOutput] = useState({
    corridorName: '',
    routeName: '',
    stops: [],
    planb: '',
    cost: '$0.00',
    time: '0 h 00',
    energy: '0 kWh',
    energyBand: '',
    loPercent: '20%',
    hiPercent: '40%',
    conf: '0%',
    ringP: 0,
    noStopsNeeded: false,
    remainingSocPercent: 0
  });

  const rt = ROUTES[routeIdx];

  // Auto SOC Simulation
  useEffect(() => {
    if (telematics.connected && user?.plan === 'Premium') {
      setSoc(74); // Mock connected vehicle state of charge
    }
  }, [telematics.connected, user]);

  const runCalculation = () => {
    const car = selectedVehicle;
    const tc = TEMP[tempKey];
    
    // Apply live weather modifier (+5% wind drag penalty if active)
    const weatherFactor = (liveWeather && user?.plan === 'Premium') ? 1.05 : 1.0;
    const dragModifier = tc.k * weatherFactor;

    const energy = rt.km * car.eff / 1000 * dragModifier; // kWh needed
    const startKwh = car.batt * soc / 100 * 0.9;  // usable at start (accounting for 10% reserve)
    const chargeKwh = Math.max(0, energy - startKwh + car.batt * 0.12); // arrive with 12% buffer

    const stopsCount = rt.stops.length;
    const cost = chargeKwh * rt.rate + stopsCount * 0.9;
    const chargeMin = stopsCount ? Math.round(chargeKwh / stopsCount / 2.1) * stopsCount : 0;
    const totalH = rt.drive + chargeMin / 60;

    // Confidence: Average of stop reliability minus weather band penalty
    let conf = 95;
    if (chargeKwh >= 1 && stopsCount > 0) {
      conf = Math.round(rt.stops.reduce((s, x) => s + (GRADEPTS[x.g] || 80), 0) / stopsCount - (tc.band - 6) * 0.7);
    }
    conf = Math.max(62, Math.min(98, conf));

    const stopsList = rt.stops.map((s, idx) => {
      const perStop = (cost - stopsCount * 0.9) / stopsCount + 0.9;
      return {
        ...s,
        cost: perStop.toFixed(2),
        min: Math.round(chargeMin / stopsCount)
      };
    });

    const mid = 30 + (dragModifier - 1) * 120;
    const lo = Math.max(2, mid - tc.band * 1.6);
    const hi = Math.min(96, mid + tc.band * 1.6);

    const noStops = chargeKwh < 1;
    const remainingSoc = Math.round(((startKwh - energy) / car.batt) * 100 + 10);

    setOutput({
      corridorName: `${rt.tag} · ${car.name}`,
      routeName: rt.name,
      stops: stopsList,
      planb: rt.planb,
      cost: noStops ? '$0.00' : `$${cost.toFixed(2)}`,
      time: `${Math.floor(totalH)} h ${String(Math.round((totalH % 1) * 60)).padStart(2, '0')}`,
      energy: `${Math.round(energy)} kWh`,
      energyBand: `energy band: ${Math.round(energy * (1 - tc.band / 100))}–${Math.round(energy * (1 + tc.band / 100))} kWh (±${tc.band}%)`,
      loPercent: `${lo}%`,
      hiPercent: `${hi}%`,
      conf: `${conf}%`,
      ringP: conf,
      noStopsNeeded: noStops,
      remainingSocPercent: remainingSoc
    });
  };

  useEffect(() => {
    runCalculation();
  }, [routeIdx, tempKey, soc, selectedVehicle, liveWeather, telematicsActive]);

  const handleSavePlan = () => {
    saveTrip(
      rt.name.split(' → ')[0],
      rt.name.split(' → ')[1].split(' ')[0],
      output.cost,
      output.time,
      output.energy,
      rt.tag,
      output.noStopsNeeded ? 0 : output.stops.length
    );
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleCorrectionSubmit = (e) => {
    e.preventDefault();
    if (!correctionStation.trim() || !correctionNote.trim()) return;
    addCorrection(correctionStation.trim(), correctionCategory, correctionNote.trim());
    setCorrectionStation('');
    setCorrectionNote('');
    setShowCorrectionForm(false);
    alert('Correction ticket logged successfully in the admin moderator queue.');
  };

  const isPremium = user?.plan === 'Premium';

  return (
    <div>
      <h2 style={{ marginBottom: '8px', fontSize: '1.8rem' }}>Trip Planner</h2>
      <p className="lede" style={{ marginBottom: '24px' }}>Plan your route with graded highway chargers, weather envelopes, and Plan B backups.</p>

      {/* Live Alerts */}
      {notifications && notifications.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
          {notifications.map(n => (
            <div key={n.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFF5F5', borderLeft: '4px solid var(--grade-d)', padding: '10px 16px', borderRadius: '4px', fontSize: '.9rem', boxShadow: 'var(--shadow-card)', border: '1px solid var(--line)', borderLeftWidth: '4px' }}>
              <span style={{ color: 'var(--ink)' }}>{n.message}</span>
              <button onClick={() => dismissNotification(n.id)} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>✕</button>
            </div>
          ))}
        </div>
      )}

      <div className="demo-grid">
        <div style={{ display: 'grid', gap: '16px' }}>
          <form className="panel" onSubmit={(e) => e.preventDefault()} aria-label="Trip planner controls">
            <div className="field" style={{ borderBottom: '1px solid var(--line)', paddingBottom: '12px', marginBottom: '4px' }}>
              <label>ACTIVE EV VEHICLE</label>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--green)' }}>
                🚙 {selectedVehicle.name} ({selectedVehicle.batt} kWh)
              </div>
              <span style={{ fontSize: '.75rem', color: 'var(--muted)' }}>Change your active car in the **Vehicle Garage** tab.</span>
            </div>

            <div className="field">
              <label htmlFor="p-route">Corridor Route</label>
              <select id="p-route" value={routeIdx} onChange={(e) => setRouteIdx(Number(e.target.value))}>
                {ROUTES.map((r, i) => <option key={i} value={i}>{r.name}</option>)}
              </select>
            </div>

            <div className="field">
              <label htmlFor="p-temp">Weather Conditions</label>
              <select id="p-temp" value={tempKey} onChange={(e) => setTempKey(e.target.value)}>
                <option value="mild">Mild · 18°C (No penalty)</option>
                <option value="cold">Cold · −4°C (+22% battery heat penalty)</option>
                <option value="hot">Hot · 38°C (+10% air conditioning load)</option>
              </select>
            </div>

            <div className="field">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label htmlFor="p-soc">Starting SoC Charge</label>
                <span className="mono" style={{ fontSize: '.8rem', fontWeight: 700 }}>{soc}%</span>
              </div>
              <input 
                type="range" 
                id="p-soc" 
                min="20" 
                max="100" 
                step="5"
                disabled={telematics.connected && isPremium}
                value={soc} 
                onChange={(e) => setSoc(Number(e.target.value))} 
                style={{ width: '100%', height: '8px', cursor: (telematics.connected && isPremium) ? 'not-allowed' : 'pointer' }}
              />
            </div>
            
            {/* Premium Features Card */}
            <div className="panel" style={{ background: isPremium ? 'var(--green-100)' : '#FFF9E6', borderColor: isPremium ? 'var(--green)' : 'var(--amber)', gap: '12px', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ color: isPremium ? 'var(--green-950)' : '#5C4300', margin: 0, fontSize: '.9rem' }}>
                  {isPremium ? '⭐ PREMIUM UNLOCKED' : '⭐ PREMIUM FEATURES'}
                </h4>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '.85rem', color: isPremium ? 'var(--ink)' : 'var(--muted)', cursor: isPremium ? 'pointer' : 'not-allowed' }}>
                  <input 
                    type="checkbox" 
                    disabled={!isPremium} 
                    checked={liveWeather}
                    onChange={(e) => setLiveWeather(e.target.checked)}
                  />
                  Live Weather &amp; Wind Modifier (+5% drag penalty)
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '.85rem', color: isPremium ? 'var(--ink)' : 'var(--muted)', cursor: isPremium ? 'pointer' : 'not-allowed' }}>
                  <input 
                    type="checkbox" 
                    disabled={!isPremium}
                    checked={telematics.connected}
                    onChange={(e) => {
                      if (e.target.checked) {
                        connectTelematics();
                      } else {
                        disconnectTelematics();
                      }
                    }}
                  />
                  Smartcar Telematics (Lock Live SoC to connected vehicle)
                </label>
              </div>

              {telematics.connected && isPremium && (
                <div style={{ fontSize: '.72rem', fontFamily: 'var(--mono)', color: 'var(--green-950)' }}>
                  ● Smartcar telemetry connected (VIN: {telematics.vin}). SOC fetched dynamically (74%).
                </div>
              )}

              {liveWeather && isPremium && (
                <div style={{ fontSize: '.72rem', fontFamily: 'var(--mono)', color: 'var(--green-950)' }}>
                  ● High headwind warning. Consumption model adjusted.
                </div>
              )}
            </div>
          </form>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              onClick={handleSavePlan} 
              className="btn btn-green"
              style={{ flex: 1 }}
            >
              {savedSuccess ? '✓ Route Saved' : '💾 Save Itinerary'}
            </button>
            <button 
              onClick={() => setShowAddForm ? {} : setShowCorrectionForm(!showCorrectionForm)} 
              className="btn btn-ghost"
              style={{ flex: 1 }}
            >
              ⚠️ Report Station Bug
            </button>
          </div>

          {showCorrectionForm && (
            <form onSubmit={handleCorrectionSubmit} className="panel">
              <h3 style={{ fontSize: '1.1rem', color: 'var(--green-950)' }}>Submit Charger Correction</h3>
              <div className="field">
                <label htmlFor="cor-station">Station Name</label>
                <input 
                  type="text" 
                  id="cor-station" 
                  required 
                  placeholder="e.g. Kettleman City Stall 4" 
                  value={correctionStation}
                  onChange={(e) => setCorrectionStation(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="cor-cat">Category</label>
                <select id="cor-cat" value={correctionCategory} onChange={(e) => setCorrectionCategory(e.target.value)}>
                  <option value="wrong coordinate">Wrong coordinates / Location error</option>
                  <option value="broken connector">Broken plug connector / Out of service</option>
                  <option value="wrong price">Incorrect tariff / price rate listed</option>
                  <option value="wrong power">Throttled power / slower than rated kW</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="cor-note">Details</label>
                <textarea 
                  id="cor-note" 
                  required
                  rows="3"
                  placeholder="Explain the charger error..."
                  value={correctionNote}
                  onChange={(e) => setCorrectionNote(e.target.value)}
                  style={{ width: '100%', padding: '8px', border: '1.5px solid var(--line)', borderRadius: '6px', font: 'inherit' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button type="submit" className="btn btn-green btn-sm">Submit</button>
                <button type="button" onClick={() => setShowCorrectionForm(false)} className="btn btn-ghost btn-sm">Cancel</button>
              </div>
            </form>
          )}
        </div>

        <div>
          <div className="sign" id="d-out" aria-live="polite">
            <span className="exit-tab">YOUR&nbsp;PLAN</span>
            <small>{output.corridorName}</small>
            <div className="sign-route">
              {output.routeName.replace('→', '→')}
              <span className="mono" style={{ fontSize: '.8rem', fontWeight: 400, color: '#BFE3CF', marginLeft: '8px' }}>
                {rt.km} km
              </span>
            </div>
            
            <div id="o-stops" style={{ minHeight: '80px' }}>
              {output.noStopsNeeded ? (
                <div className="stop" style={{ marginTop: '14px' }}>
                  <span className="grade a">✓</span>
                  <div>
                    <div className="stop-name">No charging stop needed</div>
                    <div className="stop-meta">arrives with ~{output.remainingSocPercent}% remaining</div>
                  </div>
                  <div></div>
                </div>
              ) : (
                output.stops && output.stops.map((s, i) => (
                  <div key={i} className="stop" style={i === 0 ? { marginTop: '14px' } : {}}>
                    <span className={`grade ${s.g.charAt(0).toLowerCase()}`} aria-label={`Reliability grade ${s.g}`}>
                      {s.g}
                    </span>
                    <div>
                      <div className="stop-name">{s.n}</div>
                      <div className="stop-meta">{s.note}</div>
                    </div>
                    <div className="stop-cost">
                      ${s.cost}
                      <br />
                      <span style={{ fontSize: '.66rem', fontWeight: 400, color: '#BFE3CF' }}>
                        {s.min} min
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {!output.noStopsNeeded && (
              <div className="planb" style={{ display: 'flex' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M7 1v7M3.5 5 7 8.5 10.5 5M2 12.5h10" stroke="#EFA51C" stroke-width="1.8" stroke-linecap="round"/>
                </svg>
                PLAN B READY · {output.planb}
              </div>
            )}

            <div className="sign-readout">
              <div className="readout"><b>{output.cost}</b><span>true cost</span></div>
              <div className="readout"><b>{output.time}</b><span>door to door</span></div>
              <div className="readout"><b>{output.energy}</b><span>energy used</span></div>
              <div className="ring" style={{ '--p': output.ringP }}><i>{output.conf}</i></div>
            </div>
            
            <div className="band" aria-hidden="true">
              <div className="band-track">
                <span className="band-lo" style={{ left: output.loPercent }}></span>
                <span className="band-hi" style={{ left: output.hiPercent }}></span>
              </div>
              <div className="band-labels">
                <span>{output.energyBand}</span>
                <span>sensitivity to weather &amp; speed</span>
              </div>
            </div>
            <span className="demo-stamp">Demo &middot; sample data</span>
          </div>
        </div>
      </div>
    </div>
  );
}
