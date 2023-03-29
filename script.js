// Select all elements
const body = document.querySelector("body");
const town = document.querySelector(".town");
const temperature = document.querySelector(".temperature");
const weatherInfo = document.querySelector(".weather-info");
const dateAndTime = document.querySelector(".date-time");
const input = document.querySelector("#search");
const btnSubmit = document.querySelector("#submit");

// Add event listener
btnSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  getWeather();
});

// Get weather info
async function getWeather() {
  const response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=167bfb446a67415ab91103622232603&q=${input.value}&aqi=no`,
    { mode: "cors" }
  );
  const weatherData = await response.json();
  town.textContent = weatherData.location.name;
  temperature.textContent = `${weatherData.current.temp_c} °C | ${weatherData.current.temp_f} °F`;
  weatherInfo.textContent = `Feel: ${weatherData.current.feelslike_c} °C | ${weatherData.current.condition.text} | Humidity: ${weatherData.current.humidity}%`;
  dateAndTime.textContent = weatherData.location.localtime;
}
