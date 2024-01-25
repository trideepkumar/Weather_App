import React from "react";
import './Forecast.css'
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";

const Forecast = ({ data }) => {
  console.log("forecast data", data.list);
  const Week_Days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const dayInWeek = new Date().getDay();
  const ForeCast_Day = Week_Days.slice(dayInWeek, Week_Days.length).concat(
    Week_Days.slice(0, dayInWeek)
  );

  console.log("ForeCast days", ForeCast_Day);
  return (
    <div>
      <label htmlFor="" className="title">
        Daily Forecast
      </label>
      <Accordion allowZeroExpanded>
        {data.list.splice(0, 7).map((item, index) => (
          <AccordionItem key={index}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  <img
                    src={`icons-weather-app/${item.weather[0].icon}.png`}
                    alt="weather"
                    className="icon-small"
                  />
                  <label htmlFor="" className="day">
                    {ForeCast_Day[index]}
                  </label>
                  <label htmlFor="" className="description">
                    {item.weather[0].description}
                  </label>
                  <label htmlFor="" className="min-max">
                    {Math.round(item.main.temp_min)}°C /{" "}
                    {Math.round(item.main.temp_max)}°C
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
                <div className="daily-details-grid">
                    <div className="daily-details-grid-item">
                        <label htmlFor="">Pressure</label>
                        <label htmlFor="">{item.main.pressure} hPa</label>
                    </div>
                    <div className="daily-details-grid-item">
                        <label htmlFor="">Humidity</label>
                        <label htmlFor="">{item.main.humidity} %</label>
                    </div>
                    <div className="daily-details-grid-item">
                        <label htmlFor="">Clouds</label>
                        <label htmlFor="">{item.clouds.all}%</label>
                    </div>
                    <div className="daily-details-grid-item">
                        <label htmlFor="">Wind Speed</label>
                        <label htmlFor="">{item.wind.speed} m/s</label>
                    </div>
                    <div className="daily-details-grid-item">
                        <label htmlFor="">Sea Level</label>
                        <label htmlFor="">{item.main.sea_level}m</label>
                    </div>
                    <div className="daily-details-grid-item">
                        <label htmlFor="">Feels Like</label>
                        <label htmlFor="">{Math.round(item.main.feels_like)}°C</label>
                    </div>
                </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Forecast;
