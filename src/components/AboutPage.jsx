import React from 'react';

export default function AboutPage({ onNavigate }) {
  return (
    <div className="about-view-container" style={{ paddingTop: '100px', minHeight: '80vh' }}>
      <section className="mile mile--tight">
        <span className="milemark">About Us · Trust</span>
        <div className="wrap">
          <div className="mile-head">
            <p className="eyebrow">Our Story</p>
            <h2>Built to solve charge anxiety.</h2>
            <p className="lede">
              Trip Planner EV was founded in 2026 after a cold road trip through the I-5 corridor. 
              Batteries have become large enough to solve range anxiety, but driver satisfaction with charging stations is at an all-time low.
              We are building the trust layer for electric highway road trips.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '48px', margin: '48px 0' }}>
            <div className="panel" style={{ alignContent: 'start', padding: '32px' }}>
              <h3 style={{ color: 'var(--green-950)', marginBottom: '16px' }}>The Mission</h3>
              <p style={{ marginBottom: '16px', color: 'var(--muted)' }}>
                Every public charging session should be predictable. Drivers shouldn't have to scroll through raw community check-in threads at the side of the road to figure out which stall is delivering full power.
              </p>
              <p style={{ color: 'var(--muted)' }}>
                By normalizing charging rates, pricing models, and weather drag penalties, we calculate an honest door-to-door itinerary with verified back-up options. We do not sell promotional rank slots, and our formulas are open and reviewable.
              </p>
            </div>
            
            <div className="panel" style={{ background: 'var(--green)', color: '#fff', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h3 style={{ color: '#fff', marginBottom: '12px' }}>Radical Transparency</h3>
              <p style={{ color: '#C7DDD0', fontSize: '.95rem', marginBottom: '20px' }}>
                We believe trust is the only advantage. That is why we publish our exact grading calculation, source references, and code logic.
              </p>
              <button 
                onClick={() => onNavigate('methodology')} 
                className="btn btn-reflect btn-sm"
                style={{ alignSelf: 'flex-start' }}
              >
                Read Formula Math
              </button>
            </div>
          </div>

          <h3 style={{ fontSize: '1.6rem', color: 'var(--green-950)', marginBottom: '24px', borderBottom: '1px solid var(--line)', paddingBottom: '12px' }}>
            Our Foundational Pledges
          </h3>
          <div className="pledges" style={{ marginTop: '0', marginBottom: '48px' }}>
            <div className="pledge" style={{ background: '#fff', border: '1px solid var(--line)' }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M10 1.5 18 5v6c0 4.2-3.3 7.2-8 8.3C5.3 18.2 2 15.2 2 11V5l8-3.5Z" stroke="var(--green)" strokeWidth="1.7"/>
                <path d="M6.7 10.2 9 12.5l4.3-4.7" stroke="var(--green)" strokeWidth="1.7" strokeLinecap="round"/>
              </svg>
              <div>
                <b style={{ color: 'var(--green-950)' }}>No Pay-to-Rank. Ever.</b>
                <p style={{ fontSize: '.9rem', color: 'var(--muted)', marginTop: '4px' }}>Charging networks cannot pay to hide failures or boost their scores. Stalls earn their grade at the plug.</p>
              </div>
            </div>
            <div className="pledge" style={{ background: '#fff', border: '1px solid var(--line)' }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M3 10h5l2-5 3 10 2-5h2" stroke="var(--green)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div>
                <b style={{ color: 'var(--green-950)' }}>Failures Count as Failures.</b>
                <p style={{ fontSize: '.9rem', color: 'var(--muted)', marginTop: '4px' }}>"It failed twice but worked the third time" is recorded as a failure. We measure true driver success rates.</p>
              </div>
            </div>
          </div>

          <div className="panel" style={{ textAlign: 'center', padding: '36px', background: 'var(--green-100)', borderColor: 'var(--green)' }}>
            <h3 style={{ color: 'var(--green-950)' }}>Get in Touch</h3>
            <p className="lede" style={{ fontSize: '.95rem', margin: '8px auto 20px auto', maxWidth: '50ch' }}>
              Want to request features, discuss data integrations, or report an issue?
            </p>
            <button onClick={() => onNavigate('contact')} className="btn btn-green">
              Contact Team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
