import React, { useEffect, useState } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  CardContent,
  Card
} from "@material-ui/core";
import InfoBox from './InfoBox';
import Map from "./Map";
import './App.css';

function App() {
  const [countries,setCountries]=useState([]);
  const [country,setCountry]= useState('worldwide');
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

  const onCountryChange= (event) => {
    const countryCode=event.target.value;

    console.log("Y00000 >>>>>>",countryCode);

    setCountry(countryCode);
  }
  return (
    <div className="app">
    <div className="app__left">
    <div className="app__header">
    <h1>COVINFO(COVID-TRACKER)</h1>
    <FormControl class="app__dropdown">
    <Select variant="outlined" onChange={onCountryChange} value={country}>
    <MenuItem value="worldwide">Worldwide</MenuItem>
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
  <div className="app__stats">
  <InfoBox title="Coronavirus Cases" cases={123} total={2000} />

  <InfoBox title="Recovered" cases={1234} total={3000}/>

  <InfoBox title="Deaths" cases={12345} total={4000}/>
  {/* InfoBox title="Coronavirus cases" */}
  {/* InfoBox title="Coronavirus recoveries"*/}
  {/* InfoBox */}
  </div>
  {/* Table */}
  {/* Graph */}
  {/* Map */}
  <Map/>


    
     
    </div>
    <Card className="app__right">
    <CardContent>
    <h3>Live cases by Country</h3>
    {/* Table */}
    <h3>WorldWide new cases</h3>
    {/* Graph */}

    </CardContent>
    </Card>
    </div>
  );
}

export default App;
