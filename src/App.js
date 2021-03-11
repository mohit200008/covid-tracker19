import React, { useState } from "react";
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
  return (
    <div className="app">
    <div className="app__header">
    <h1>COVID-TRACKER-19</h1>
    <FormControl class="app__dropdown">
    <Select variant="outlined" value="abc">
    {
      countries.map(country=> (
        <MenuItem value={country}>{country}</MenuItem>
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
