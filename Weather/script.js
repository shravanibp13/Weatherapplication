// Replace 'your_api_key' with your actual OpenWeather API key
const apiKey = '990834f49acabb106af99311613f2a92';

document.getElementById('searchBtn').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    if (city) {
        getWeather(city);
    } else {
        alert('Please enter a city name');
    }
});

async function getWeather(city) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.cod === '404') {
            alert('City not found');
        } else {
            displayWeather(data);
        }
    } catch (error) {
        alert('Error fetching weather data');
        console.error(error);
    }
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    const weatherHtml = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
        <p><strong>Weather:</strong> ${data.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;
    weatherInfo.innerHTML = weatherHtml;
}
