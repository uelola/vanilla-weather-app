function submitCityInput(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
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
}
function updateWeatherConditions(response) {
  document.querySelector("#city-and-country").innerHTML = response.data.name;
  document.querySelector("#temp-main").innerHTML = Math.round(
    response.data.main.temp
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
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconMain.setAttribute("alt", response.data.weather[0].description);
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

let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", submitCityInput);
searchCity(`Schaffhausen`);

function formatDate(event) {
  let dateComponents = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return event.toLocaleDateString(undefined, dateComponents);
}

let dateLine = document.querySelector("#date");
dateLine.innerHTML = formatDate(new Date());

function currentTime(time) {
  let now = time;
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let timeRepresentation = `${hours}:${minutes}`;
  return timeRepresentation;
}

let timeLine = document.querySelector("#time");
timeLine.innerHTML = currentTime(new Date());

function convertToCelsius(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp-main");
  let temperature = temp.innerHTML;
  temp.innerHTML = Math.round((temperature - 32) * (5 / 9));
  let fahrenheit = (document.getElementById("fahrenheit").style.fontWeight =
    "500");
  fahrenheit = document.getElementById("fahrenheit").style.color = "#555555";
  let celsiusFont = (document.getElementById("celsius").style.fontWeight =
    "700");
  celsiusFont = document.getElementById("celsius").style.color = "#0b0120";
  fahrenheit.innerHTML = fahrenheit;
  celsiusFont.innerHTML = celsiusFont;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp-main");
  let temperature = temp.innerHTML;
  temp.innerHTML = Math.round((temperature * 9) / 5 + 32);
  let fahrenheit = (document.getElementById("fahrenheit").style.fontWeight =
    "700");
  fahrenheit = document.getElementById("fahrenheit").style.color = "#0b0120";
  let celsiusFont = (document.getElementById("celsius").style.fontWeight =
    "600");
  celsiusFont = document.getElementById("celsius").style.color = "#555555";
  fahrenheit.innerHTML = fahrenheit;
  celsiusFont.innerHTML = celsiusFont;
}

let fahrenheit = document.querySelector("#fahrenheit");
let celsius = document.querySelector("#celsius");
fahrenheit.addEventListener("click", convertToFahrenheit);
celsius.addEventListener("click", convertToCelsius);

let defaultView = document.querySelector("#current");
defaultView.addEventListener("click", getCurrentLocation);
