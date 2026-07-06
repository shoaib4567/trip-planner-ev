import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

export default function CarPlayPreview({ onNavigate }) {
  const { user } = useContext(AppContext);
  const [time, setTime] = useState('10:42');
  const [activeStop, setActiveStop] = useState('Kettleman City'); // Kettleman City or Buttonwillow (Plan B)
  const [routeSwapped, setRouteSwapped] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      let hrs = d.getHours();
      const mins = String(d.getMinutes()).padStart(2, '0');
      const ampm = hrs >= 12 ? 'PM' : 'AM';
      hrs = hrs % 12 || 12;
      setTime(`${hrs}:${mins} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const isPremium = user?.plan === 'Premium';

  const handleSwapPlanB = () => {
    setActiveStop('Buttonwillow (Plan B)');
    setRouteSwapped(true);
  };

  const handleResetRoute = () => {
    setActiveStop('Kettleman City');
    setRouteSwapped(false);
  };

  if (!isPremium) {
    return (
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '8px', fontSize: '1.8rem' }}>CarPlay Companion</h2>
        <p className="lede" style={{ marginBottom: '24px' }}>In-car navigation overlays for CarPlay and Android Auto are Premium features.</p>
        
        <div className="panel" style={{ background: '#FFF9E6', borderColor: 'var(--amber)', textAlign: 'center', padding: '36px' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📟</div>
          <h3 style={{ fontSize: '1.4rem', color: '#5C4300', marginBottom: '12px' }}>Upgrade to Founding Premium</h3>
          <p style={{ color: 'var(--muted)', fontSize: '.95rem', margin: '0 auto 20px auto', maxWidth: '44ch' }}>
            Get graded chargers mapped directly onto your car dashboard. Includes live weather drag adjustment, automatic background location, and one-tap re-routing.
          </p>
          <button 
            onClick={() => onNavigate('checkout')} 
            className="btn btn-green"
            style={{ width: '100%', background: 'var(--amber)', color: '#3A2800' }}
          >
            ⭐ Get Premium Plan for $4.99/mo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ marginBottom: '8px', fontSize: '1.8rem' }}>CarPlay Companion</h2>
      <p className="lede" style={{ marginBottom: '24px' }}>Simulated representation of the in-car CarPlay Dashboard running on your dashboard screen.</p>

      <div className="carplay-container">
        <aside className="carplay-sidebar">
          <button onClick={handleResetRoute} className="carplay-home-btn" title="Home"></button>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center' }}>
            {/* Mock Apps Icons */}
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#0e5e44', display: 'grid', placeItems: 'center', fontWeight: 'bold', fontSize: '.8rem' }}>🗺️</div>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#1c1c1e', display: 'grid', placeItems: 'center', fontWeight: 'bold', fontSize: '.8rem' }}>🎵</div>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#1c1c1e', display: 'grid', placeItems: 'center', fontSize: '.8rem' }}>⚙️</div>
          </div>

          <div className="carplay-time">{time.split(' ')[0]}</div>
        </aside>

        <main className="carplay-main">
          <div className="carplay-nav-card">
            <div>
              <span className="carplay-status-pill">
                🟢 {routeSwapped ? 'ALTERNATE ROUTE' : 'ON ROUTE'}
              </span>
              <h3 style={{ fontSize: '1.4rem', color: '#fff', marginTop: '12px', lineHeight: 1.2 }}>
                Next charger in <span style={{ color: 'var(--amber)' }}>42 km</span>
              </h3>
              <p style={{ color: '#9da39f', fontSize: '.85rem', marginTop: '4px' }}>
                {activeStop} · Graded A &middot; 250 kW
              </p>
            </div>

            <div className="carplay-telemetry">
              <span style={{ fontSize: '.68rem', color: '#9da39f', fontFamily: 'var(--mono)', letterSpacing: '0.1em' }}>
                ESTIMATED ARRIVAL SOC
              </span>
              <b>{routeSwapped ? '23%' : '18%'}</b>
            </div>

            {!routeSwapped ? (
              <button 
                onClick={handleSwapPlanB}
                className="btn btn-green btn-sm"
                style={{ background: '#EFA51C', color: '#3A2800', width: '100%' }}
              >
                ⚠️ Swap to Plan B (+9 min)
              </button>
            ) : (
              <button 
                onClick={handleResetRoute}
                className="btn btn-ghost btn-sm"
                style={{ borderColor: '#fff', color: '#fff', width: '100%' }}
              >
                Reset Direct Route
              </button>
            )}
          </div>

          {/* Mini-map rendering */}
          <div style={{ background: '#141715', borderRadius: '12px', border: '1px solid #242926', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <small style={{ fontFamily: 'var(--mono)', color: '#9da39f', fontSize: '.6rem', letterSpacing: '.1em', textTransform: 'uppercase' }}>
                I-5 corridor driving log
              </small>
              <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '1rem', marginTop: '6px' }}>
                San Francisco → Los Angeles
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '16px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '.8rem', color: '#9da39f', borderBottom: '1px dashed #242926', paddingBottom: '6px' }}>
                <span>Driving Speed:</span>
                <span className="mono" style={{ color: '#fff' }}>108 km/h</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '.8rem', color: '#9da39f', borderBottom: '1px dashed #242926', paddingBottom: '6px' }}>
                <span>Efficiency:</span>
                <span className="mono" style={{ color: '#fff' }}>148 Wh/km</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '.8rem', color: '#9da39f', paddingBottom: '6px' }}>
                <span>Wind Resistance:</span>
                <span className="mono" style={{ color: 'var(--amber)' }}>Headwind (14 km/h)</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => alert('Mute Voice: Guidance audio muted')} className="btn btn-sm" style={{ flex: 1, padding: '4px', fontSize: '.75rem', background: '#1c1c1e', color: '#fff' }}>
                🔇 Mute
              </button>
              <button onClick={() => alert('Guidance ended')} className="btn btn-sm" style={{ flex: 1, padding: '4px', fontSize: '.75rem', background: '#c00', color: '#fff' }}>
                ❌ End
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
