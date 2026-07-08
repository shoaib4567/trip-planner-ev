import React from 'react';

const RELEASES = [
  {
    version: 'v1.1.0',
    date: 'July 2026',
    title: 'Wind drag and CarPlay simulation',
    changes: [
      'Added live headwind drag penalty calculations (5% increased Wh/km in high winds).',
      'Released interactive CarPlay companion dashboard simulator for Premium users.',
      'Configured automated state of charge polling simulator via Smartcar vehicle credentials.'
    ]
  },
  {
    version: 'v1.0.0',
    date: 'June 2026',
    title: 'Core grading engine launch',
    changes: [
      'Launched the published GRADE(stall) algorithm using a rolling 30-day session window.',
      'Implemented recency-weighted decay scoring (yesterday outweighs two weeks ago).',
      'Configured automatic local backups for client-side EV plans.'
    ]
  }
];

export default function ChangelogPage() {
  return (
    <div className="changelog-view-container" style={{ paddingTop: '100px', minHeight: '80vh' }}>
      <section className="mile mile--tight">
        <span className="milemark">Changelog · What's New</span>
        <div className="wrap" style={{ maxWidth: '720px' }}>
          <div className="mile-head" style={{ marginBottom: '32px' }}>
            <p className="eyebrow">Updates</p>
            <h2>Changelog &amp; Grade Engine Revisions</h2>
            <p className="lede">
              We log every change to the routing parameters and score weights.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {RELEASES.map((rel, idx) => (
              <div key={idx} className="panel" style={{ padding: '24px', alignContent: 'start' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--line)', paddingBottom: '12px', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--green-950)' }}>{rel.title}</h3>
                  <span className="mono" style={{ background: 'var(--green-100)', color: 'var(--green-900)', fontSize: '.75rem', fontWeight: 'bold', padding: '4px 8px', borderRadius: '4px' }}>
                    {rel.version} &middot; {rel.date}
                  </span>
                </div>
                <ul style={{ paddingLeft: '20px', color: 'var(--muted)', fontSize: '.95rem' }}>
                  {rel.changes.map((change, cIdx) => (
                    <li key={cIdx} style={{ marginBottom: '8px' }}>{change}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
