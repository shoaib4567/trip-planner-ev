import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function StripeCheckout({ onNavigate }) {
  const { upgradeToPremium } = useContext(AppContext);
  const [billingCycle, setBillingCycle] = useState('monthly'); // monthly, annual
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardName, setCardName] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API request to Stripe
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      upgradeToPremium(); // Upgrade state in AppContext
    }, 2000);
  };

  if (success) {
    return (
      <div className="stripe-mock" style={{ textAlign: 'center', minHeight: '320px', justifyContent: 'center' }}>
        <div style={{ fontSize: '3rem', color: 'var(--grade-a)', marginBottom: '16px' }}>✓</div>
        <h3 style={{ fontSize: '1.6rem', color: 'var(--green-950)', marginBottom: '8px' }}>Payment Successful!</h3>
        <p className="lede" style={{ fontSize: '.9rem', margin: '0 auto 24px auto', maxWidth: '36ch' }}>
          Thank you! Your account is now upgraded to **Premium**. In-car CarPlay routing, telematics, and price alerts are now unlocked.
        </p>
        <button 
          onClick={() => onNavigate('app', 'planner')} 
          className="btn btn-green"
          style={{ width: '100%' }}
        >
          Launch Planner App
        </button>
      </div>
    );
  }

  return (
    <div className="stripe-mock">
      <div className="stripe-header">
        <div>
          <h3 style={{ fontSize: '1.25rem', color: 'var(--green-950)' }}>Founding Subscriber</h3>
          <span style={{ fontSize: '.75rem', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>TRIP PLANNER EV PREMIUM</span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <b style={{ fontSize: '1.5rem', display: 'block', color: 'var(--green)', lineHeight: 1 }}>
            {billingCycle === 'monthly' ? '$4.99' : '$49.00'}
          </b>
          <span style={{ fontSize: '.7rem', color: 'var(--muted)' }}>
            {billingCycle === 'monthly' ? '/ month' : '/ year'}
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', background: 'var(--paper)', padding: '4px', borderRadius: '8px' }}>
        <button 
          type="button"
          onClick={() => setBillingCycle('monthly')}
          className="btn btn-sm"
          style={{ 
            flex: 1, 
            background: billingCycle === 'monthly' ? '#fff' : 'transparent',
            boxShadow: billingCycle === 'monthly' ? 'var(--shadow-card)' : 'none',
            color: 'var(--ink)',
            padding: '6px'
          }}
        >
          Monthly ($4.99)
        </button>
        <button 
          type="button"
          onClick={() => setBillingCycle('annual')}
          className="btn btn-sm"
          style={{ 
            flex: 1, 
            background: billingCycle === 'annual' ? '#fff' : 'transparent',
            boxShadow: billingCycle === 'annual' ? 'var(--shadow-card)' : 'none',
            color: 'var(--ink)',
            padding: '6px'
          }}
        >
          Annual ($49.00 - Save 17%)
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="field">
          <label htmlFor="stripe-name">Cardholder Name</label>
          <input 
            type="text" 
            id="stripe-name"
            required
            className="stripe-input" 
            placeholder="John Driver"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="stripe-card">Card Number</label>
          <input 
            type="text" 
            id="stripe-card"
            required
            maxLength="19"
            className="stripe-input" 
            placeholder="4242 4242 4242 4242"
            value={cardNumber}
            onChange={(e) => {
              // format spacing
              const val = e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
              setCardNumber(val);
            }}
          />
        </div>

        <div className="stripe-row">
          <div className="field">
            <label htmlFor="stripe-expiry">Expiration Date</label>
            <input 
              type="text" 
              id="stripe-expiry"
              required
              maxLength="5"
              className="stripe-input" 
              placeholder="MM/YY"
              value={expiry}
              onChange={(e) => {
                let val = e.target.value;
                if (val.length === 2 && !val.includes('/')) {
                  val += '/';
                }
                setExpiry(val);
              }}
            />
          </div>
          <div className="field">
            <label htmlFor="stripe-cvc">CVC Security Code</label>
            <input 
              type="password" 
              id="stripe-cvc"
              required
              maxLength="4"
              className="stripe-input" 
              placeholder="•••"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
            />
          </div>
        </div>

        <div className="alert-box">
          💳 <b>Sandbox Mode:</b> You can submit this checkout form with any mock card details to simulate Stripe integration.
        </div>

        <button 
          className="btn btn-green" 
          type="submit" 
          disabled={loading}
          style={{ width: '100%', marginTop: '8px' }}
        >
          {loading ? 'Processing Transaction...' : `Pay ${billingCycle === 'monthly' ? '$4.99' : '$49.00'}`}
        </button>
      </form>
    </div>
  );
}
