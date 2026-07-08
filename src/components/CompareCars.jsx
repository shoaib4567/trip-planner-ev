import React, { useState } from 'react';

const CARS = [
  { id: 0, name: 'Tesla Model 3 Long Range', batt: 75, eff: 145, maxKw: 250, plug: 'NACS' },
  { id: 1, name: 'Hyundai Ioniq 5 (77 kWh)', batt: 77, eff: 175, maxKw: 235, plug: 'CCS' },
  { id: 2, name: 'Kia EV6 Long Range',       batt: 77, eff: 170, maxKw: 235, plug: 'CCS' },
  { id: 3, name: 'Ford Mustang Mach-E ER',   batt: 88, eff: 188, maxKw: 150, plug: 'CCS' },
  { id: 4, name: 'VW ID.4 Pro',              batt: 77, eff: 182, maxKw: 135, plug: 'CCS' },
  { id: 5, name: 'Rivian R1T',               batt: 135, eff: 240, maxKw: 220, plug: 'CCS' },
  { id: 6, name: 'BYD Seal AWD',             batt: 82, eff: 168, maxKw: 150, plug: 'GB/T' }
];

export default function CompareCars() {
  const [carAIdx, setCarAIdx] = useState(0);
  const [carBIdx, setCarBIdx] = useState(1);

  const carA = CARS[carAIdx];
  const carB = CARS[carBIdx];

  // Range helper calculations (Mild / Cold / Hot)
  const getRanges = (car) => {
    return {
      mild: Math.round((car.batt * 1000) / car.eff),
      cold: Math.round((car.batt * 1000) / (car.eff * 1.22)),
      hot: Math.round((car.batt * 1000) / (car.eff * 1.10))
    };
  };

  const rangesA = getRanges(carA);
  const rangesB = getRanges(carB);

  // Fast charge estimate: minutes for 10% to 80% charge (70% capacity added)
  // Approx: capacity in kWh * 0.70 / (average charge speed in kW) * 60 mins
  // We assume avg charge speed is roughly 65% of maxKw peak limit
  const getChargeTime = (car) => {
    const avgKw = car.maxKw * 0.65;
    return Math.round((car.batt * 0.70 / avgKw) * 60);
  };

  return (
    <div className="compare-view-container" style={{ paddingTop: '100px', minHeight: '80vh' }}>
      <section className="mile mile--tight">
        <span className="milemark">Specs Comparison · Side-by-Side</span>
        <div className="wrap">
          <div className="mile-head">
            <p className="eyebrow">Garage Comparisons</p>
            <h2>Compare Electric Vehicles</h2>
            <p className="lede">
              Select two EV models to inspect differences in highway ranges, charging speeds, and port specs.
            </p>
          </div>

          {/* Selectors */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
            <div className="panel" style={{ padding: '16px' }}>
              <label htmlFor="comp-car-a" style={{ fontFamily: 'var(--mono)', fontSize: '.7rem', display: 'block', marginBottom: '8px' }}>VEHICLE A</label>
              <select id="comp-car-a" value={carAIdx} onChange={(e) => setCarAIdx(Number(e.target.value))} style={{ width: '100%' }}>
                {CARS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="panel" style={{ padding: '16px' }}>
              <label htmlFor="comp-car-b" style={{ fontFamily: 'var(--mono)', fontSize: '.7rem', display: 'block', marginBottom: '8px' }}>VEHICLE B</label>
              <select id="comp-car-b" value={carBIdx} onChange={(e) => setCarBIdx(Number(e.target.value))} style={{ width: '100%' }}>
                {CARS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>

          {/* Comparison Matrix */}
          <div className="tablewrap" style={{ marginBottom: '48px' }}>
            <table>
              <thead>
                <tr>
                  <th scope="col">Specification</th>
                  <th scope="col" className="us">{carA.name}</th>
                  <th scope="col" className="us" style={{ background: 'var(--green-900)' }}>{carB.name}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Battery Pack Capacity</td>
                  <td><b>{carA.batt} kWh</b> (usable)</td>
                  <td style={{ background: 'var(--green-100)' }}><b>{carB.batt} kWh</b> (usable)</td>
                </tr>
                <tr>
                  <td>Base Energy Consumption</td>
                  <td className="mono">{carA.eff} Wh/km</td>
                  <td className="mono" style={{ background: 'var(--green-100)' }}>{carB.eff} Wh/km</td>
                </tr>
                <tr>
                  <td>Peak Fast Charge Limit</td>
                  <td className="mono">{carA.maxKw} kW</td>
                  <td className="mono" style={{ background: 'var(--green-100)' }}>{carB.maxKw} kW</td>
                </tr>
                <tr>
                  <td>Estimated 10% – 80% Fast Charge</td>
                  <td>🕒 ~{getChargeTime(carA)} mins</td>
                  <td style={{ background: 'var(--green-100)' }}>🕒 ~{getChargeTime(carB)} mins</td>
                </tr>
                <tr>
                  <td>Charging Socket Port</td>
                  <td><span className="chip">{carA.plug}</span></td>
                  <td style={{ background: 'var(--green-100)' }}><span className="chip" style={{ background: 'var(--green-950)', color: '#fff' }}>{carB.plug}</span></td>
                </tr>
                <tr style={{ borderTop: '2px solid var(--line)' }}>
                  <td>Mild Range (18°C)</td>
                  <td><b>{rangesA.mild} km</b></td>
                  <td style={{ background: 'var(--green-100)' }}><b>{rangesB.mild} km</b></td>
                </tr>
                <tr>
                  <td>Cold Range (-4°C)</td>
                  <td style={{ color: 'var(--grade-d)' }}>{rangesA.cold} km</td>
                  <td style={{ background: 'var(--green-100)', color: 'var(--grade-d)' }}>{rangesB.cold} km</td>
                </tr>
                <tr>
                  <td>Hot Range (38°C)</td>
                  <td>{rangesA.hot} km</td>
                  <td style={{ background: 'var(--green-100)' }}>{rangesB.hot} km</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
