const input = document.querySelector(".city");
const card = document.querySelector(".card");

const debounce = (fn, debounceTime) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), debounceTime);
  };
};

async function getWeather(city) {
  const apiKey = "";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const res = await axios.get(url);
    const data = res.data;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    card.innerHTML = `
        <p class="sityName">City name: ${data.name}</p>
        <p class="temperature">Temperature (°C): ${data.main.temp}</p>
        <p class="description">Weather description
: ${data.weather[0].description}</p>
        <p class="wind">Wind speed: ${data.wind.speed}</p>
        <img src="${iconUrl}" alt="Погода">`;
    card.style.display = "flex";
    const weatherBackgrounds = {
      Clear: "img/clear sky.jpg",
      Clouds: "img/clouds.jpg",
      Rain: "img/rain.jpg",
      Drizzle: "img/rain.jpg",
      Thunderstorm: "img/thunderstorm.jpg",
      Snow: "img/snow.jpg",
      Mist: "img/mist.jpg",
      Fog: "img/mist.jpg",
    };

    const bg = weatherBackgrounds[data.weather[0].main];

    if (bg) {
      document.body.style.backgroundImage = `url('${bg}')`;
    } else {
      document.body.style.backgroundColor = "rgb(96, 96, 250)";
    }
  } catch (error) {
    console.error("Failed to load weather data", error);
    card.innerHTML = `<p class="no-results">The ${city}'s weather information not found </p>`;
  }
}

const debounceGetWeather = debounce(getWeather, 700);

input.addEventListener("input", () => {
  if (input.value.trim()[0] === " ") return;
  debounceGetWeather(input.value.trim());
});
