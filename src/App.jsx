import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { WiHumidity, WiStrongWind } from "react-icons/wi";
import axios from 'axios';
import './App.css'
const App = () => {
  const API_KEY = "fbdb5bf8c2e9a74b53c0a56a860b8b7c";
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [windspeed, setWindspeed] = useState(null);
  const [cityName, setCityName] = useState("");
  const [weathericon, setWeatherIcon] = useState("01d");

  const fetchWeather = async () => {
    console.log(search);
    if (!search) return;
    setLoading(true);
    try {
      const {data} =await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${API_KEY}`
      );
      console.log(data);
      if (data.cod == 200) {
        setTemperature(data.main.temp);
        setHumidity(data.main.humidity);
        setWindspeed(data.wind.speed);
        setCityName(data.name);
        setWeatherIcon(data.weather[0].icon);
      }
    }
    catch (error) {
        setTemperature(null);
        setHumidity(null);
        setTemperature(null);
        setWindspeed(null);
        setCityName("City not found...");
        setWeatherIcon("01d");
      }
      setLoading(false);
  };
   const handleKeyDown = (e) => {
    if (e.key === "Enter") fetchWeather();
  };
  return (
    <>
      <div className='clouds-bg flex flex-col items-center justify-center h-screen text-white 
      bg-[url("https://images.unsplash.com/photo-1561484930-998b6a7b22e8?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")]
      bg-cover
      '>
        <div className='flex items-center bg-white rounded-full px-4 py-2 mb-6 w-80 shadow-lg'>
          <input type='text' placeholder='Search...' value={search} onChange={(e)=>setSearch(e.target.value)} onKeyDown={handleKeyDown}
            className='flex-1 text-black outline-none px-2'
          />
          <FaSearch onClick={fetchWeather} className='text-gray-500 cursor-pointer' />
        </div>
        <img src={`https://openweathermap.org/img/wn/${weathericon}@2x.png`}
          className='w-20 h-20 mb-4'
        />
        <h1 className='text-4xl font-bold'>
          {loading?"Loading...":temperature != null ? `${temperature}`:"--"}
           </h1>
        <h2 className='text-2xl mt-2 font-semibold'>
          {cityName || "Type to check temperature"}
        </h2>
        <div className='w-full max-w-md mt-6  flex flex-col md:flex-row justify-between items-center md:items-start'>
          <div>
            <WiHumidity className='text-3xl' />
            <span className="text-lg font-medium">{humidity != null? `${humidity}`:"--"}</span>
            <p className="text-sm">Humidity</p>
          </div>
          <div>
            <WiStrongWind className='text-3xl' />
            <span className="text-lg font-medium">{windspeed != null? `${windspeed}`: "--"}</span>
            <p className="text-sm">Wind Speed</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
