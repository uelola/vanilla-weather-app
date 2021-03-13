function submitCityInput(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  cityInput = cityInput.toLowerCase().trim();
  //removing spaces and unwanted char from the string except letters
  cityInput = cityInput.replaceAll(/[^A-Za-z]+/g, "");
  let h4 = document.querySelector("h4");
  if (cityInput) {
    h4.innerHTML = `${cityInput}`;
  }
  searchCity(cityInput);
}
function searchCity(city) {
  let apiKey = "45806222ea153dc5cbd693b6ea7eebaf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeatherConditions);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWindDetails.collapse);
}

function updateWeatherConditions(response) {
  document.querySelector("#city-and-country").innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#temp-main").innerHTML = Math.round(
    celsiusTemperature
  );
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document.querySelector("#time").innerHTML = formatTime(
    response.data.dt * 1000
  );
  document.querySelector("#sunrise").innerHTML = formatTime(
    response.data.sys.sunrise * 1000
  );
  document.querySelector("#sunset").innerHTML = formatTime(
    response.data.sys.sunset * 1000
  );
  document.querySelector("#precipitation-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity} `;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} `;
  let iconMain = document.querySelector("#icon-main");
  iconMain.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconMain.setAttribute("alt", response.data.weather[0].description);
}

function displayForecast(response) {
  let threeHourforecastView = document.querySelector("#forecast");
  threeHourforecastView.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 8; index++) {
    forecast = response.data.list[index];
    threeHourforecastView.innerHTML += `
    <div class="col three-hour-forecast-col">
      <h6>
        ${formatTime(forecast.dt * 1000)}
      </h6>
      <img
        src="https://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png" class="forecast-icon" 
      />
      <div class="weather-forecast-temperature">
        <strong>
          ${Math.round(forecast.main.temp_max)}°
        </strong>
        ${Math.round(forecast.main.temp_min)}°
      </div>
    </div>
  `;
  }
}
function clickWindDetails(event) {
  event.preventDefault();
  let city = document.querySelector("#city-and-country").innerHTML;
  console.log(city);
  let apiKey = "45806222ea153dc5cbd693b6ea7eebaf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWindDetails);
}
function displayWindDetails(response) {
  console.log(response.data);
  let threeHourWindView = document.querySelector("#wind-forecast");
  threeHourWindView.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 8; index++) {
    forecast = response.data.list[index];
    threeHourWindView.innerHTML += `
      <div class="col three-hour-forecast-wind">
        <em>
          ${Math.round(forecast.wind.speed)}km/h
        </em>
      </div>
  `;
  }
}
function getLocation(position) {
  let apiKey = `45806222ea153dc5cbd693b6ea7eebaf`;
  let units = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}&units${units}`;

  axios.get(apiUrl).then(updateWeatherConditions);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}
let celsiusTemperature = null;

let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", submitCityInput);
searchCity(`Schaffhausen`);

function formatDate(timestamp) {
  let date = new Date(timestamp);

  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekday = weekdays[date.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];
  let dateOfMonth = date.getDate();
  return `${weekday}, ${month} ${dateOfMonth}`;
}

function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp-main");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temp.innerHTML = Math.round(celsiusTemperature);
  let city = document.querySelector("#city-and-country").innerHTML;
  let apiKey = "45806222ea153dc5cbd693b6ea7eebaf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(changeForecastTempToCelsius);
}
function changeForecastTempToCelsius(response) {
  let threeHourforecastView = document.querySelector("#forecast");
  threeHourforecastView.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 8; index++) {
    forecast = response.data.list[index];
    threeHourforecastView.innerHTML += `
    <div class="col "three-hour-forecast-col">
      <h6>
        ${formatTime(forecast.dt * 1000)}
      </h6>
      <img
        src="https://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png" class="forecast-icon" 
      />
      <div class="weather-forecast-temperature">
        <strong>
          ${Math.round(forecast.main.temp_max)}°
        </strong>
        ${Math.round(forecast.main.temp_min)}°
      </div>
    </div>
  `;
  }
}
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp-main");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  temp.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
  let city = document.querySelector("#city-and-country").innerHTML;
  let apiKey = "45806222ea153dc5cbd693b6ea7eebaf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(changeForecastTempToFahrenheit);
}
function changeForecastTempToFahrenheit(response) {
  let threeHourforecastView = document.querySelector("#forecast");
  threeHourforecastView.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 8; index++) {
    forecast = response.data.list[index];
    threeHourforecastView.innerHTML += `
    <div class="col three-hour-forecast-col">
      <h6>
        ${formatTime(forecast.dt * 1000)}
      </h6>
      <img
        src="https://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png" class="forecast-icon" 
      />
      <div class="weather-forecast-temperature">
        <strong>
          ${Math.round((forecast.main.temp_max * 9) / 5 + 32)}°
        </strong>
          ${Math.round((forecast.main.temp_min * 9) / 5 + 32)}°
      </div>
    </div>
  `;
  }
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
let celsiusLink = document.querySelector("#celsius-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
celsiusLink.addEventListener("click", displayCelsiusTemperature);
let windLink = document.querySelector("#detailed-wind");
windLink.addEventListener("click", clickWindDetails);
