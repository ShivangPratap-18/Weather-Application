const inputBox = document.getElementById("searchInput");

const searchButton = document.getElementById("search-button");

const weather_img = document.querySelector("#weather- image");

const weather_body = document.querySelector(".weather-body");

const temparature = document.querySelector(".temp");
const description = document.querySelector(".description");

const humidity = document.querySelector("#humidity");

const windSpeed = document.querySelector("#wind-speed");

const location_err = document.querySelector(".location-not-found");

let image = document.createElement("img");

async function checkWeather(city) {
  const key = "af44c167bb9e403289454353241902";

  const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&aqi=yes`;

  const response = await fetch(`${url}`);
  if (response.status !== 200) {
    location_err.style.display = "flex";
    weather_body.style.display = "none";

    console.log("Error");
    return;
  }
  location_err.style.display = "none";
  weather_body.style.display = "flex";
  const weather_data = await response.json();

  // console.log(weather_data);

  temparature.innerHTML = `${weather_data.current.temp_c}°C`;
  description.innerHTML = `${weather_data.current.condition.text}`;
  humidity.innerHTML = `${weather_data.current.humidity}%`;
  windSpeed.innerHTML = `${weather_data.current.wind_kph}  km/h`;

  const WeatherIcon = weather_data.current.condition.icon;
  image.src = WeatherIcon;
  image.alt = "Weather Image";

  image.style = "border : 3px solid black;";

  weather_body.insertAdjacentElement("afterbegin", image);
}

searchButton.addEventListener("click", () => {
  checkWeather(inputBox.value);
});
