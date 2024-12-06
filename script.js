const apiKey = '6a55db9319c130cc4a352f1400f57392';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Get references to HTML elements
const cityInput = document.getElementById('cityInput');
const getWeatherBtn = document.getElementById('getWeatherBtn');
const weatherInfo = document.getElementById('weatherInfo');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');

// Function to fetch weather data
async function fetchWeather(city) {
    try {
        const url = `${weatherUrl}?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
        console.log(url);  
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error: ${errorData.message}`);
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert(error.message);
    }
}

// Function to display weather data
function displayWeather(data) {
    cityName.innerText = data.name;
    temperature.innerText = `Temperature: ${data.main.temp}°C`;
    description.innerText = `Weather: ${data.weather[0].description}`;
    humidity.innerText = `Humidity: ${data.main.humidity}%`;
}

// Event listener for button click
getWeatherBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        alert('Please enter a city name');
    }
});
