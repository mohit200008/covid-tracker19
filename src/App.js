import React, { useEffect, useState } from "react";
import {
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import './App.css';

function App() {
  const [countries,setCountries]=useState([
    'USA','UK','INDIA'
  ]);
  // STATE= how to write a variable in react <<<<<<< 

  // https://disease.sh/v3/covid-19/countries

  // USEEFFECT= runs a piece of code 
  // based on a given condition

  useEffect(()=> {
    // the code inside here will run once 
    // when the component loads and not again
    // async -> send a request,wait for it , do something with it

    const getCountriesData = async() => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data)=> {
        const countries= data.map((country) => (
          {
            name:country.country,
            value:country.countryInfo.iso2
          }));
          setCountries(countries);
      });

    };

    getCountriesData();

  },[]);
  return (
    <div className="app">
    <div className="app__header">
    <h1>COVID-TRACKER-19</h1>
    <FormControl class="app__dropdown">
    <Select variant="outlined" value="abc">
    {/*Loop through all the countries and show a dropdown list of all options */}
    {
      countries.map(country=> (
        <MenuItem value={country.value}>{country.name}</MenuItem>
      ))
    }
   {/* <MenuItem value="worldwide">Worldwide</MenuItem>
    <MenuItem value="worldwide">Option two</MenuItem>
    <MenuItem value="worldwide">Option 3</MenuItem>
    <MenuItem value="worldwide">YOOOOOO</MenuItem>
  */}
    
    </Select>
    
    </FormControl>
   
    </div>
  {/* Header */}
  {/* Title + Select input dropdown field */}
  {/* InfoBox */}
  {/* InfoBox */}
  {/* InfoBox */}
  {/* Table */}
  {/* Graph */}
  {/* Map */}

    
     
    </div>
  );
}

export default App;
