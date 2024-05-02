import React, { useState, useEffect } from 'react';

function LocationSelector() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      setLoadingCountries(true);
      const response = await fetch('https://crio-location-selector.onrender.com/countries');
      const data = await response.json();
      setCountries(data);
      setLoadingCountries(false);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const fetchStates = async (country) => {
    try {
      setLoadingStates(true);
      const response = await fetch(`https://crio-location-selector.onrender.com/country=${country}/states`);
      const data = await response.json();
      setStates(data);
      setLoadingStates(false);
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  const fetchCities = async (country, state) => {
    try {
      setLoadingCities(true);
      const response = await fetch(`https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`);
      const data = await response.json();
      setCities(data);
      setLoadingCities(false);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setSelectedState('');
    setSelectedCity('');
    if (e.target.value) {
      fetchStates(e.target.value);
    }
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedCity('');
    if (e.target.value) {
      fetchCities(selectedCountry, e.target.value);
    }
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  return (
    <div>
      <h1>Location Selector</h1>
      <div>
        <label htmlFor="country">Select Country:</label>
        <select id="country" value={selectedCountry} onChange={handleCountryChange}>
          <option value="">--Select Country--</option>
          {loadingCountries ? (
            <option disabled>Loading...</option>
          ) : (
            countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))
          )}
        </select>
      </div>
      <div>
        <label htmlFor="state">Select State:</label>
        <select id="state" value={selectedState} onChange={handleStateChange} disabled={!selectedCountry}>
          <option value="">--Select State--</option>
          {loadingStates ? (
            <option disabled>Loading...</option>
          ) : (
            states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))
          )}
        </select>
      </div>
      <div>
        <label htmlFor="city">Select City:</label>
        <select id="city" value={selectedCity} onChange={handleCityChange} disabled={!selectedState}>
          <option value="">--Select City--</option>
          {loadingCities ? (
            <option disabled>Loading...</option>
          ) : (
            cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))
          )}
        </select>
      </div>
      <div>
        {selectedCountry && selectedState && selectedCity && (
          <p>You selected {selectedCity}, {selectedState}, {selectedCountry}</p>
        )}
      </div>
    </div>
  );
}

export default LocationSelector;
