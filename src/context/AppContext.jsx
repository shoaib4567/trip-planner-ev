import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

const INITIAL_CARS = [
  { name: 'Tesla Model 3 Long Range', batt: 75, eff: 145, adapters: ['NACS'] },
  { name: 'Hyundai Ioniq 5 (77 kWh)', batt: 77, eff: 175, adapters: ['CCS'] },
  { name: 'Kia EV6 Long Range',       batt: 77, eff: 170, adapters: ['CCS'] },
  { name: 'Ford Mustang Mach-E ER',   batt: 88, eff: 188, adapters: ['CCS'] },
  { name: 'VW ID.4 Pro',              batt: 77, eff: 182, adapters: ['CCS'] },
  { name: 'Rivian R1T',               batt: 135, eff: 240, adapters: ['CCS', 'NACS'] },
  { name: 'BYD Seal AWD',             batt: 82, eff: 168, adapters: ['GB/T'] }
];

const INITIAL_CORRECTIONS = [
  { id: 1, station: 'Kettleman City Tesla Supercharger', user: 'driver_john@gmail.com', category: 'wrong coordinate', note: 'Marker is in the diner parking lot, should be slightly north behind the fuel stations.', status: 'pending', date: '2026-07-06' },
  { id: 2, station: 'Walmart Bakersfield Electrify America', user: 'bolt_runner@outlook.com', category: 'broken connector', note: 'Stall 3 cord is damaged, plug release latch is broken.', status: 'pending', date: '2026-07-05' },
  { id: 3, station: 'Harris Ranch EVgo', user: 'taycan_fan@yahoo.com', category: 'wrong price', note: 'Session fee is now $1.50, was listed as $1.00.', status: 'resolved', date: '2026-07-02' }
];

export const AppProvider = ({ children }) => {
  // Load from localStorage if present
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ev_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [vehicles, setVehicles] = useState(() => {
    const saved = localStorage.getItem('ev_vehicles');
    return saved ? JSON.parse(saved) : INITIAL_CARS;
  });

  const [selectedVehicleIdx, setSelectedVehicleIdx] = useState(() => {
    const saved = localStorage.getItem('ev_selected_idx');
    return saved ? Number(saved) : 0;
  });

  const [savedTrips, setSavedTrips] = useState(() => {
    const saved = localStorage.getItem('ev_trips');
    return saved ? JSON.parse(saved) : [];
  });

  const [waitlistEmails, setWaitlistEmails] = useState(() => {
    const saved = localStorage.getItem('ev_waitlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [correctionsQueue, setCorrectionsQueue] = useState(() => {
    const saved = localStorage.getItem('ev_corrections');
    return saved ? JSON.parse(saved) : INITIAL_CORRECTIONS;
  });

  // Synchronize localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('ev_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('ev_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('ev_vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    localStorage.setItem('ev_selected_idx', String(selectedVehicleIdx));
  }, [selectedVehicleIdx]);

  useEffect(() => {
    localStorage.setItem('ev_trips', JSON.stringify(savedTrips));
  }, [savedTrips]);

  useEffect(() => {
    localStorage.setItem('ev_waitlist', JSON.stringify(waitlistEmails));
  }, [waitlistEmails]);

  useEffect(() => {
    localStorage.setItem('ev_corrections', JSON.stringify(correctionsQueue));
  }, [correctionsQueue]);

  // Actions
  const login = (email) => {
    setUser({ email, plan: 'Free' });
  };

  const signup = (email) => {
    setUser({ email, plan: 'Free' });
  };

  const logout = () => {
    setUser(null);
  };

  const upgradeToPremium = () => {
    if (user) {
      setUser({ ...user, plan: 'Premium' });
    } else {
      // Allow upgrading as guest too (saves state)
      setUser({ email: 'guest@tripplannerev.com', plan: 'Premium' });
    }
  };

  const downgradeToFree = () => {
    if (user) {
      setUser({ ...user, plan: 'Free' });
    }
  };

  const addVehicle = (name, batt, eff, adapters) => {
    const newCar = { name, batt: Number(batt), eff: Number(eff), adapters };
    setVehicles([...vehicles, newCar]);
    setSelectedVehicleIdx(vehicles.length); // auto-select new vehicle
  };

  const deleteVehicle = (index) => {
    const updated = vehicles.filter((_, idx) => idx !== index);
    setVehicles(updated);
    if (selectedVehicleIdx >= updated.length) {
      setSelectedVehicleIdx(Math.max(0, updated.length - 1));
    }
  };

  const selectVehicle = (index) => {
    setSelectedVehicleIdx(index);
  };

  const saveTrip = (origin, destination, cost, time, energy, corridor, stops) => {
    const newTrip = {
      id: Date.now(),
      origin,
      destination,
      cost,
      time,
      energy,
      corridor,
      stops,
      date: new Date().toISOString().split('T')[0]
    };
    setSavedTrips([newTrip, ...savedTrips]);
  };

  const deleteTrip = (id) => {
    setSavedTrips(savedTrips.filter(t => t.id !== id));
  };

  const addWaitlistEmail = (email) => {
    if (!waitlistEmails.includes(email)) {
      setWaitlistEmails([...waitlistEmails, email]);
    }
  };

  const addCorrection = (stationName, category, note) => {
    const newCorrection = {
      id: Date.now(),
      station: stationName,
      user: user ? user.email : 'anonymous@driver.com',
      category,
      note,
      status: 'pending',
      date: new Date().toISOString().split('T')[0]
    };
    setCorrectionsQueue([newCorrection, ...correctionsQueue]);
  };

  const resolveCorrection = (id) => {
    setCorrectionsQueue(correctionsQueue.map(c => c.id === id ? { ...c, status: 'resolved' } : c));
  };

  // Mock Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'grade-drop', message: '⚠️ Kettleman City stall 3 throttled to 62 kW (grade B+).', date: 'Just now', read: false },
    { id: 2, type: 'weather', message: '🌬️ High winds (14 km/h headwind) warning along I-5 route.', date: '10 mins ago', read: false },
    { id: 3, type: 'cost', message: '💵 Harris Ranch station fee changed to $1.50.', date: '1 hour ago', read: true }
  ]);

  const dismissNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const markAllNotificationsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  // Telematics State
  const [telematics, setTelematics] = useState({
    connected: false,
    vin: '5YJ3E1EA5LF******',
    lastSync: null,
    odometer: 42100,
    health: 94
  });

  const connectTelematics = (vin = '5YJ3E1EA5LF******') => {
    setTelematics({
      connected: true,
      vin,
      lastSync: new Date().toLocaleTimeString(),
      odometer: 42100,
      health: 94
    });
  };

  const disconnectTelematics = () => {
    setTelematics({
      connected: false,
      vin: '5YJ3E1EA5LF******',
      lastSync: null,
      odometer: 42100,
      health: 94
    });
  };

  return (
    <AppContext.Provider value={{
      user,
      vehicles,
      selectedVehicleIdx,
      selectedVehicle: vehicles[selectedVehicleIdx] || INITIAL_CARS[0],
      savedTrips,
      waitlistEmails,
      correctionsQueue,
      notifications,
      telematics,
      login,
      signup,
      logout,
      upgradeToPremium,
      downgradeToFree,
      addVehicle,
      deleteVehicle,
      selectVehicle,
      saveTrip,
      deleteTrip,
      addWaitlistEmail,
      addCorrection,
      resolveCorrection,
      dismissNotification,
      markAllNotificationsRead,
      connectTelematics,
      disconnectTelematics
    }}>
      {children}
    </AppContext.Provider>
  );
};
