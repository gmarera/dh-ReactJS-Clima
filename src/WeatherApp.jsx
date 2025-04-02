import { useState } from 'react'
import './WeatherApp.css'
export const WeatherApp = () => {

    const [city, setCity] = useState('')
    const [weatherData, setWeatherData] = useState(null)

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = 'YOUR_API_KEY' // Reemplaza con tu propia API Key de OpenWeatherMap
    // Puedes obtener una API Key gratuita en https://openweathermap.org/api
    const language = 'es'
    const difKelvin = 273.15

    const fetchWeatherData = async (city) => {
        try {
            const response = await fetch(`${urlBase}?q=${city}&appid=${API_KEY}&lang=${language}`)
            const data = await response.json()
            setWeatherData(data)
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const handleCityChange = (e) => {
        setCity(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        fetchWeatherData(city)
    }

    return (
        <div className="container">
            <h1>Aplicación de Clima</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Ingresa una ciudad"
                    value={city}
                    onChange={handleCityChange}
                />
                <button type="submit">Buscar</button>
            </form>

            {weatherData && (
                <div id="responseData">
                    <h2>{weatherData.name}, {weatherData.sys.country}</h2>
                    <p>Temperatura: {(weatherData.main.temp - difKelvin).toFixed(1)} °C</p>
                    <p>Descripción: {weatherData.weather[0].description}</p>
                    <p>Humedad: {weatherData.main.humidity}%</p>
                    <img
                        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                        alt={weatherData.weather[0].description}
                    />

                </div>
            )}
        </div>
    )
}
