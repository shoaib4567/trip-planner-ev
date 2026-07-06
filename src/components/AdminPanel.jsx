import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function AdminPanel() {
  const { 
    waitlistEmails, 
    correctionsQueue, 
    resolveCorrection, 
    vehicles 
  } = useContext(AppContext);

  const pendingCount = correctionsQueue.filter(c => c.status === 'pending').length;
  const resolvedCount = correctionsQueue.filter(c => c.status === 'resolved').length;

  return (
    <div>
      <h2 style={{ marginBottom: '8px', fontSize: '1.8rem' }}>Admin Console</h2>
      <p className="lede" style={{ marginBottom: '24px' }}>Internal operator control board for managing reviews, corrections, and customer metrics.</p>

      {/* Stats Cards */}
      <div className="stats" style={{ marginBottom: '28px' }}>
        <div className="stat">
          <b>{waitlistEmails.length}</b>
          <p>Total Waitlist Signups</p>
          <cite>Real-Time Ingestion</cite>
        </div>
        <div className="stat">
          <b>{pendingCount}</b>
          <p>Pending Corrections</p>
          <cite>Needs Manual Audit</cite>
        </div>
        <div className="stat">
          <b>{resolvedCount}</b>
          <p>Resolved Reports</p>
          <cite>Changelog Synced</cite>
        </div>
        <div className="stat">
          <b>{vehicles.length}</b>
          <p>Garage Vehicle Profiles</p>
          <cite>Presets + Custom Spec</cite>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '28px' }}>
        {/* Waitlist Table */}
        <div className="panel" style={{ alignContent: 'start' }}>
          <h3 style={{ color: 'var(--green-950)', marginBottom: '8px' }}>Waitlist Emails</h3>
          {waitlistEmails.length === 0 ? (
            <p style={{ color: 'var(--muted)', fontSize: '.9rem' }}>No registrations received yet. Submit the waitlist form on the landing page to test.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Email Address</th>
                  <th>Date Joined</th>
                </tr>
              </thead>
              <tbody>
                {waitlistEmails.map((email, idx) => (
                  <tr key={idx}>
                    <td className="mono">{email}</td>
                    <td className="mono">{new Date().toISOString().split('T')[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Corrections Queue Table */}
        <div className="panel" style={{ alignContent: 'start' }}>
          <h3 style={{ color: 'var(--green-950)', marginBottom: '8px' }}>Charger Bug Queue</h3>
          {correctionsQueue.length === 0 ? (
            <p style={{ color: 'var(--muted)', fontSize: '.9rem' }}>All station corrections clear!</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="admin-table" style={{ minWidth: '400px' }}>
                <thead>
                  <tr>
                    <th>Station</th>
                    <th>Issue Type</th>
                    <th>Note</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {correctionsQueue.map((c) => (
                    <tr key={c.id} style={{ opacity: c.status === 'resolved' ? 0.6 : 1 }}>
                      <td>
                        <b>{c.station}</b>
                        <div style={{ fontSize: '.7rem', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
                          by {c.user} on {c.date}
                        </div>
                      </td>
                      <td>
                        <span className="chip" style={{ 
                          fontSize: '.65rem', 
                          background: c.category.includes('broken') ? '#FFE6E6' : '#E6EDFF',
                          color: c.category.includes('broken') ? '#c00' : '#0044cc'
                        }}>
                          {c.category}
                        </span>
                      </td>
                      <td style={{ fontSize: '.8rem' }}>{c.note}</td>
                      <td>
                        {c.status === 'pending' ? (
                          <button 
                            onClick={() => resolveCorrection(c.id)} 
                            className="btn btn-green btn-sm"
                            style={{ padding: '4px 8px', fontSize: '.7rem' }}
                          >
                            Resolve
                          </button>
                        ) : (
                          <span style={{ color: 'var(--grade-a)', fontWeight: 'bold' }}>✓ Done</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
