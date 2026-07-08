import React, { useState } from 'react';

const BLOG_POSTS = [
  {
    id: 1,
    title: 'The Real Cost of Supercharging: What Your Car Doesn\'t Tell You',
    excerpt: 'Session fees, idle costs, and thermal throttling can quickly push public charging rates past household electricity tariffs. Here is the raw breakdowns.',
    category: 'Data Insights',
    author: 'John Reynolds, Founder',
    date: 'July 5, 2026',
    readTime: '6 min read',
    content: `
      Public DC Fast charging rates look simple on paper: 38 cents per kilowatt-hour, or maybe 42 cents during peak hours. But if you've done long-range road trips, you know your final bill rarely maps cleanly to your battery's intake.
      
      Between network member plans, standard transaction session costs, per-minute penalties, and temperature throttling, the actual tariff is a dynamic formula.
      
      Let's break down where the extra costs hide:
      
      1. Session Fees: Many networks charge a flat $0.50 to $1.50 initiation fee per plug. On a short charge, this can increase your cost per kWh by 10%.
      2. Thermal Throttling: When chargers overheat or your battery gets hot, speed drops but you are still billed by the minute on some older networks.
      3. Idle Fees: If you leave your car plugged in after it hits 80%, networks charge up to $1.00 per minute to incentivize moving the vehicle.
    `
  },
  {
    id: 2,
    title: 'Why 43% of Public Chargers Can Be Effectively Unavailable',
    excerpt: 'A comprehensive study of recent logs shows that nameplate uptime percentages hide the real-world frustration of broken plugs and throttled stalls.',
    category: 'News',
    author: 'Sarah Jenkins, Data Science',
    date: 'June 28, 2026',
    readTime: '8 min read',
    content: `
      Uptime numbers listed by charging networks often hover around 97% to 99%. But EV drivers know this doesn't match reality on the ground.
      
      When a station lists 99% uptime, it usually means at least one stall at the location was responsive to ping signals. It doesn't mean all stalls are functioning at rated capacity.
      
      Our analysis of 100,000 charge check-ins found that:
      - 14% of attempts fail to initiate a charge sequence at all.
      - 29% of stalls deliver less than 50% of their advertised charging speeds.
      - This creates an effective availability rate of only 57% across non-Tesla highway networks.
    `
  },
  {
    id: 3,
    title: 'Winter EV Range & Highway Speed: The Math, Honest Edition',
    excerpt: 'Cold weather cabin heating and battery conditioning drag down range, but wind resistance at highway speeds is the primary culprit. Let\'s see the physics.',
    category: 'Guides',
    author: 'John Reynolds, Founder',
    date: 'June 15, 2026',
    readTime: '5 min read',
    content: `
      Every winter, EV forums fill with posts complaining about range dropping by 20% to 30%. While chemical battery slowdowns in cold weather are real, cabin heating load and aerodynamic drag are the largest factors.
      
      At 110 km/h, your car spends over 60% of its energy pushing air out of the way. When that air is cold and dense, resistance increases. Add cabin heating into the mix, and your efficiency drops from 150 Wh/km to 195 Wh/km.
      
      Understanding this sensitivity band is why we built physics-based temperature sliders into our trip planner.
    `
  }
];

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Guides', 'News', 'Data Insights'];

  const filteredPosts = filter === 'All' 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter(p => p.category === filter);

  if (selectedPost) {
    return (
      <div className="blog-view-container" style={{ paddingTop: '100px', minHeight: '80vh' }}>
        <section className="mile mile--tight">
          <div className="wrap" style={{ maxWidth: '720px' }}>
            <button 
              onClick={() => setSelectedPost(null)}
              className="btn btn-ghost btn-sm"
              style={{ marginBottom: '24px' }}
            >
              ← Back to Blog
            </button>
            <div style={{ marginBottom: '16px' }}>
              <span className="chip" style={{ display: 'inline-block', marginBottom: '8px' }}>{selectedPost.category}</span>
              <h1 style={{ fontSize: '2.2rem', lineHeight: '1.2', fontWeight: 800 }}>{selectedPost.title}</h1>
              <p style={{ color: 'var(--muted)', fontSize: '.85rem', marginTop: '12px', fontFamily: 'var(--mono)' }}>
                By {selectedPost.author} &middot; {selectedPost.date} &middot; {selectedPost.readTime}
              </p>
            </div>
            
            <div 
              style={{ 
                marginTop: '32px', 
                fontSize: '1.05rem', 
                color: 'var(--ink)', 
                lineHeight: '1.8', 
                whiteSpace: 'pre-line',
                borderTop: '1px solid var(--line)',
                paddingTop: '24px'
              }}
            >
              {selectedPost.content}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="blog-view-container" style={{ paddingTop: '100px', minHeight: '80vh' }}>
      <section className="mile mile--tight">
        <span className="milemark">Blog · Driver Guides</span>
        <div className="wrap">
          <div className="mile-head">
            <p className="eyebrow">Industry Intel</p>
            <h2>EV Road-Trip Guides &amp; Insights</h2>
            <p className="lede">
              Practical data storytelling and tutorials to make your highway travels frictionless.
            </p>
            
            {/* Category Filter */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '20px' }}>
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`btn btn-sm ${filter === c ? 'btn-green' : 'btn-ghost'}`}
                  style={{ borderRadius: '20px', padding: '6px 16px' }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px', margin: '36px 0' }}>
            {filteredPosts.map(post => (
              <article 
                key={post.id} 
                className="feature" 
                onClick={() => setSelectedPost(post)}
                style={{ cursor: 'pointer', padding: '24px', alignContent: 'space-between' }}
              >
                <div>
                  <span className="chip" style={{ display: 'inline-block', marginBottom: '8px' }}>{post.category}</span>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--green-950)', marginBottom: '8px', lineHeight: '1.3' }}>
                    {post.title}
                  </h3>
                  <p style={{ fontSize: '.9rem', color: 'var(--muted)', marginBottom: '16px' }}>
                    {post.excerpt}
                  </p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '.75rem', color: 'var(--muted)', fontFamily: 'var(--mono)', borderTop: '1px solid var(--line)', paddingTop: '12px', width: '100%' }}>
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
