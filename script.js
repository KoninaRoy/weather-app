const apiKey = "445548500d5543c692d123648252806"; 

document.getElementById("getWeatherBtn").addEventListener("click", function() {
  const city = document.getElementById("cityInput").value;
  if (city) {
    getWeather(city);
  } else {
    document.getElementById("weatherResult").innerHTML = "Please enter a city name.";
  }
});

function getWeather(city) {
  fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=no&alerts=no`)
    .then(response => response.json())
    .then(data => {
      if (data.location) {
        const resultDiv = document.getElementById("weatherResult");

        // Current Weather with current date
        let html = `
          <h2>${data.location.name}, ${data.location.country}</h2>
          <p><strong>Date:</strong> ${data.location.localtime.split(' ')[0]}</p>
          <p>${data.current.condition.text}</p>
          <p>Temperature: ${data.current.temp_c} °C</p>
          <p>Humidity: ${data.current.humidity}%</p>
          <p>Wind Speed: ${data.current.wind_kph} km/h</p>
          <img src="${data.current.condition.icon}" alt="Weather Icon" />
          <h3>3-Day Forecast</h3>
        `;

        // 3-Day Forecast
        data.forecast.forecastday.forEach(day => {
          html += `
            <div class="forecast-day">
              <p><strong>${day.date}</strong></p>
              <p>${day.day.condition.text}</p>
              <p>Max: ${day.day.maxtemp_c} °C | Min: ${day.day.mintemp_c} °C</p>
              <img src="${day.day.condition.icon}" alt="Weather Icon" />
            </div>
          `;
        });

        resultDiv.innerHTML = html;

      } else {
        document.getElementById("weatherResult").innerHTML = "City not found.";
      }
    })
    .catch(error => {
      console.log(error);
      document.getElementById("weatherResult").innerHTML = "Error fetching data.";
    });
}
