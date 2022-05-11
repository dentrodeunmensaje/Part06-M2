import React from "react";
import "./App.css";
import Nav from "./components/Nav";
import { useState } from "react";
import Cards from "./components/Cards";

export default function App() {
  const [cities, setCities] = useState([]);

  const apiKey = "4ae2636d8dfbdc3044bede63951a019b";

  function onSearch(city) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.main !== undefined) {
          const city = {
            min: Math.round(json.main.temp_min),
            max: Math.round(json.main.temp_max),
            img: json.weather[0].icon,
            wind: json.wind.speed,
            temp: json.main.temp,
            name: json.name,
            longitude: json.coord.lon,
            latitude: json.coord.lat,
          };
          setCities((oldCities) => [...oldCities, city]);
        } else {
          alert("Ciudad no encontrada");
        }
      })
      .catch((e) => console.log(e));
  }

  function onClose(id) {
    setCities((oldCities) => oldCities.filter((c) => c.id !== id));
  }

  return (
    <div className="App">
      {/* Tu código acá: */}
      <h1>Weather App</h1>
      <div>
        <Nav onSearch={onSearch} />
        <Cards cities={cities} onClose={onClose} />
      </div>
    </div>
  );
}
