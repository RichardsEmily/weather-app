let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let placeHolderDay = document.querySelector("#currentDay");
placeHolderDay.innerHTML = day;

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let time = hour + ":" + minutes;
let currentTime = document.querySelector("#currentTime");

currentTime.innerHTML = time;

function displayWeatherCondition(response) {
  document.querySelector("#cityName").innerHTML = response.data.name;
  document.querySelector("#cityTemp").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;

  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} mph`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "cabdbda40038ba7d1165b953b1c7bd6c";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search-field").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "cabdbda40038ba7d1165b953b1c7bd6c";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#city-search");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#currentSubmit");
currentLocationButton.addEventListener("click", getCurrentLocation);
