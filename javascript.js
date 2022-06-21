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

// function changeToCelcium(event) {
//   event.preventDefault();
//   todayTemperature.innerHTML = 17;
// }
// function changeToFarenheit(event) {
//   event.preventDefault();
//   todayTemperature.innerHTML = 63;
// }
// let todayTemperature = document.querySelector("#current-temperature");
// let celciumTemp = document.querySelector("#celcium-temp");
// let farenheitTemp = document.querySelector("#farenheit-temp");
// celciumTemp.addEventListener("click", changeToCelcium);
// farenheitTemp.addEventListener("click", changeToFarenheit);

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let displayTemp = document.querySelector("#current-temperature");
  displayTemp.innerHTML = temperature;
  let description = response.data.weather[0].main;
  let skyState = document.querySelector(".sky-state");
  skyState.innerHTML = description;
  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector(".humidity");
  currentHumidity.innerHTML = `Humidity ${humidity}%`;
  let wind = response.data.wind.speed;
  let windSpeed = document.querySelector(".wind");
  windSpeed.innerHTML = `Wind ${wind} m/s`;
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
