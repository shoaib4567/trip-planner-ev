import React, { useState } from 'react';

export default function MethodologyPage() {
  const [successRate, setSuccessRate] = useState(95);
  const [deliveryRatio, setDeliveryRatio] = useState(90);
  const [failures, setFailures] = useState(1);
  const [repairBonus, setRepairBonus] = useState(0);

  // Calculate score based on formula
  const score = Math.max(0, Math.min(100, Math.round(
    100 * (successRate / 100) * (deliveryRatio / 100) - (failures * 5) + repairBonus
  )));

  const getGrade = (s) => {
    if (s >= 90) return 'A';
    if (s >= 80) return 'B';
    if (s >= 70) return 'C';
    if (s >= 60) return 'D';
    return 'F';
  };

  return (
    <div className="methodology-view-container" style={{ paddingTop: '100px', minHeight: '80vh' }}>
      <section className="mile mile--tight">
        <span className="milemark">Trust · Math Formula</span>
        <div className="wrap">
          <div className="mile-head">
            <p className="eyebrow">Radial Transparency</p>
            <h2>How we calculate charging station reliability.</h2>
            <p className="lede">
              Scores in the EV industry are often opaque or swayed by corporate sponsorships. We publish our exact grading formula so drivers know exactly how their plan gets evaluated.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '36px', margin: '36px 0' }}>
            <div className="panel" style={{ padding: '28px' }}>
              <h3 style={{ color: 'var(--green-950)', marginBottom: '16px' }}>The Published Equation</h3>
              <div className="formula" style={{ margin: '12px 0 20px 0', fontSize: '.88rem' }}>
{`GRADE(stall) = f( success_rate_30d            ← 30d sessions count
               , failure_reports             ← reports knock points
               , recency_decay(λ=0.92/day)   ← decay older data
               , throughput_vs_rated_kW      ← "works, but slow" penalty
               , confirmed_repairs )         ← restores status`}
              </div>
              <p style={{ fontSize: '.9rem', color: 'var(--muted)', lineHeight: '1.5' }}>
                We weigh failures by time: a fault report submitted yesterday carries more influence than a successful charge from two weeks ago. Furthermore, stations that are capping output (e.g. delivering 62 kW on a 150 kW stall) are penalized.
              </p>
            </div>

            {/* Interactive Grading Widget */}
            <div className="panel" style={{ background: 'var(--green-950)', color: '#fff', padding: '28px' }}>
              <h3 style={{ color: '#fff', marginBottom: '16px' }}>Formula Simulator</h3>
              
              <div className="field">
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#BFE3CF', fontSize: '.75rem' }}>
                  <span>30d Success Rate</span>
                  <b>{successRate}%</b>
                </div>
                <input type="range" min="50" max="100" value={successRate} onChange={(e) => setSuccessRate(Number(e.target.value))} style={{ width: '100%' }} />
              </div>

              <div className="field" style={{ marginTop: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#BFE3CF', fontSize: '.75rem' }}>
                  <span>Delivery Speed Ratio (Peak kW / Rated kW)</span>
                  <b>{deliveryRatio}%</b>
                </div>
                <input type="range" min="50" max="100" value={deliveryRatio} onChange={(e) => setDeliveryRatio(Number(e.target.value))} style={{ width: '100%' }} />
              </div>

              <div className="field" style={{ marginTop: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#BFE3CF', fontSize: '.75rem' }}>
                  <span>Recent Failure Events (Last 30 Days)</span>
                  <b>{failures} failures</b>
                </div>
                <input type="range" min="0" max="10" value={failures} onChange={(e) => setFailures(Number(e.target.value))} style={{ width: '100%' }} />
              </div>

              <div className="field" style={{ marginTop: '12px', borderBottom: '1px dashed rgba(255,255,255,.2)', paddingBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#BFE3CF', fontSize: '.75rem' }}>
                  <span>Verified Repair Bonus</span>
                  <b>+{repairBonus} pts</b>
                </div>
                <input type="range" min="0" max="15" value={repairBonus} onChange={(e) => setRepairBonus(Number(e.target.value))} style={{ width: '100%' }} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px' }}>
                <div>
                  <span style={{ fontSize: '.7rem', color: '#BFE3CF', textTransform: 'uppercase', display: 'block' }}>SIMULATED SCORE</span>
                  <b style={{ fontSize: '2rem', lineHeight: '1' }}>{score} / 100</b>
                </div>
                <div className={`grade ${getGrade(score).toLowerCase()}`} style={{ width: '48px', height: '48px', fontSize: '1.5rem', boxShadow: 'none' }}>
                  {getGrade(score)}
                </div>
              </div>
            </div>
          </div>

          <h3 style={{ fontSize: '1.4rem', color: 'var(--green-950)', marginBottom: '16px' }}>Formula Variables Defined</h3>
          <div className="stats" style={{ marginBottom: '40px', gap: '20px' }}>
            <div className="stat" style={{ background: '#fff' }}>
              <b style={{ fontSize: '1.25rem' }}>success_rate_30d</b>
              <p style={{ fontSize: '.85rem', color: 'var(--muted)', marginTop: '6px' }}>
                Sessions divided by total attempts. Sessions that fail to initiate are fully counted as terminal errors.
              </p>
            </div>
            <div className="stat" style={{ background: '#fff' }}>
              <b style={{ fontSize: '1.25rem' }}>recency_decay</b>
              <p style={{ fontSize: '.85rem', color: 'var(--muted)', marginTop: '6px' }}>
                Mathematical multiplier $\lambda^t$ reducing weight of logs daily. If fixed, recent successes restore score quickly.
              </p>
            </div>
            <div className="stat" style={{ background: '#fff' }}>
              <b style={{ fontSize: '1.25rem' }}>delivery_ratio</b>
              <p style={{ fontSize: '.85rem', color: 'var(--muted)', marginTop: '6px' }}>
                Actual peak charging rates compared to nameplate speed. Slowed rates (e.g. 50 kW on 350 kW plug) degrade quality scores.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
