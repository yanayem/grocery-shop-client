import React, { createContext, useContext, useState, useEffect } from 'react';

const LocationContext = createContext();

export const useLocation = () => useContext(LocationContext);

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(() => {
    return localStorage.getItem('userLocation') || 'Dhaka';
  });

  const updateLocation = (newLocation) => {
    setLocation(newLocation);
    localStorage.setItem('userLocation', newLocation);
  };

  const detectLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you would use reverse geocoding to get the city name
          // For this mock, we'll just simulate it
          updateLocation('Dhaka (Auto-detected)');
        },
        (error) => {
          console.error("Error detecting location:", error);
        }
      );
    }
  };

  return (
    <LocationContext.Provider value={{ location, updateLocation, detectLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
