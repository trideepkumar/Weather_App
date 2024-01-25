import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, geoApiUrl } from "../../api/api.jsx";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadoptions = async (inputValue) => {
    try {
      console.log(inputValue);
      console.log(`${geoApiUrl}/cities`);
  
      const response = await fetch(
        `${geoApiUrl}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
        geoApiOptions
      )
      
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const responseData = await response.json();
      
      console.log("data",responseData.data)
      const options = {
        options: responseData.data.map((city) => ({
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        })),
      };
      console.log(options)
      return options;
    } catch (err) {
      console.error(err.message);
    }
  };
  

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <>
      <AsyncPaginate
        placeholder="Search for city"
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadoptions}
      ></AsyncPaginate>
    </>
  );
};

export default Search;
