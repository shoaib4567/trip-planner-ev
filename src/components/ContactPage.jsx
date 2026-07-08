import React, { useState } from 'react';

export default function ContactPage() {
  const [topic, setTopic] = useState('support');
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !msg.trim()) return;
    setSubmitted(true);
    setEmail('');
    setMsg('');
  };

  return (
    <div className="contact-view-container" style={{ paddingTop: '100px', minHeight: '80vh' }}>
      <section className="mile mile--tight">
        <span className="milemark">Contact · Reach Out</span>
        <div className="wrap" style={{ maxWidth: '640px' }}>
          <div className="mile-head" style={{ marginBottom: '32px' }}>
            <p className="eyebrow">Connect</p>
            <h2>Get in touch with the Trip Planner EV team.</h2>
            <p className="lede">
              We respond to all inquiries within 2 business days.
            </p>
          </div>

          {submitted ? (
            <div className="panel" style={{ textAlign: 'center', padding: '40px', background: 'var(--green-100)', borderColor: 'var(--green)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📨</div>
              <h3 style={{ color: 'var(--green-950)' }}>Message Received!</h3>
              <p style={{ color: 'var(--muted)', fontSize: '.95rem', marginTop: '6px' }}>
                Thank you for reaching out. A support ticket has been opened and we will follow up shortly at the email address provided.
              </p>
              <button onClick={() => setSubmitted(false)} className="btn btn-green btn-sm" style={{ marginTop: '20px' }}>
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="panel" style={{ padding: '32px' }}>
              <div className="field">
                <label htmlFor="con-topic">Select Department</label>
                <select id="con-topic" value={topic} onChange={(e) => setTopic(e.target.value)}>
                  <option value="support">General Support &amp; Feature Feedback</option>
                  <option value="sales">Business API &amp; Fleet Licensing</option>
                  <option value="operator">Station Operator Claim / Correction Escalation</option>
                </select>
              </div>

              <div className="field" style={{ marginTop: '16px' }}>
                <label htmlFor="con-email">Your Email Address</label>
                <input 
                  type="email" 
                  id="con-email" 
                  required 
                  placeholder="you@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="field" style={{ marginTop: '16px' }}>
                <label htmlFor="con-msg">Message / Detail</label>
                <textarea 
                  id="con-msg" 
                  required 
                  rows="5"
                  placeholder="Write your request here..."
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  style={{ width: '100%', padding: '10px', border: '1.5px solid var(--line)', borderRadius: '6px', font: 'inherit' }}
                />
              </div>

              <button type="submit" className="btn btn-green" style={{ marginTop: '24px', width: '100%' }}>
                Send Support Ticket
              </button>
            </form>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '36px' }}>
            <div className="panel" style={{ padding: '16px', textAlign: 'center' }}>
              <small style={{ fontFamily: 'var(--mono)', color: 'var(--muted)' }}>EMAIL DIRECT</small>
              <h4 style={{ margin: '4px 0 0 0', color: 'var(--green-950)' }}>hello@tripplannerev.com</h4>
            </div>
            <div className="panel" style={{ padding: '16px', textAlign: 'center' }}>
              <small style={{ fontFamily: 'var(--mono)', color: 'var(--muted)' }}>OPERATOR LINE</small>
              <h4 style={{ margin: '4px 0 0 0', color: 'var(--green-950)' }}>operators@tripplannerev.com</h4>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
