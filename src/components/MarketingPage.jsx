import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import InteractiveDemo from './InteractiveDemo';

export default function MarketingPage({ onNavigate }) {
  const { addWaitlistEmail } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [waitlistOk, setWaitlistOk] = useState(false);

  const handleWaitlistSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    addWaitlistEmail(email.trim());
    setWaitlistOk(true);
    setEmail('');
  };

  return (
    <>
      {/* ================= MILE 01: THE PROBLEM ================= */}
      <section className="mile mile--tight" id="problem">
        <span className="milemark">Mile 01 &middot; The problem</span>
        <div className="wrap">
          <div className="mile-head">
            <p className="eyebrow">Why this exists</p>
            <h2>Range anxiety is solved. Charge anxiety isn&rsquo;t.</h2>
            <p className="lede">Batteries got bigger and networks got denser &mdash; yet driver satisfaction with public charging is at a multi-year low. The problem moved: it&rsquo;s no longer <i>&ldquo;will I make it?&rdquo;</i> It&rsquo;s <i>&ldquo;will the charger work, and what will it cost me?&rdquo;</i> The industry&rsquo;s own numbers:</p>
          </div>
          <div className="stats">
            <div className="stat">
              <b>14%</b>
              <p>of public charging visits still end without a successful charge.</p>
              <cite>J.D. Power 2025 EVX Study</cite>
            </div>
            <div className="stat">
              <b>43%</b>
              <p>of public chargers can be effectively unavailable at a given moment &mdash; broken or jammed.</p>
              <cite>Parkopedia analysis, 2026</cite>
            </div>
            <div className="stat">
              <b>60%</b>
              <p>of failed visits trace to one cause: the charger was out of service.</p>
              <cite>J.D. Power 2025 EVX Study</cite>
            </div>
            <div className="stat">
              <b>#10</b>
              <p>where cost ranks among 10 satisfaction factors for DC fast charging &mdash; dead last.</p>
              <cite>J.D. Power 2025 EVX Study</cite>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MILE 02: FEATURES ================= */}
      <section className="mile" id="features">
        <span className="milemark">Mile 02 &middot; What you get</span>
        <div className="wrap">
          <div className="mile-head">
            <p className="eyebrow">Built for the new problem</p>
            <h2>Every stop graded, priced, and backed up.</h2>
            <p className="lede">Other planners tell you where chargers are. Trip Planner EV tells you which ones will actually work, what they&rsquo;ll actually cost <i>your</i> car, and what to do if one lets you down.</p>
          </div>
          <div className="features">
            <article className="feature">
              <div className="glyph">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <path d="M11 1.5 19.5 5v6.5c0 4.6-3.6 7.9-8.5 9-4.9-1.1-8.5-4.4-8.5-9V5L11 1.5Z" stroke="currentColor" stroke-width="1.8"/>
                  <path d="M7.5 11.2 10 13.7l4.5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                </svg>
              </div>
              <h3>Reliability grades, A&ndash;F</h3>
              <p>Every charger &mdash; every <i>stall</i> &mdash; graded from real session outcomes: recent successes, honest failure counts, recency decay. The formula is published. Operators can&rsquo;t buy a grade.</p>
              <div className="chiprow">
                <span className="chip" style={{ background: 'var(--grade-a)', color: '#fff' }}>A</span>
                <span className="chip" style={{ background: 'var(--grade-b)', color: '#233A0C' }}>B</span>
                <span className="chip" style={{ background: 'var(--grade-c)', color: '#4A3202' }}>C</span>
                <span className="chip" style={{ background: 'var(--grade-d)', color: '#fff' }}>D</span>
              </div>
            </article>

            <article className="feature">
              <div className="glyph">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <circle cx="11" cy="11" r="9" stroke="currentColor" stroke-width="1.8"/>
                  <path d="M11 6v5l3.2 2.2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                </svg>
              </div>
              <h3>True cost, for your car</h3>
              <p>kWh pricing, per-minute pricing, session fees, idle fees, membership vs pay-as-you-go &mdash; normalized into one honest number per stop. &ldquo;This stop &asymp; $11.40 for you.&rdquo;</p>
              <div className="chiprow">
                <span className="chip">$/kWh</span>
                <span className="chip">$/min</span>
                <span className="chip">idle fees</span>
              </div>
            </article>

            <article className="feature">
              <div className="glyph">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <path d="M2 16c3-8 6-12 9-12s6 4 9 12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                  <path d="M2 19h18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" opacity=".4"/>
                </svg>
              </div>
              <h3>A band, not a guess</h3>
              <p>Physics-based energy modeling &mdash; speed, elevation, temperature, wind, payload &mdash; shown as a sensitivity band, not false single-number precision. You see the envelope of outcomes.</p>
              <div className="chiprow">
                <span className="chip">&plusmn;6% mild</span>
                <span className="chip">&plusmn;12% cold</span>
              </div>
            </article>

            <article className="feature">
              <div className="glyph">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <path d="M3 11h6l2.5-6L14 17l2.5-6H19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h3>Plan B, pre-computed</h3>
              <p>Every charging stop ships with a vetted fallback already routed. If a stall is dead or a queue forms, one tap re-routes &mdash; no roadside scramble through review threads.</p>
              <div className="chiprow">
                <span className="chip">auto-swap</span>
                <span className="chip">+min shown</span>
              </div>
            </article>

            <article className="feature">
              <div className="glyph">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <path d="M4 5h14M4 11h14M4 17h8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                </svg>
              </div>
              <h3>Review digest, not review sludge</h3>
              <p>Hundreds of driver comments condensed to what matters: &ldquo;Stalls 3&ndash;4 throttle to 62&nbsp;kW &mdash; use 1, 2 or 4. Entrance is behind the diner.&rdquo; Read in five seconds, at a glance.</p>
              <div className="chiprow">
                <span className="chip">AI-condensed</span>
                <span className="chip">source-linked</span>
              </div>
            </article>

            <article className="feature">
              <div className="glyph">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <rect x="3" y="9" width="3.4" height="9" rx="1" fill="currentColor" opacity=".35"/>
                  <rect x="9.3" y="5" width="3.4" height="13" rx="1" fill="currentColor" opacity=".65"/>
                  <rect x="15.6" y="12" width="3.4" height="6" rx="1" fill="currentColor"/>
                </svg>
              </div>
              <h3>Occupancy forecast</h3>
              <p>Chargers have rush hours too. See when a site is usually free and when it&rsquo;s packed &mdash; and let the planner time your stops around the queue, not into it.</p>
              <div className="chiprow">
                <span className="chip">by hour</span>
                <span className="chip">by weekday</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ================= MILE 03: HOW IT WORKS ================= */}
      <section class="mile mile--tight" id="how">
        <span class="milemark">Mile 03 &middot; How it works</span>
        <div class="wrap">
          <div class="mile-head">
            <p class="eyebrow">Three exits to a plan</p>
            <h2>From destination to graded plan in under a minute.</h2>
          </div>
          <div class="exits">
            <div class="exit"><span class="tab">EXIT 1A</span><h3>Pick your car</h3><p>700+ EV models with real consumption profiles &mdash; or set custom battery and efficiency values. Adapters you carry count too.</p></div>
            <div class="exit" style={{ transitionDelay: '.07s' }}><span class="tab">EXIT 1B</span><h3>Enter your route</h3><p>Start, destination, charge level. The physics model does the rest: elevation, temperature, wind, payload, your car&rsquo;s charge curve.</p></div>
            <div class="exit" style={{ transitionDelay: '.14s' }}><span class="tab">EXIT 1C</span><h3>Drive the graded plan</h3><p>Every stop graded and priced, a Plan B in reserve, and a confidence score for the whole trip. Send it to your phone and go.</p></div>
          </div>
        </div>
      </section>

      {/* ================= MILE 04: LIVE DEMO ================= */}
      <section className="mile" id="demo">
        <span className="milemark">Mile 04 &middot; Try it</span>
        <div className="wrap">
          <div className="mile-head">
            <p className="eyebrow">Interactive demo &middot; sample data</p>
            <h2>Plan a trip right now.</h2>
            <p className="lede">This demo runs on a small set of sample corridors and vehicles so you can feel the product. The live planner runs on OpenChargeMap, network feeds, and our session-outcome dataset.</p>
          </div>
          <InteractiveDemo />
        </div>
      </section>

      {/* ================= MILE 05: METHODOLOGY ================= */}
      <section className="mile mile--green on-green" id="method">
        <span className="milemark" style={{ color: 'rgba(255,255,255,.4)' }}>Mile 05 &middot; Trust</span>
        <div className="wrap">
          <div className="mile-head">
            <p className="eyebrow">Why you can trust the grade</p>
            <h2 style={{ color: '#fff' }}>Read the formula. We publish it.</h2>
            <p className="lede">Reliability scores in this industry lost drivers&rsquo; trust by being opaque and generous. Ours is the opposite: open math, honest failure counting, and no commercial thumb on the scale.</p>
          </div>
          <div className="formula" role="img" aria-label="Published grading formula">
{`GRADE(stall) = f( success_rate_30d            ← recent sessions dominate
               , failure_reports             ← counted, never smoothed away
               , recency_decay(λ=0.92/day)   ← old data fades fast
               , throughput_vs_rated_kW      ← "works, but slow" costs points
               , confirmed_repairs )          ← verified fixes restore grades

No sponsorship term. No network-partnership term. None.`}
          </div>
          <div className="pledges">
            <div className="pledge">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M10 1.5 18 5v6c0 4.2-3.3 7.2-8 8.3C5.3 18.2 2 15.2 2 11V5l8-3.5Z" stroke="#EFA51C" strokeWidth="1.7"/>
                <path d="M6.7 10.2 9 12.5l4.3-4.7" stroke="#EFA51C" strokeWidth="1.7" strokeLinecap="round"/>
              </svg>
              <p><b>No pay-to-rank. Ever.</b>Charging networks cannot pay to improve a grade, hide a failure, or feature a station. Grades are earned at the plug.</p>
            </div>
            <div className="pledge">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M3 10h5l2-5 3 10 2-5h2" stroke="#EFA51C" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p><b>Failures count as failures.</b>&ldquo;Failed twice, then it worked&rdquo; is not a clean session. Our score reflects what actually happened at the stall.</p>
            </div>
            <div className="pledge">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <circle cx="10" cy="10" r="8" stroke="#EFA51C" strokeWidth="1.7"/>
                <path d="M10 5.5V10l3 2" stroke="#EFA51C" strokeWidth="1.7" strokeLinecap="round"/>
              </svg>
              <p><b>Fresh beats historical.</b>A charger fixed yesterday recovers quickly; one that died yesterday drops quickly. Decay is tuned for road-trip reality.</p>
            </div>
            <div className="pledge">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4 16V8m6 8V4m6 12v-6" stroke="#EFA51C" strokeWidth="1.7" strokeLinecap="round"/>
              </svg>
              <p><b>Corrections stay open.</b>Drivers and site owners can flag errors; every correction is logged publicly. Crowdsourcing made this niche &mdash; we keep it on.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MILE 06: COMPARISON ================= */}
      <section className="mile" id="compare">
        <span className="milemark">Mile 06 &middot; Compared</span>
        <div className="wrap">
          <div className="mile-head">
            <p className="eyebrow">An honest comparison</p>
            <h2>Great tools exist. They each solve half the trip.</h2>
            <p className="lede">Route planners route. Community maps review. Payment apps pay. Nobody unifies working-charger confidence with true cost &mdash; that seam is where Trip Planner EV lives.</p>
          </div>
          <div className="tablewrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">Capability</th>
                  <th scope="col" className="us">Trip Planner EV<br/><span className="mono" style={{ fontSize: '.66rem', fontWeight: 400 }}>early access</span></th>
                  <th scope="col">ABRP</th>
                  <th scope="col">PlugShare</th>
                  <th scope="col">ChargeHub</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Stall-level reliability grade, published formula</td>
                  <td className="us yes">&#10003;</td>
                  <td className="no">&mdash;</td>
                  <td className="part">score, opaque</td>
                  <td className="no">&mdash;</td>
                </tr>
                <tr>
                  <td>True cost per stop, normalized for your car</td>
                  <td className="us yes">&#10003;</td>
                  <td className="part">partial</td>
                  <td className="no">&mdash;</td>
                  <td className="part">free/paid flag</td>
                </tr>
                <tr>
                  <td>Physics range model with sensitivity band</td>
                  <td className="us yes">&#10003;</td>
                  <td className="part">point estimate</td>
                  <td className="no">&mdash;</td>
                  <td className="no">&mdash;</td>
                </tr>
                <tr>
                  <td>Backup charger pre-planned per stop</td>
                  <td className="us yes">&#10003;</td>
                  <td className="part">auto-swap live</td>
                  <td className="no">&mdash;</td>
                  <td className="no">&mdash;</td>
                </tr>
                <tr>
                  <td>Occupancy forecast by hour</td>
                  <td className="us yes">&#10003;</td>
                  <td className="no">&mdash;</td>
                  <td className="part">live only</td>
                  <td className="part">live only</td>
                </tr>
                <tr>
                  <td>Accurate without an OBD dongle</td>
                  <td className="us yes">&#10003;</td>
                  <td className="part">best with dongle</td>
                  <td className="no">n/a</td>
                  <td className="no">n/a</td>
                </tr>
                <tr>
                  <td>Community reviews &amp; check-ins</td>
                  <td className="us part">launching</td>
                  <td className="part">basic</td>
                  <td className="yes">&#10003; best</td>
                  <td className="part">smaller</td>
                </tr>
                <tr>
                  <td>In-app charging payment</td>
                  <td className="us no">roadmap</td>
                  <td className="no">&mdash;</td>
                  <td className="part">clunky</td>
                  <td className="yes">&#10003; Passport</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="tfoot">Feature comparison as of July 2026, from public product pages and app listings. Competitors ship updates often &mdash; verify current capabilities before relying on this commercially.</p>
        </div>
      </section>

      {/* ================= MILE 07: PRICING ================= */}
      <section className="mile mile--tight" id="pricing">
        <span className="milemark">Mile 07 &middot; Pricing</span>
        <div className="wrap">
          <div className="mile-head">
            <p className="eyebrow">Simple pricing</p>
            <h2>Planning is free. The car seat costs a coffee.</h2>
          </div>
          <div className="plans">
            <div className="plan">
              <h3>Free</h3>
              <div className="price">$0<span> / forever</span></div>
              <p style={{ color: 'var(--muted)', fontSize: '.93rem' }}>Everything you need to plan with confidence.</p>
              <ul>
                <li>Unlimited trip plans, 700+ EV models</li>
                <li>Reliability grades &amp; review digests</li>
                <li>True-cost estimates per stop</li>
                <li>Sensitivity band &amp; confidence score</li>
                <li>Send plan to your phone</li>
              </ul>
              <button onClick={() => onNavigate('app')} className="btn btn-ghost" style={{ width: '100%' }}>Start planning</button>
            </div>
            
            <div className="plan hot">
              <span className="badge">FOUNDING PRICE</span>
              <h3>Premium</h3>
              <div className="price">$4.99<span> / month &middot; or $49 / year</span></div>
              <p style={{ color: 'var(--muted)', fontSize: '.93rem' }}>The plan that rides with you.</p>
              <ul>
                <li>CarPlay &amp; Android Auto navigation</li>
                <li>Live re-routing &amp; one-tap Plan B swap</li>
                <li>Live weather &amp; traffic in the energy model</li>
                <li>Price alerts (&ldquo;30% cheaper 2 exits ahead&rdquo;)</li>
                <li>Vehicle telematics &mdash; live state of charge, no dongle</li>
                <li>Occupancy-timed departure suggestions</li>
              </ul>
              <button onClick={() => onNavigate('checkout')} className="btn btn-green" style={{ width: '100%' }}>Get Premium Plan</button>
            </div>
            
            <div className="plan">
              <h3>Business &amp; API</h3>
              <div className="price">Custom</div>
              <p style={{ color: 'var(--muted)', fontSize: '.93rem' }}>The trust layer, in your product.</p>
              <ul>
                <li>Reliability &amp; true-cost data API</li>
                <li>Embeddable planner widget, white-label</li>
                <li>Fleet routing with cost &amp; CO&#8322; reporting</li>
                <li>Uptime insights for networks &amp; agencies</li>
              </ul>
              <a className="btn btn-ghost" href="mailto:hello@tripplannerev.com" style={{ width: '100%', textAlign: 'center' }}>Talk to us</a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="mile mile--tight" id="faq">
        <span className="milemark">Rest area &middot; FAQ</span>
        <div className="wrap">
          <div className="mile-head">
            <p className="eyebrow">Questions, answered plainly</p>
            <h2>Before you ask.</h2>
          </div>
          <div className="faq">
            <details><summary>How are the A&ndash;F grades calculated?</summary><p>From real session outcomes at the stall level: recent successful charges, honestly-counted failures, delivered power versus rated power, and verified repairs &mdash; with a recency decay so yesterday matters far more than last year. The formula is published on this page and versioned when it changes. Networks cannot pay to alter a grade.</p></details>
            <details><summary>Is it accurate without an OBD dongle?</summary><p>Yes. The energy model is physics-based (speed, elevation, temperature, wind, payload, your car&rsquo;s charge curve) and we show a sensitivity band instead of a single false-precision number. Where your car supports telematics, Premium reads live state of charge directly &mdash; no hardware.</p></details>
            <details><summary>Which cars are supported?</summary><p>700+ EV models at launch across Tesla, Hyundai, Kia, Ford, VW, BMW, Rivian, BYD and more &mdash; plus fully custom values (battery kWh, consumption, reserve) for anything we&rsquo;ve missed. Adapters you carry, like NACS or CCS adapters, are part of your profile so the map matches what you can actually plug into.</p></details>
            <details><summary>Where does the data come from?</summary><p>Station locations start from OpenChargeMap and OpenStreetMap (with attribution), enriched with network feeds where available. Grades, cost normalization, occupancy patterns and review digests are our own layer, built from session outcomes and driver check-ins.</p></details>
            <details><summary>Is the free plan actually free?</summary><p>Yes &mdash; planning, grades, and cost estimates stay free. Premium exists for the in-car experience and live data, because that&rsquo;s genuinely costly to run. No ads inside trip plans, and no selling your location history.</p></details>
            <details><summary>When does the in-car app arrive?</summary><p>The web planner is first; CarPlay and Android Auto follow for Premium members, with waitlist members getting access in order. Founding-price members keep the $49/year rate.</p></details>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="mile mile--deep" id="cta">
        <div className="wrap">
          <div className="cta-sign">
            <div className="sign">
              <span className="exit-tab">NEXT&nbsp;EXIT</span>
              <small>Founding members &middot; early access</small>
              <div className="sign-route" style={{ fontSize: 'clamp(1.5rem,3.4vw,2.1rem)' }}>Charge anxiety ends here <span aria-hidden="true">&nbsp;&rarr;</span></div>
              <p style={{ color: '#CFE4D8', fontSize: '.96rem', marginTop: '10px' }}>Join the waitlist for early access to the planner, the founding $49/year Premium rate, and a say in which corridors we grade first.</p>
              
              {!waitlistOk ? (
                <form className="waitlist" onSubmit={handleWaitlistSubmit} aria-label="Join the waitlist">
                  <input 
                    type="email" 
                    placeholder="you@example.com" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-label="Email address" 
                  />
                  <button className="btn btn-reflect" type="submit">Join the waitlist</button>
                </form>
              ) : (
                <p id="wl-ok" role="status">&#10003; You&rsquo;re on the list &mdash; watch your inbox for corridor voting.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
