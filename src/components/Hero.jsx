import React from 'react';

export default function Hero({ onNavigate }) {
  return (
    <section id="hero">
      <div className="wrap">
        <div className="hero-copy">
          <p className="eyebrow">The trust layer for EV road trips</p>
          <h1>Know it&rsquo;ll work.<br/>Know what it costs.<br/><em>Before you drive.</em></h1>
          <p className="lede">1 in 7 public charging stops still fails. Trip Planner EV grades every charger from real session outcomes, prices every stop for your exact car, and pre-plans your backup &mdash; so charge anxiety never rides along.</p>
          <div className="hero-ctas">
            <button 
              onClick={() => onNavigate('app')} 
              className="btn btn-green"
            >
              Plan a free trip
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ marginLeft: '4px' }}>
                <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
            <a className="btn btn-ghost" href="#method">Read the grading formula</a>
          </div>
          <p className="hero-foot">Free to plan &middot; <b>700+ EV models</b> &middot; No account needed &middot; No pay-to-rank, ever</p>
        </div>

        {/* the trip ticket: your route rendered as a guide sign */}
        <div>
          <div className="sign" role="img" aria-label="Sample trip plan: San Francisco to Los Angeles, two graded charging stops, 94 percent confidence">
            <span className="exit-tab">TRIP&nbsp;PLAN</span>
            <small>Northbound &middot; I-5 corridor</small>
            <div class="sign-route">San Francisco <span aria-hidden="true">&rarr;</span> Los Angeles
              <span className="mono" style={{ fontSize: '.8rem', fontWeight: 400, color: '#BFE3CF', marginLeft: '8px' }}>614&nbsp;km</span>
            </div>

            <div className="stop" style={{ marginTop: '14px' }}>
              <span className="grade a" aria-label="Reliability grade A">A</span>
              <div>
                <div className="stop-name">Kettleman City &middot; 250&nbsp;kW</div>
                <div className="stop-meta">last good charge 38&nbsp;min ago &middot; usually free 2&ndash;4&nbsp;pm</div>
              </div>
              <div className="stop-cost">$11.40<br/><span style={{ fontSize: '.66rem', fontWeight: 400, color: '#BFE3CF' }}>18 min</span></div>
            </div>

            <div className="stop">
              <span className="grade b" aria-label="Reliability grade B plus">B+</span>
              <div>
                <div className="stop-name">Tejon Ranch &middot; 150&nbsp;kW</div>
                <div className="stop-meta">stall 3 throttles to 62&nbsp;kW &mdash; use 1, 2 or 4</div>
              </div>
              <div className="stop-cost">$8.90<br/><span style={{ fontSize: '.66rem', fontWeight: 400, color: '#BFE3CF' }}>14 min</span></div>
            </div>

            <div className="planb">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 1v7M3.5 5 7 8.5 10.5 5M2 12.5h10" stroke="#EFA51C" stroke-width="1.8" stroke-linecap="round"/>
              </svg>
              PLAN&nbsp;B READY &middot; Buttonwillow (A&minus;) held in reserve, +9&nbsp;min
            </div>

            <div className="sign-readout">
              <div className="readout"><b>$20.30</b><span>true cost</span></div>
              <div className="readout"><b>6&nbsp;h&nbsp;42</b><span>door to door</span></div>
              <div className="readout"><b>&plusmn;6%</b><span>energy band</span></div>
              <div className="ring" style={{ '--p': 94 }}><i>94%</i></div>
            </div>
            <span className="demo-stamp">Illustration &middot; sample data</span>
          </div>
        </div>
      </div>
    </section>
  );
}
