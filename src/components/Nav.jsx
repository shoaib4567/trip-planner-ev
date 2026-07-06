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

        {view === 'landing' ? (
          <>
            <nav className="nav-links" aria-label="Primary">
              <a href="#features">Features</a>
              <a href="#demo">Live demo</a>
              <a href="#method">Methodology</a>
              <a href="#pricing">Pricing</a>
              <a href="#faq">FAQ</a>
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
                  <a className="btn btn-green btn-sm" href="#cta">Join the waitlist</a>
                </>
              )}
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', gap: '16px', marginLeft: 'auto', alignItems: 'center' }}>
            <button 
              onClick={() => onNavigate('landing')} 
              className="btn btn-ghost btn-sm"
            >
              ← Marketing Page
            </button>
            {view !== 'app' && user && (
              <button 
                onClick={() => onNavigate('app')} 
                className="btn btn-green btn-sm"
              >
                Go to App
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
