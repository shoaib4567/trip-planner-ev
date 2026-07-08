import React, { useContext, useState, useEffect } from 'react';
import { AppProvider, AppContext } from './context/AppContext';
import Nav from './components/Nav';
import Hero from './components/Hero';
import MarketingPage from './components/MarketingPage';
import PlannerDashboard from './components/PlannerDashboard';
import VehiclePicker from './components/VehiclePicker';
import StripeCheckout from './components/StripeCheckout';
import CarPlayPreview from './components/CarPlayPreview';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import AboutPage from './components/AboutPage';
import PricingPage from './components/PricingPage';
import MethodologyPage from './components/MethodologyPage';
import BlogPage from './components/BlogPage';
import ContactPage from './components/ContactPage';
import LegalPage from './components/LegalPage';
import ChangelogPage from './components/ChangelogPage';
import RangeCalculator from './components/RangeCalculator';
import CompareCars from './components/CompareCars';

function AppContent() {
  const { user, logout } = useContext(AppContext);
  const [view, setView] = useState('landing'); // landing, auth, checkout, app
  const [appTab, setAppTab] = useState('planner'); // planner, garage, trips, carplay, admin
  const [authMode, setAuthMode] = useState('login'); // login or signup

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view, appTab]);

  const handleNavigate = (newView, subTab = 'planner') => {
    setView(newView);
    setAppTab(subTab);
  };

  if (view === 'auth') {
    return (
      <div className="auth-view" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Nav view={view} onNavigate={handleNavigate} />
        <div className="auth-container">
          <div className="auth-header">
            <h2>{authMode === 'login' ? 'Welcome Back' : 'Get Started'}</h2>
            <p className="lede" style={{ fontSize: '.9rem' }}>
              {authMode === 'login' ? 'Sign in to plan and save your EV road trips.' : 'Create a free account to unlock planners.'}
            </p>
          </div>
          <form onSubmit={(e) => {
            e.preventDefault();
            const email = e.target.email.value;
            login(email);
            handleNavigate('app');
          }} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div className="field">
              <label htmlFor="auth-email">Email Address</label>
              <input type="email" id="auth-email" name="email" required placeholder="you@example.com" />
            </div>
            <div className="field">
              <label htmlFor="auth-pass">Password</label>
              <input type="password" id="auth-pass" required placeholder="••••••••" />
            </div>
            <button className="btn btn-green" type="submit" style={{ marginTop: '6px' }}>
              {authMode === 'login' ? 'Sign In' : 'Create Free Account'}
            </button>
          </form>
          <div className="auth-footer">
            {authMode === 'login' ? (
              <p>Don't have an account? <span onClick={() => setAuthMode('signup')}>Sign up</span></p>
            ) : (
              <p>Already have an account? <span onClick={() => setAuthMode('login')}>Sign in</span></p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (view === 'checkout') {
    return (
      <div className="checkout-view" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Nav view={view} onNavigate={handleNavigate} />
        <div style={{ padding: '48px 24px', flex: 1, display: 'flex', alignItems: 'center' }}>
          <StripeCheckout onNavigate={handleNavigate} />
        </div>
      </div>
    );
  }

  if (view === 'app') {
    return (
      <div className="app-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Nav view={view} onNavigate={handleNavigate} />
        
        <div className="app-container">
          <aside className="sidebar">
            <div>
              <small style={{ fontFamily: 'var(--mono)', letterSpacing: '0.1em', color: 'var(--muted)', fontSize: '0.68rem', display: 'block', marginBottom: '8px' }}>
                WORKSPACE
              </small>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button 
                  onClick={() => setAppTab('planner')} 
                  className={`btn btn-sm ${appTab === 'planner' ? 'btn-green' : 'btn-ghost'}`}
                  style={{ justifyContent: 'flex-start', width: '100%' }}
                >
                  🚙 Trip Planner
                </button>
                <button 
                  onClick={() => setAppTab('garage')} 
                  className={`btn btn-sm ${appTab === 'garage' ? 'btn-green' : 'btn-ghost'}`}
                  style={{ justifyContent: 'flex-start', width: '100%' }}
                >
                  ⚡ Vehicle Garage
                </button>
                <button 
                  onClick={() => setAppTab('trips')} 
                  className={`btn btn-sm ${appTab === 'trips' ? 'btn-green' : 'btn-ghost'}`}
                  style={{ justifyContent: 'flex-start', width: '100%' }}
                >
                  💾 Saved Trips
                </button>
                <button 
                  onClick={() => setAppTab('carplay')} 
                  className={`btn btn-sm ${appTab === 'carplay' ? 'btn-green' : 'btn-ghost'}`}
                  style={{ justifyContent: 'flex-start', width: '100%' }}
                >
                  📟 CarPlay Companion
                </button>
              </nav>
            </div>

            <div style={{ marginTop: 'auto', borderTop: '1px solid var(--line)', paddingTop: '16px' }}>
              <div style={{ marginBottom: '12px' }}>
                <small style={{ fontFamily: 'var(--mono)', color: 'var(--muted)', fontSize: '0.65rem', display: 'block' }}>LOGGED IN AS</small>
                <b style={{ fontSize: '0.85rem', wordBreak: 'break-all' }}>{user?.email || 'guest@tripplannerev.com'}</b>
                <span className={`chip ${user?.plan === 'Premium' ? 'grade a' : 'btn-ghost'}`} style={{ display: 'inline-block', fontSize: '0.6rem', padding: '1px 6px', margin: '4px 0 0', verticalAlign: 'middle', textTransform: 'uppercase', fontStyle: 'normal', color: user?.plan === 'Premium' ? '#fff' : 'var(--green-900)' }}>
                  {user?.plan || 'Free'} Plan
                </span>
              </div>

              {user?.plan !== 'Premium' && (
                <button 
                  onClick={() => handleNavigate('checkout')}
                  className="btn btn-green btn-sm"
                  style={{ width: '100%', marginBottom: '8px', background: 'var(--amber)', color: '#3A2800' }}
                >
                  ⭐ Go Premium
                </button>
              )}

              <button 
                onClick={() => {
                  logout();
                  handleNavigate('landing');
                }} 
                className="btn btn-ghost btn-sm" 
                style={{ width: '100%' }}
              >
                Sign Out
              </button>
            </div>
            
            {/* Admin panel link */}
            <div style={{ borderTop: '1px solid var(--line)', paddingTop: '12px', marginTop: '4px' }}>
              <button 
                onClick={() => setAppTab('admin')} 
                className="btn btn-ghost btn-sm" 
                style={{ width: '100%', fontSize: '0.75rem', padding: '6px 10px', color: 'var(--muted)', borderStyle: 'dotted' }}
              >
                🛠️ Admin Console
              </button>
            </div>
          </aside>

          <main className="content-pane">
            {appTab === 'planner' && <PlannerDashboard />}
            {appTab === 'garage' && <VehiclePicker />}
            {appTab === 'trips' && <SavedTripsTab />}
            {appTab === 'carplay' && <CarPlayPreview onNavigate={handleNavigate} />}
            {appTab === 'admin' && <AdminPanel />}
          </main>
        </div>
      </div>
    );
  }

  // Routing switch for informational subpages
  if (view === 'about') {
    return (
      <div className="marketing-view">
        <Nav view={view} onNavigate={handleNavigate} />
        <AboutPage onNavigate={handleNavigate} />
        <Footer onNavigate={handleNavigate} />
      </div>
    );
  }

  if (view === 'pricing') {
    return (
      <div className="marketing-view">
        <Nav view={view} onNavigate={handleNavigate} />
        <PricingPage onNavigate={handleNavigate} />
        <Footer onNavigate={handleNavigate} />
      </div>
    );
  }

  if (view === 'methodology') {
    return (
      <div className="marketing-view">
        <Nav view={view} onNavigate={handleNavigate} />
        <MethodologyPage />
        <Footer onNavigate={handleNavigate} />
      </div>
    );
  }

  if (view === 'blog') {
    return (
      <div className="marketing-view">
        <Nav view={view} onNavigate={handleNavigate} />
        <BlogPage />
        <Footer onNavigate={handleNavigate} />
      </div>
    );
  }

  if (view === 'contact') {
    return (
      <div className="marketing-view">
        <Nav view={view} onNavigate={handleNavigate} />
        <ContactPage />
        <Footer onNavigate={handleNavigate} />
      </div>
    );
  }

  if (view === 'legal') {
    return (
      <div className="marketing-view">
        <Nav view={view} onNavigate={handleNavigate} />
        <LegalPage />
        <Footer onNavigate={handleNavigate} />
      </div>
    );
  }

  if (view === 'changelog') {
    return (
      <div className="marketing-view">
        <Nav view={view} onNavigate={handleNavigate} />
        <ChangelogPage />
        <Footer onNavigate={handleNavigate} />
      </div>
    );
  }

  if (view === 'range-calc') {
    return (
      <div className="marketing-view">
        <Nav view={view} onNavigate={handleNavigate} />
        <RangeCalculator onNavigate={handleNavigate} />
        <Footer onNavigate={handleNavigate} />
      </div>
    );
  }

  if (view === 'compare-cars') {
    return (
      <div className="marketing-view">
        <Nav view={view} onNavigate={handleNavigate} />
        <CompareCars />
        <Footer onNavigate={handleNavigate} />
      </div>
    );
  }

  // Fallback / default: landing page view
  return (
    <div className="landing-view">
      <Nav view={view} onNavigate={handleNavigate} />
      <Hero onNavigate={handleNavigate} />
      <MarketingPage onNavigate={handleNavigate} />
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

// Sub-component for Saved Trips Tab in App Workspace
function SavedTripsTab() {
  const { savedTrips, deleteTrip } = useContext(AppContext);

  return (
    <div>
      <h2 style={{ marginBottom: '8px', fontSize: '1.8rem' }}>Saved Trips</h2>
      <p className="lede" style={{ marginBottom: '24px' }}>Manage your planned highway routes and reload charging itineraries.</p>
      
      {savedTrips.length === 0 ? (
        <div className="panel" style={{ textAlign: 'center', padding: '48px' }}>
          <p style={{ color: 'var(--muted)' }}>You haven't saved any EV trip plans yet.</p>
          <p style={{ fontSize: '.85rem', marginTop: '6px' }}>Plan a route in the **Trip Planner** tab and click **Save Plan** to store it here.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '16px' }}>
          {savedTrips.map((trip) => (
            <div key={trip.id} className="panel" style={{ gridTemplateColumns: '1fr auto', display: 'grid', alignItems: 'center', gap: '16px' }}>
              <div>
                <small style={{ fontFamily: 'var(--mono)', fontSize: '.7rem', color: 'var(--muted)', textTransform: 'uppercase' }}>
                  {trip.corridor} · Planned {trip.date}
                </small>
                <h3 style={{ fontSize: '1.25rem', margin: '4px 0 6px', color: 'var(--green-950)' }}>
                  {trip.origin} → {trip.destination}
                </h3>
                <div style={{ display: 'flex', gap: '16px', fontSize: '.85rem', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
                  <span>Cost: <b>{trip.cost}</b></span>
                  <span>Time: <b>{trip.time}</b></span>
                  <span>Energy: <b>{trip.energy}</b></span>
                  <span>Stops: <b>{trip.stops}</b></span>
                </div>
              </div>
              <button 
                onClick={() => deleteTrip(trip.id)} 
                className="btn btn-ghost btn-sm" 
                style={{ color: '#c00', borderColor: '#c00' }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
