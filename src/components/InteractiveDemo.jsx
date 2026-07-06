import React, { useState, useEffect } from 'react';

const CARS = [
  { name: 'Tesla Model 3 Long Range', batt: 75,  eff: 145 },
  { name: 'Hyundai Ioniq 5 (77 kWh)', batt: 77,  eff: 175 },
  { name: 'Kia EV6 Long Range',       batt: 77,  eff: 170 },
  { name: 'Ford Mustang Mach-E ER',   batt: 88,  eff: 188 },
  { name: 'VW ID.4 Pro',              batt: 77,  eff: 182 },
  { name: 'Rivian R1T',               batt: 135, eff: 240 },
  { name: 'BYD Seal AWD',             batt: 82,  eff: 168 }
];

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

export default function InteractiveDemo() {
  const [carIdx, setCarIdx] = useState(0);
  const [routeIdx, setRouteIdx] = useState(0);
  const [tempKey, setTempKey] = useState('mild');
  const [soc, setSoc] = useState(90);

  const [output, setOutput] = useState({
    corridorName: '',
    routeName: '',
    stopsHtml: [],
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

  const runCalculation = () => {
    const car = CARS[carIdx];
    const rt = ROUTES[routeIdx];
    const tc = TEMP[tempKey];

    const energy = rt.km * car.eff / 1000 * tc.k; // kWh needed
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

    const mid = 30 + (tc.k - 1) * 120;
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
  }, [carIdx, routeIdx, tempKey, soc]);

  return (
    <div className="demo-grid">
      <form className="panel" onSubmit={(e) => e.preventDefault()} aria-label="Trip demo controls">
        <div className="field">
          <label htmlFor="d-car">Your EV</label>
          <select id="d-car" value={carIdx} onChange={(e) => setCarIdx(Number(e.target.value))}>
            {CARS.map((c, i) => <option key={i} value={i}>{c.name}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="d-route">Corridor</label>
          <select id="d-route" value={routeIdx} onChange={(e) => setRouteIdx(Number(e.target.value))}>
            {ROUTES.map((r, i) => <option key={i} value={i}>{r.name}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="d-temp">Conditions</label>
          <select id="d-temp" value={tempKey} onChange={(e) => setTempKey(e.target.value)}>
            <option value="mild">Mild · 18°C</option>
            <option value="cold">Cold · −4°C (winter penalty)</option>
            <option value="hot">Hot · 38°C (A/C load)</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="d-soc">Starting charge</label>
          <select id="d-soc" value={soc} onChange={(e) => setSoc(Number(e.target.value))}>
            <option value="100">100%</option>
            <option value="90">90%</option>
            <option value="80">80%</option>
            <option value="60">60%</option>
          </select>
        </div>
        <button type="button" className="btn btn-green" onClick={runCalculation}>Compute the plan</button>
        <p className="mono" style={{ fontSize: '.66rem', color: 'var(--muted)', letterSpacing: '.06em', marginTop: '4px' }}>
          DEMO &middot; SAMPLE DATA &middot; NOT LIVE STATION STATUS
        </p>
      </form>

      <div>
        <div className="sign" id="d-out" aria-live="polite">
          <span className="exit-tab">YOUR&nbsp;PLAN</span>
          <small>{output.corridorName}</small>
          <div className="sign-route">
            {output.routeName.replace('→', '→')}
            <span className="mono" style={{ fontSize: '.8rem', fontWeight: 400, color: '#BFE3CF', marginLeft: '8px' }}>
              {ROUTES[routeIdx].km} km
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
  );
}
