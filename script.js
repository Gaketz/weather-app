// Select all elements
const weatherInfo = document.getElementById("weather-info");
const input = document.getElementById("search");
const btnSubmit = document.getElementById("submit");

// Wait for the page to load
window.addEventListener("load", function() {
  // Add the fade-in class to the body element after a short delay
  setTimeout(function() {
    document.body.classList.add("fade-in");
  }, 500);
});

// Function to set the content with a smooth transition
function setWeatherInfo(content) {
  weatherInfo.classList.add("fade-out");

  setTimeout(() => {
    weatherInfo.innerHTML = content;
    weatherInfo.classList.add("fade-in");

    setTimeout(() => {
      weatherInfo.classList.remove("fade-in");
      weatherInfo.classList.remove("fade-out");
    }, 500);
  }, 500);
}

// Function to handle form submission
function handleSubmit(event) {
  event.preventDefault();
  setWeatherInfo("Loading...");
  getWeather();
}

// Add event listener to the button
btnSubmit.addEventListener("click", handleSubmit);

// Add event listener to the input for pressing enter
input.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    handleSubmit(event);
  }
});

// Get weather info
async function getWeather() {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=167bfb446a67415ab91103622232603&q=${input.value}&aqi=no`,
    { mode: "cors" }
  );
  const weatherData = await response.json();
  setWeatherInfo(`
    <div class="row row-cols-1 row-cols-md-2 align-items-md-center g-5 py-5">
      <div class="col d-flex flex-column align-items-start gap-2">
        <h2 class="fw-bold text-body-emphasis">${weatherData.location.name}: ${weatherData.current.temp_c}°C / ${weatherData.current.temp_f}°F</h2>
        <h3 class="fw-bold text-body-emphasis">${weatherData.current.condition.text} <img src="${weatherData.current.condition.icon}" alt="${weatherData.current.condition.text}"/></h3>
        <p class="text-body-secondary">Region: ${weatherData.location.region} <br/> Country: ${weatherData.location.country}</p>
      </div>

      <div class="col">
        <div class="row row-cols-1 row-cols-sm-2 g-4">
          <div class="col d-flex flex-column gap-2">
            <div class="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-secondary fs-4 rounded-3">
              <img src="./assets/wind.svg" height="30" alt="wind" />
            </div>
            <h4 class="fw-semibold mb-0 text-body-emphasis">Wind</h4>
            <p class="text-body-secondary">Wind Speed: ${weatherData.current.wind_kph} kph / ${weatherData.current.wind_mph} mph </br> Wind Direction: ${weatherData.current.wind_dir} </p>
          </div>

          <div class="col d-flex flex-column gap-2">
            <div class="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-secondary fs-4 rounded-3">
              <img src="./assets/person-lines-fill.svg" height="30" alt="pressure" />
            </div>
            <h4 class="fw-semibold mb-0 text-body-emphasis">Pressure</h4>
            <p class="text-body-secondary">${weatherData.current.pressure_mb} mb | ${weatherData.current.pressure_in} in</p>
          </div>

          <div class="col d-flex flex-column gap-2">
            <div class="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-secondary fs-4 rounded-3">
              <img src="./assets/fan.svg" height="30" alt="humidity" />
            </div>
            <h4 class="fw-semibold mb-0 text-body-emphasis">Humidity</h4>
            <p class="text-body-secondary">Humidity: ${weatherData.current.humidity} | Cloud: ${weatherData.current.cloud}</p>
          </div>

          <div class="col d-flex flex-column gap-2">
            <div class="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-secondary fs-4 rounded-3">
              <img src="./assets/thermometer-half.svg" height="30" alt="feels-like" />
            </div>
            <h4 class="fw-semibold mb-0 text-body-emphasis">Feels like:</h4>
            <p class="text-body-secondary">${weatherData.current.feelslike_c}°C / ${weatherData.current.feelslike_f}°F</p>
          </div>
        </div>
      </div>
    </div>
  `);

  input.value = "";
}
