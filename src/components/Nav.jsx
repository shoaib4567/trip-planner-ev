import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';

export default function Nav({ view, onNavigate }) {
  const { user } = useContext(AppContext);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <div className="wrap nav">
        <a 
          className="brand" 
          href="#top" 
          onClick={(e) => {
            e.preventDefault();
            onNavigate('landing');
          }}
          aria-label="Trip Planner EV home"
        >
          <svg className="shield" viewBox="0 0 32 34" fill="none" aria-hidden="true">
            <path d="M16 1.5 30 6v12.5C30 26 24 31 16 32.8 8 31 2 26 2 18.5V6L16 1.5Z" fill="#0E5E44" stroke="#fff" stroke-width="2"/>
            <path d="M17.8 8 11 18.5h4.4L14 26l7-10.5h-4.4L17.8 8Z" fill="#EFA51C"/>
          </svg>
          Trip Planner <b>EV</b>
        </a>

        <nav className="nav-links" aria-label="Primary">
          <a 
            href="#about"
            onClick={(e) => { e.preventDefault(); onNavigate('about'); }}
            style={{ color: view === 'about' ? 'var(--green)' : '' }}
          >
            About
          </a>
          <a 
            href="#methodology"
            onClick={(e) => { e.preventDefault(); onNavigate('methodology'); }}
            style={{ color: view === 'methodology' ? 'var(--green)' : '' }}
          >
            Methodology
          </a>
          <a 
            href="#pricing"
            onClick={(e) => { e.preventDefault(); onNavigate('pricing'); }}
            style={{ color: view === 'pricing' ? 'var(--green)' : '' }}
          >
            Pricing
          </a>
          <a 
            href="#blog"
            onClick={(e) => { e.preventDefault(); onNavigate('blog'); }}
            style={{ color: view === 'blog' ? 'var(--green)' : '' }}
          >
            Blog
          </a>
          <a 
            href="#range-calc"
            onClick={(e) => { e.preventDefault(); onNavigate('range-calc'); }}
            style={{ color: view === 'range-calc' ? 'var(--green)' : '' }}
          >
            Range Calculator
          </a>
          <a 
            href="#compare"
            onClick={(e) => { e.preventDefault(); onNavigate('compare-cars'); }}
            style={{ color: view === 'compare-cars' ? 'var(--green)' : '' }}
          >
            Compare EVs
          </a>
        </nav>

        <div style={{ display: 'flex', gap: '12px', marginLeft: 'auto', alignItems: 'center' }}>
          {user ? (
            <button 
              onClick={() => onNavigate('app')} 
              className="btn btn-green btn-sm"
            >
              Planner App
            </button>
          ) : (
            <>
              <button 
                onClick={() => onNavigate('auth')} 
                className="btn btn-ghost btn-sm"
              >
                Sign In
              </button>
              {view === 'landing' ? (
                <a className="btn btn-green btn-sm" href="#cta">Join the waitlist</a>
              ) : (
                <button onClick={() => onNavigate('landing')} className="btn btn-green btn-sm">Join Waitlist</button>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
