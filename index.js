const weather = document.querySelector(".weather");
const search = document.querySelector(".search");
const city = document.querySelector(".city");
const country = document.querySelector(".country");
const degree = document.querySelector(".degree span");
const weatherState = document.querySelector(".weather-state span");
const visibility = document.querySelector(".visibility span");
const wind = document.querySelector(".wind span");
const humidity = document.querySelector(".humidity span");
const time = document.querySelector(".date");
const dataApp = document.querySelector(".dataApp");
const showErr = document.querySelector(".show-err");

// call api
async function mappingWeather(inputValue) {
  let apiURL = `http://api.openweathermap.org/data/2.5/weather?q=
  ${inputValue}&appid=6ca804c72240fb8686f505d10e637010`;
  let data = await fetch(apiURL).then((res) => res.json());
  // if ok
  if (data.cod == 200) {
    dataApp.classList.remove("hidden");
    showErr.style.visibility = "hidden";
    console.log(data);

    // mapping data
    country.innerText = data.sys.country;
    city.innerText = data.name + ",";
    degree.innerText = Math.round(data.main.temp - 273.15) + "°C";
    visibility.innerText = data.visibility + "m";
    wind.innerText = data.wind.speed + "m/s";
    humidity.innerText = data.main.humidity + "%";
    weatherState.innerText = data.weather[0].description
      ? data.weather[0].description
      : "";
    time.innerText = new Date().toLocaleString("vi");

    // change bg
    const temp = Math.round(data.main.temp - 273.15);
    if (temp > 35) {
      weather.setAttribute("class", "weather dry");
    }
    if (temp >= 30 && temp < 35) {
      weather.setAttribute("class", "weather hot");
    }
    if (temp < 30 && temp >= 10) {
      weather.setAttribute("class", "weather cool");
    }
    if (temp < 10) {
      weather.setAttribute("class", "weather snow");
    }
  } else {
    dataApp.classList.add("hidden");
    console.log("error");
    // show error message
    showErr.style.visibility = "visible";
    showErr.innerText = "Error not found";
  }
}

// start calling api on mouse enter
search.addEventListener("keypress", function (e) {
  if (e.code === "Enter") {
    let inputValue = search.value.trim();
    mappingWeather(inputValue);
  }
});
