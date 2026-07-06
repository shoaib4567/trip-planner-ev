import React from 'react';

export default function Footer({ onNavigate }) {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <a 
              className="brand" 
              href="#top" 
              onClick={(e) => {
                e.preventDefault();
                onNavigate('landing');
              }}
              style={{ color: '#fff', marginBottom: '12px' }}
            >
              <svg className="shield" viewBox="0 0 32 34" fill="none" aria-hidden="true">
                <path d="M16 1.5 30 6v12.5C30 26 24 31 16 32.8 8 31 2 26 2 18.5V6L16 1.5Z" fill="#0E5E44" stroke="#fff" stroke-width="2"/>
                <path d="M17.8 8 11 18.5h4.4L14 26l7-10.5h-4.4L17.8 8Z" fill="#EFA51C"/>
              </svg>
              Trip Planner <b style={{ color: '#EFA51C' }}>EV</b>
            </a>
            <p style={{ maxWidth: '34ch', fontSize: '.88rem' }}>The trust layer for EV road trips. Grades earned at the plug &mdash; never sold.</p>
          </div>
          <div>
            <h4>Product</h4>
            <a href="#features">Features</a>
            <a href="#demo">Live demo</a>
            <a href="#pricing">Pricing</a>
            <a href="#method">Methodology</a>
          </div>
          <div>
            <h4>Company</h4>
            <a href="#faq">FAQ</a>
            <a href="mailto:hello@tripplannerev.com">Contact</a>
            <a href="#cta">Waitlist</a>
          </div>
          <div>
            <h4>Data &amp; legal</h4>
            <a href="https://openchargemap.org" rel="noopener noreferrer" target="_blank">OpenChargeMap</a>
            <a href="https://www.openstreetmap.org/copyright" rel="noopener noreferrer" target="_blank">OpenStreetMap &copy; contributors</a>
            <a href="#privacy" onClick={(e) => { e.preventDefault(); alert("Mock Privacy Policy: We keep your trip data private and never sell location coordinates."); }}>Privacy policy</a>
            <a href="#terms" onClick={(e) => { e.preventDefault(); alert("Mock Terms: Estimates are physics-based models; verified charging states depend on real-world conditions."); }}>Terms</a>
          </div>
        </div>
        <div className="foot-legal">
          <span>&copy; 2026 Trip Planner EV. Station data &copy; OpenChargeMap &amp; OpenStreetMap contributors (ODbL).</span>
          <span>No fake reviews. No pay-to-rank. Grades are earned.</span>
        </div>
      </div>
    </footer>
  );
}
