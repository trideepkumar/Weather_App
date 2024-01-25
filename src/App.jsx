import "./App.css";
import Search from "./components/search/Search";
import CurrentWeather from "./components/current-Weather/CurrentWeather";
import { weatherApiKey,weatherApiUrl } from "./api/api";
import { useState } from "react";
import Forecast from "./components/forecast/Forecast";

function App() {

  const [currentWeather,setCurrentWeather] = useState(null)
  const [forecast,setForecast] = useState(null)


  const handleOnSearchChange = (searchData) => {
    console.log(searchData);
    const [lat,lon] = searchData.value.split(" ")
    const currentWeatherFetch = fetch(`${weatherApiUrl}/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`)
    const foreCastFetch = fetch(`${weatherApiUrl}/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`)

    Promise.all([currentWeatherFetch,foreCastFetch])
    .then(async(response)=>{
      const weatherResponse = await response[0].json()
      const foreCastResponse = await response[1].json()
      setCurrentWeather({city:searchData.label,...weatherResponse})
      setForecast({city:searchData.label,...foreCastResponse})
      
    })
    .catch((err)=>{
      console.log(err)
    })
  };

  console.log("currentWeather",currentWeather)
  console.log("forecast",forecast)

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
     {currentWeather&&<CurrentWeather  data={currentWeather}/>}
     {forecast&&<Forecast data={forecast}/>}
    </div>
  );
}

export default App;
