let currentDate = document.querySelector(".current-datetime");
let now = new Date();
let date = now.getDate();
let year = now.getFullYear();
let hour = now.getHours();
let minutes = now.getMinutes();
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let apiKey = "548840c634f3a0cc99d8d8ba9e5b649d";

function displayMinutes() {
  if (minutes < 10) {
    return `0${minutes}`;
  } else {
    return minutes;
  }
}
function displayHours() {
  if (hour < 10) {
    return `0${hour}`;
  } else {
    return hour;
  }
}
currentDate.innerHTML = `${day} ${date} ${month} ${year}, ${displayHours()}:${displayMinutes()}`;

function searchDefaultCity(city) {
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(url).then(showWeather);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row future-weather">`;
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-12 col-md day day1">
      <div class="card day-section">
        <div class="card-body">
          <div class="row">
            <div class="col-8">
              <div class="weekday">${formatDay(forecastDay.dt)}</div>
              <div class="cloudness">${forecastDay.weather[0].main}</div>
              <div class="temperature-days5" id="weather-future-max">
                ${Math.round(
                  forecastDay.temp.max
                )}°C<span id="weather-future-min"> ${Math.round(
          forecastDay.temp.min
        )}°C</span>
              </div>
            </div>
            <div class="col-4 day5-image">
              <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" alt="" width="60" />
            </div>
          </div>
        </div>
      </div>
    </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div`;
  forecastElement.innerHTML = forecastHTML;
}

function changeCurrentCityAndWeather(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#search-city");
  let mainCity = document.querySelector(".main-city");
  mainCity.innerHTML = currentCity.value;
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${mainCity.innerHTML}&appid=${apiKey}&units=${units}`;

  axios.get(url).then(showWeather);
}
let searchForm = document.querySelector(".search-city");
searchForm.addEventListener("submit", changeCurrentCityAndWeather);

function getForecast(coordinates) {
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  celsiusTemperature = Math.round(response.data.main.temp);
  let displayTemp = document.querySelector("#current-temperature");
  displayTemp.innerHTML = celsiusTemperature;
  let description = response.data.weather[0].main;
  let skyState = document.querySelector(".sky-state");
  skyState.innerHTML = description;
  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector(".humidity");
  currentHumidity.innerHTML = `Humidity ${humidity}%`;
  let wind = response.data.wind.speed;
  let windSpeed = document.querySelector(".wind");
  windSpeed.innerHTML = `Wind ${wind} m/s`;
  let iconElement = document.querySelector("#today-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  console.log(response);
  let city = response.data.name;
  let searchCity = document.querySelector(".main-city");
  searchCity.innerHTML = city;
  getForecast(response.data.coord);
}

function showLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function getGeolocation() {
  navigator.geolocation.getCurrentPosition(showLocation);
}

let locationButton = document.querySelector(".current-location-button");
locationButton.addEventListener("click", getGeolocation);

function changeToCelcium(event) {
  event.preventDefault();
  todayTemperature.innerHTML = celsiusTemperature;
  celciumTemp.classList.add("active");
  farenheitTemp.classList.remove("active");
}
function changeToFarenheit(event) {
  event.preventDefault();
  todayTemperature.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
  celciumTemp.classList.remove("active");
  farenheitTemp.classList.add("active");
}
let todayTemperature = document.querySelector("#current-temperature");
let celciumTemp = document.querySelector("#celcium-temp");
let farenheitTemp = document.querySelector("#farenheit-temp");
celciumTemp.addEventListener("click", changeToCelcium);
farenheitTemp.addEventListener("click", changeToFarenheit);

let celsiusTemperature = null;

searchDefaultCity("Kyiv");
