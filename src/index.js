function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col-2">
             <div class="weather-forecast-date">${day}</div>
             <img
               src="http://openweathermap.org/img/wn/50d@2x.png"
               alt=""
               width="42"
             />
             <div class="weather-forecast-temperatures">
               <span class="weather-forecast-temperature-max"> 18° </span>
               <span class="weather-forecast-temperature-min"> 12° </span>
             </div>
         </div>
        `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function displayWeatherCondition(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#hum").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#desc").innerHTML = response.data.weather[0].main;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celTemp = response.data.main.temp;
}

function searchCity(city) {
  // event.preventDefault();
  let apiKey = "13dced56061d92fe4b5409145f02a578";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleForm(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleForm);

function searchLocation(position) {
  let apiKey = "13dced56061d92fe4b5409145f02a578";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocation);

searchCity("Miami");

displayForecast();

function displayFarTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  celLink.classList.remove("active");
  farLink.classList.add("active");
  let farTemp = (celTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(farTemp);
}

let farLink = document.querySelector("#far-link");
farLink.addEventListener("click", displayFarTemp);

function displayCelTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  celLink.classList.add("active");
  farLink.classList.remove("active");
  tempElement.innerHTML = Math.round(celTemp);
}

let celLink = document.querySelector("#cel-link");
celLink.addEventListener("click", displayCelTemp);
