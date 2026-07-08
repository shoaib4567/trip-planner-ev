import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function PricingPage({ onNavigate }) {
  const { user, upgradeToPremium } = useContext(AppContext);
  const [billingPeriod, setBillingPeriod] = useState('monthly'); // monthly or annual

  const handleSelectPremium = () => {
    if (user) {
      onNavigate('checkout');
    } else {
      onNavigate('auth');
    }
  };

  return (
    <div className="pricing-view-container" style={{ paddingTop: '100px', minHeight: '80vh' }}>
      <section className="mile mile--tight">
        <span className="milemark">Pricing · Subscription</span>
        <div className="wrap">
          <div className="mile-head" style={{ textAlign: 'center', margin: '0 auto 48px auto' }}>
            <p className="eyebrow" style={{ justifyContent: 'center' }}>Simple &amp; Transparent Plans</p>
            <h2>Planning is free. The car seat costs a coffee.</h2>
            <p className="lede" style={{ margin: '0 auto' }}>
              Grade charger reliability and model your vehicle range for free forever. Upgrade to Premium for live driving integration.
            </p>
            
            {/* Billing Toggle */}
            <div style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--line)', padding: '4px', borderRadius: 'var(--r-ui)', marginTop: '24px' }}>
              <button 
                onClick={() => setBillingPeriod('monthly')}
                className={`btn btn-sm ${billingPeriod === 'monthly' ? 'btn-reflect' : ''}`}
                style={{ border: 'none', boxShadow: billingPeriod === 'monthly' ? 'var(--shadow-card)' : 'none', padding: '8px 16px', borderRadius: '8px' }}
              >
                Monthly
              </button>
              <button 
                onClick={() => setBillingPeriod('annual')}
                className={`btn btn-sm ${billingPeriod === 'annual' ? 'btn-reflect' : ''}`}
                style={{ border: 'none', boxShadow: billingPeriod === 'annual' ? 'var(--shadow-card)' : 'none', padding: '8px 16px', borderRadius: '8px', position: 'relative' }}
              >
                Annual (Save 17%)
                <span style={{ position: 'absolute', top: '-10px', right: '-10px', background: 'var(--amber)', color: '#3A2800', fontSize: '.55rem', fontWeight: 'bold', padding: '2px 6px', borderRadius: '99px' }}>
                  Best Value
                </span>
              </button>
            </div>
          </div>

          <div className="plans" style={{ marginBottom: '56px' }}>
            {/* Free Plan */}
            <div className="plan">
              <h3>Free</h3>
              <div className="price">$0<span> / forever</span></div>
              <p style={{ color: 'var(--muted)', fontSize: '.93rem' }}>Everything you need to plan with confidence.</p>
              <ul style={{ paddingLeft: 0, margin: '20px 0' }}>
                <li>Unlimited trip plans, 700+ EV models</li>
                <li>Reliability grades &amp; review digests</li>
                <li>True-cost estimates per stop</li>
                <li>Sensitivity band &amp; confidence score</li>
                <li>Send plan to your phone</li>
              </ul>
              <button onClick={() => onNavigate('app')} className="btn btn-ghost" style={{ marginTop: 'auto' }}>
                Start Planning
              </button>
            </div>

            {/* Premium Plan */}
            <div className="plan hot">
              <span className="badge">FOUNDING PRICE</span>
              <h3>Premium</h3>
              <div className="price">
                {billingPeriod === 'monthly' ? '$4.99' : '$4.08'}
                <span> / month {billingPeriod === 'annual' && <small style={{ display: 'block', fontSize: '.7rem', color: 'var(--muted)' }}>billed as $49 / year</small>}</span>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '.93rem' }}>The plan that rides with you.</p>
              <ul style={{ paddingLeft: 0, margin: '20px 0' }}>
                <li>CarPlay &amp; Android Auto navigation</li>
                <li>Live re-routing &amp; one-tap Plan B swap</li>
                <li>Live weather &amp; traffic in the energy model</li>
                <li>Price alerts ("30% cheaper 2 exits ahead")</li>
                <li>Vehicle telematics &mdash; live state of charge</li>
                <li>Occupancy-timed departure suggestions</li>
              </ul>
              <button 
                onClick={handleSelectPremium} 
                className="btn btn-green" 
                style={{ marginTop: 'auto' }}
              >
                {user?.plan === 'Premium' ? 'Plan Active' : 'Go Premium'}
              </button>
            </div>

            {/* Business Plan */}
            <div className="plan">
              <h3>Business &amp; API</h3>
              <div className="price">Custom</div>
              <p style={{ color: 'var(--muted)', fontSize: '.93rem' }}>The trust layer, in your product.</p>
              <ul style={{ paddingLeft: 0, margin: '20px 0' }}>
                <li>Reliability &amp; true-cost data API</li>
                <li>Embeddable planner widget, white-label</li>
                <li>Fleet routing with cost &amp; CO₂ reporting</li>
                <li>Uptime insights for networks &amp; agencies</li>
                <li>Dedicated support SLA</li>
              </ul>
              <button onClick={() => onNavigate('contact')} className="btn btn-ghost" style={{ marginTop: 'auto' }}>
                Talk to Sales
              </button>
            </div>
          </div>

          {/* Feature Matrix Table */}
          <h3 style={{ fontSize: '1.5rem', color: 'var(--green-950)', marginBottom: '20px', textAlign: 'center' }}>Detailed Plan Comparison</h3>
          <div className="tablewrap" style={{ marginBottom: '48px' }}>
            <table>
              <thead>
                <tr>
                  <th scope="col">Capability</th>
                  <th scope="col" className="us">Free</th>
                  <th scope="col" className="us" style={{ background: 'var(--green-900)' }}>Premium</th>
                  <th scope="col">Business / API</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Unlimited trip plans, 700+ vehicles</td>
                  <td className="yes">✓</td>
                  <td className="yes" style={{ background: 'var(--green-100)' }}>✓</td>
                  <td className="yes">✓</td>
                </tr>
                <tr>
                  <td>Reliability grades &amp; review digests</td>
                  <td className="yes">✓</td>
                  <td className="yes" style={{ background: 'var(--green-100)' }}>✓</td>
                  <td className="yes">✓</td>
                </tr>
                <tr>
                  <td>Sensitivity range band</td>
                  <td className="yes">✓</td>
                  <td className="yes" style={{ background: 'var(--green-100)' }}>✓</td>
                  <td className="yes">✓</td>
                </tr>
                <tr>
                  <td>Pre-planned Plan B alternates</td>
                  <td className="yes">✓</td>
                  <td className="yes" style={{ background: 'var(--green-100)' }}>✓</td>
                  <td className="yes">✓</td>
                </tr>
                <tr>
                  <td>Live weather &amp; wind drag penalty</td>
                  <td className="no">No</td>
                  <td className="yes" style={{ background: 'var(--green-100)' }}>✓</td>
                  <td className="yes">✓</td>
                </tr>
                <tr>
                  <td>CarPlay &amp; Android Auto integration</td>
                  <td className="no">No</td>
                  <td className="yes" style={{ background: 'var(--green-100)' }}>✓</td>
                  <td className="yes">✓</td>
                </tr>
                <tr>
                  <td>Live vehicle telematics (SoC syncing)</td>
                  <td className="no">No</td>
                  <td className="yes" style={{ background: 'var(--green-100)' }}>✓</td>
                  <td className="yes">✓</td>
                </tr>
                <tr>
                  <td>Dynamic corridor price alerts</td>
                  <td className="no">No</td>
                  <td className="yes" style={{ background: 'var(--green-100)' }}>✓</td>
                  <td className="yes">✓</td>
                </tr>
                <tr>
                  <td>White-label map embed code</td>
                  <td className="no">No</td>
                  <td className="no">No</td>
                  <td className="yes">✓</td>
                </tr>
                <tr>
                  <td>REST Data API Access</td>
                  <td className="no">No</td>
                  <td className="no">No</td>
                  <td className="yes">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
