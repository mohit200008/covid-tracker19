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
import Footer from "./footer";
import { sortData, prettyPrintStat } from "./util";
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
  const [mapCountries, setMapCountries]=useState([]);

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
          setMapCountries(data);
          setCountries(countries);
      });

    };

    getCountriesData();

  },[]);

  const onCountryChange= async(event) => {
    const countryCode=event.target.value;
   

    const url= countryCode==='worldwide'? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    
    
    await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setCountry(countryCode);

      setcountryInfo(data);

      setMapCenter([data.countryInfo.lat, data.countryInfo.lng]);
      setMapZoom(4);

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
  <InfoBox 
  isRed
  active= {casesType=== "cases"}
  onClick={e=> setCasesType('cases')}
  title="Coronavirus Cases" cases={prettyPrintStat(countryInfo.todayCases)} total={prettyPrintStat(countryInfo.cases)} />

  <InfoBox 
  active= {casesType=== "recovered"}
  onClick={e=> setCasesType('recovered')}
  title="Recovered" cases={prettyPrintStat(countryInfo.todayRecovered)} total={prettyPrintStat(countryInfo.recovered)}/>

  <InfoBox
  isRed 
  active= {casesType=== "deaths"}
  onClick={e=> setCasesType('deaths')}
  title="Deaths" cases={prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat(countryInfo.deaths)}/>
  {/* InfoBox title="Coronavirus cases" */}
  {/* InfoBox title="Coronavirus recoveries"*/}
  {/* InfoBox */}
  </div>
  {/* Table */}
  {/* Graph */}
  {/* Map */}
  <Map
   casesType={casesType}
   countries={mapCountries}
   center= {mapCenter}
   zoom= {mapZoom} />


    
     
    </div>
    <Card className="app__right">
    <CardContent>
    <h3>Live cases by Country</h3>
    {/* Table */}
    <Table countries={tableData} />
    <h3 className="app__graphTitle">WorldWide new {casesType}</h3>
    <LineGraph className="app__graph" casesType={casesType} />
    {/* Graph */}


   

    </CardContent>
     <Footer />
    </Card>
    
    </div>
  );
}

export default App;
