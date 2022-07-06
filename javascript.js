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
  let apiKey = "28d1bc668482ed61803072514627074f";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(url).then(showWeather);
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row future-weather">`;
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col-12 col-md day day1">
      <div class="card day-section">
        <div class="card-body">
          <div class="row">
            <div class="col-8">
              <div class="weekday">${day}</div>
              <div class="cloudness">Sunny</div>
              <div class="temperature-days5" id="weather-future-max">
                18°C<span id="weather-future-min"> 12°C</span>
              </div>
            </div>
            <div class="col-4 day5-image">
              <i class="fa-solid fa-sun"></i>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  });

  forecastHTML = forecastHTML + `</div`;
  forecastElement.innerHTML = forecastHTML;
}

function changeCurrentCityAndWeather(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#search-city");
  let mainCity = document.querySelector(".main-city");
  mainCity.innerHTML = currentCity.value;
  let apiKey = "28d1bc668482ed61803072514627074f";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${mainCity.innerHTML}&appid=${apiKey}&units=${units}`;

  axios.get(url).then(showWeather);
}
let searchForm = document.querySelector(".search-city");
searchForm.addEventListener("submit", changeCurrentCityAndWeather);

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
}

function showLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "28d1bc668482ed61803072514627074f";
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
displayForecast();
