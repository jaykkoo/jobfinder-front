import React, { useState } from "react";

const InputCityWithAPI = React.forwardRef((props, ref) =>  {
  const [cities, setCities] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCities, setShowCities] = useState(true);

  // Function to check if the string is a valid number
  const checkIfNumber = (str) => {
    return !isNaN(str) && str.trim() !== ""; // Checks if the input is a valid number (postal code)
  };

  // Function to fetch cities based on input (city name or postal code)
  const fetchCities = async (value) => {
    
    try {
      let apiUrl;

      if (checkIfNumber(value)) {
        // Search by postal code
        apiUrl = `https://geo.api.gouv.fr/communes?codePostal=${value}&fields=nom,code,codesPostaux,siren,codeEpci,codeDepartement,codeRegion,population&format=json&geometry=centre`;
      } else {
        // Search by city name
        apiUrl = `https://geo.api.gouv.fr/communes?nom=${value}&fields=nom,code,codesPostaux,siren,codeEpci,codeDepartement,codeRegion,population&format=json&geometry=centre`;
      }

      if (value.trim().length > 0) {
        setLoading(true);
        const response = await fetch(apiUrl);
        const data = await response.json();
        setCities(data);
        setLoading(false);
        setShowCities(true);
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
      setLoading(false);
    }
  };

  // Handle input change and fetch cities
  const handleCityChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    if (value.length > 0) {
      fetchCities(value); // Fetch cities when input is provided
    } else {
      setCities([]); // Clear the list if input is empty
    }
  };

  return (
    <div>
      {/* Input field for city or postal code */}
      <div className="relative my-6">
        <input
          id="input-city"
          type="search"
          name="input-city"
          placeholder="Rechercher une ville ou un code postal"
          aria-label="Rechercher une ville ou un code postal"
          className="peer relative h-10 w-full border-b-4 px-4 pr-12  bg-blue text-sm outline-none transition-all focus-visible:outline-none disabled:cursor-not-allowed"
          value={inputValue}
          onChange={handleCityChange}
          ref={ref}
          autoComplete="off"
        />
      </div>

      {/* Show loading indicator */}
      {loading && <p>Loading...</p>}

      {/* Display city suggestions under the input */}
      {!loading && cities.length > 0 && showCities && (
        <ul
          className="border border-slate-300 rounded-md shadow-sm mt-2 max-h-48 overflow-y-auto"
          style={{ maxHeight: "200px", overflowY: "auto" }}
        >
          {cities.map((city) => (
            <li
              key={city.code}
              className="p-2 hover:bg-peach cursor-pointer"
              onClick={() => { 
                setInputValue(`${city.nom} - ${city.codesPostaux[0]}`); 
                setShowCities(false); 
              }}
            >
              {city.nom} - {city.codesPostaux[0]}
            </li>
          ))}
        </ul>
      )}

      {/* Show if there are more than 5 results */}
      {!loading && cities.length > 5 && showCities && (
        <p className="mt-2 text-sm text-gray-500">
          Showing first 5 results. Scroll to see more.
        </p>
      )}

      {/* No cities found message */}
      {!loading && cities.length === 0 && inputValue.trim().length > 0 && (
        <p>No cities found for "{inputValue}"</p>
      )}
    </div>
  );
});

export default InputCityWithAPI;