// Taking Reference

let search = document.getElementById("search");
let btn = document.getElementById("btn");
let city_name = document.getElementById("city_name");
let temperature = document.getElementById("temperature");
let wether_status = document.getElementById("wether_status");
let humidity_span = document.getElementById("humidity_span");
let wind_span = document.getElementById("wind_span");
let pressure_span = document.getElementById("pressure_span");
let img_duplicate = document.getElementById("img_duplicate");

// global variables
let search_value;

btn.addEventListener("click", function () {
  search_value = search.value;
  console.log(search_value);
  Get_api();
});

search.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    search_value = search.value;
    console.log(search_value);
    Get_api();
  }
  if (!search.value) {
    city_name.innerHTML = "Enter City Name";
    temperature.innerText = "0°C";
    wether_status.innerText = "unknown";
    humidity_span.innerText = "0.0 %";
    wind_span.innerText = "0.0 kmph";
    pressure_span.innerText = "0.0 Hg";
    img_duplicate.setAttribute("src", "img/question.png");
  }
});

// function

function Get_api() {
  let request = new XMLHttpRequest();

  let api_key = "a5c3253c905ab7962479c4f4df4a014c";

  request.addEventListener("load", function (event) {
    let data = JSON.parse(event.target.responseText);

    console.log(data);

    if ("message" in data) city_name.innerText = `Location Not found`;
    else {
      city_name.innerText = data.name;
      wether_status.innerText = `${data.weather[0].description}`;
      let c = Math.trunc(data.main.temp - 273.15);
      temperature.innerText = `${c}°C`;
      humidity_span.innerText = `${data.main.humidity} %`;
      wind_span.innerText = `${data.wind.speed} kmph`;
      pressure_span.innerText = `${data.main.pressure} Hg`;

      if (data.weather[0].description.includes("clear"))
        img_duplicate.setAttribute("src", "./img/Sunny.png");
      if (data.weather[0].description.includes("cloud"))
        img_duplicate.setAttribute("src", "./img/cloudy.png");
      if (data.weather[0].description.includes("rain"))
        img_duplicate.setAttribute("src", "./img/rain.png");
      if (data.weather[0].description.includes("thunder"))
        img_duplicate.setAttribute("src", "./img/storm.png");
      if (data.weather[0].description.includes("windy"))
        img_duplicate.setAttribute("src", "./img/windy.png");
      if (data.weather[0].description.includes("mist"))
        img_duplicate.setAttribute("src", "./img/mist.png");
      if (data.weather[0].description.includes("haze"))
        img_duplicate.setAttribute("src", "./img/haze.png");
    }
  });

  request.open(
    "GET",
    `http://api.openweathermap.org/data/2.5/weather?q=${search_value}&APPID=${api_key}`
  );

  request.send();
}
