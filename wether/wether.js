// script.js

document.getElementById('searchBtn').addEventListener('click', fetchWeather);

function fetchWeather() {
    const location = document.getElementById('locationInput').value;
    if (!location) return;

    const apiKey = 'YOUR_API_KEY';  // Replace with your API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            alert('Unable to fetch weather data. Please try again.');
        });
}

function displayWeather(data) {
    if (data.cod === '404') {
        alert('Location not found. Please enter a valid location.');
        return;
    }

    const locationName = data.name;
    const temperature = `${data.main.temp}°C`;
    const conditions = data.weather[0].description;

    document.getElementById('locationName').textContent = locationName;
    document.getElementById('temperature').textContent = temperature;
    document.getElementById('conditions').textContent = conditions;

    document.getElementById('weatherInfo').classList.remove('hidden');
}
