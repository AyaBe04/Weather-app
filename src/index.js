function ChangeCity() {
    const userInput = prompt("Enter a city ");
    if (userInput) {
      const city = userInput.toLowerCase();
      getWeather(city);
    } else {
      alert("No city entered.");
    }
  }
  
  let CityInfos = document.querySelector("button");
  CityInfos.addEventListener("click", ChangeCity);
  
  // the current date and time
  let currentDate = new Date();
  var dateOptions = { weekday: "long", day: "numeric" };
  var timeOptions = { hour: "2-digit", minute: "2-digit" };
  var formattedDate = currentDate.toLocaleDateString(undefined, dateOptions);
  var formattedTime = currentDate.toLocaleTimeString(undefined, timeOptions);
  
  var wdElement = document.getElementById("WD");
  wdElement.textContent = formattedDate + " " + formattedTime;
  
  // the city name on the page after the user submits the form
  var searchForm = document.getElementById("searchForm");
  var cityInput = document.getElementById("cityInput");
  var cityResult = document.getElementById("cityResult");
  var temperatureResult = document.getElementById("temperatureResult");
  
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var cityName = cityInput.value.trim();
    getWeather(cityName);
    cityInput.value = "";
  });
  
  function getWeather(cityName) {
    const apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    const units = "metric";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;
  
    axios
      .get(apiUrl)
      .then(function (response) {
        displayWeather(cityName, response.data);
      })
      .catch(function (error) {
        handleWeatherError(error);
      });
  }
  
  function displayWeather(cityName, data) {
    if (data.main && data.main.temp) {
      var temperature = data.main.temp;
      cityResult.textContent = `${cityName}`;
      temperatureResult.textContent = `Temperature: ${temperature}°C`;
    } else {
      cityResult.textContent = "City not found";
      temperatureResult.textContent = "";
    }
  }
  
  function handleWeatherError(error) {
    console.log(error);
    cityResult.textContent = "An error occurred";
    temperatureResult.textContent = "";
  }