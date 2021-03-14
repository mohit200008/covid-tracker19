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
import Table from "./Table";
import { sortData } from "./util";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";


function App() {
  const [countries,setCountries]=useState([]);
  const [country,setCountry]= useState('worldwide');
  const [countryInfo,setcountryInfo]=useState({});
  const [tableData,setTableData]=useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter,setMapCenter]=
  useState({lat: 34.80746, lng: -40.4796});
  const [mapZoom,setMapZoom]= useState(3);

  useEffect(()=> {
    fetch("https://disease.sh/v3/covid-19/all")
    .then((response)=>response.json())
    .then((data)=> {
      setcountryInfo(data);
    });
  },[]);
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

          const sortedData= sortData(data);
          setTableData(sortedData);
          setCountries(countries);
      });

    };

    getCountriesData();

  },[]);

  const onCountryChange= async(event) => {
    const countryCode=event.target.value;
    setCountry(countryCode);

    const url= countryCode==='worldwide'? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    
    
    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode);

      setcountryInfo(data);

    });
  };

  console.log("Country INFO >>>>>",countryInfo);
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
  <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />

  <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>

  <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
  {/* InfoBox title="Coronavirus cases" */}
  {/* InfoBox title="Coronavirus recoveries"*/}
  {/* InfoBox */}
  </div>
  {/* Table */}
  {/* Graph */}
  {/* Map */}
  <Map
   center= {mapCenter}
   zoom= {mapZoom} />


    
     
    </div>
    <Card className="app__right">
    <CardContent>
    <h3>Live cases by Country</h3>
    {/* Table */}
    <Table countries={tableData} />
    <h3>WorldWide new cases</h3>
    <LineGraph casesType={casesType} />
    {/* Graph */}

    </CardContent>
    </Card>
    </div>
  );
}

export default App;
