import React, { useState } from 'react';

const CARS = [
  { name: 'Tesla Model 3 Long Range', batt: 75, eff: 145 },
  { name: 'Hyundai Ioniq 5 (77 kWh)', batt: 77, eff: 175 },
  { name: 'Kia EV6 Long Range',       batt: 77, eff: 170 },
  { name: 'Ford Mustang Mach-E ER',   batt: 88, eff: 188 },
  { name: 'VW ID.4 Pro',              batt: 77, eff: 182 },
  { name: 'Rivian R1T',               batt: 135, eff: 240 },
  { name: 'BYD Seal AWD',             batt: 82, eff: 168 }
];

const WEATHER = {
  mild: { label: 'Mild (18°C) - No penalty', k: 1.0 },
  cold: { label: 'Cold (-4°C) - +22% heating drag', k: 1.22 },
  hot: { label: 'Hot (38°C) - +10% A/C load', k: 1.10 }
};

export default function RangeCalculator({ onNavigate }) {
  const [carIdx, setCarIdx] = useState(0);
  const [weatherKey, setWeatherKey] = useState('mild');
  const [speedKmh, setSpeedKmh] = useState(110); // highway speed

  const car = CARS[carIdx];
  const tc = WEATHER[weatherKey];

  // Highway drag modifier based on speed (referenced from 100km/h baseline)
  const speedFactor = Math.max(0.8, Math.min(1.4, 1 + (speedKmh - 100) * 0.007));

  // Compute actual efficiency & range
  const adjustedEff = car.eff * tc.k * speedFactor; // Wh/km
  const maxRange = Math.round((car.batt * 1000) / adjustedEff); // km

  return (
    <div className="range-calc-view-container" style={{ paddingTop: '100px', minHeight: '80vh' }}>
      <section className="mile mile--tight">
        <span className="milemark">Calculator · Standalone Tool</span>
        <div className="wrap">
          <div className="mile-head">
            <p className="eyebrow">Interactive Specs</p>
            <h2>EV Range &amp; Highway Speed Calculator</h2>
            <p className="lede">
              Advertised range is measured at low speeds in laboratory conditions. Use this calculator to see your real highway road-trip envelope.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '36px', margin: '36px 0' }}>
            <form className="panel" onSubmit={(e) => e.preventDefault()} style={{ padding: '28px' }}>
              <div className="field">
                <label htmlFor="rc-car">Select Electric Vehicle</label>
                <select id="rc-car" value={carIdx} onChange={(e) => setCarIdx(Number(e.target.value))}>
                  {CARS.map((c, i) => <option key={i} value={i}>{c.name}</option>)}
                </select>
              </div>

              <div className="field" style={{ marginTop: '16px' }}>
                <label htmlFor="rc-weather">Temperature &amp; Weather</label>
                <select id="rc-weather" value={weatherKey} onChange={(e) => setWeatherKey(e.target.value)}>
                  {Object.entries(WEATHER).map(([k, w]) => (
                    <option key={k} value={k}>{w.label}</option>
                  ))}
                </select>
              </div>

              <div className="field" style={{ marginTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label htmlFor="rc-speed">Highway Cruise Speed</label>
                  <span className="mono" style={{ fontSize: '.85rem', fontWeight: 700 }}>{speedKmh} km/h</span>
                </div>
                <input 
                  type="range" 
                  id="rc-speed" 
                  min="80" 
                  max="130" 
                  step="5"
                  value={speedKmh} 
                  onChange={(e) => setSpeedKmh(Number(e.target.value))} 
                  style={{ width: '100%' }}
                />
              </div>
            </form>

            {/* Range Output Card */}
            <div className="panel" style={{ background: 'var(--green)', color: '#fff', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <small style={{ fontFamily: 'var(--mono)', color: '#BFE3CF', letterSpacing: '0.1em' }}>
                  ESTIMATED HIGHWAY RANGE
                </small>
                <b style={{ fontSize: '3.5rem', lineHeight: '1.1', display: 'block', color: '#fff', marginTop: '8px' }}>
                  {maxRange} <span style={{ fontSize: '1.5rem', fontWeight: 'normal' }}>km</span>
                </b>
                <p style={{ color: '#C7DDD0', fontSize: '.9rem', marginTop: '12px' }}>
                  Based on usable capacity of **{car.batt} kWh** and adjusted consumption rate of **{Math.round(adjustedEff)} Wh/km** (baseline is {car.eff} Wh/km).
                </p>
              </div>

              <div style={{ borderTop: '1px dashed rgba(255,255,255,.2)', paddingTop: '20px', marginTop: '20px', display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '.7rem', color: '#BFE3CF', display: 'block' }}>SENSITIVITY ENVELOPE</span>
                  <span className="mono" style={{ fontWeight: 'bold' }}>
                    {Math.round(maxRange * 0.94)} – {Math.round(maxRange * 1.06)} km (&plusmn;6%)
                  </span>
                </div>
                <button 
                  onClick={() => onNavigate('app')} 
                  className="btn btn-reflect btn-sm"
                >
                  Plan Road Trip
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
