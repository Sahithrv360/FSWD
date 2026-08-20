const form = document.querySelector("form");
const cityip = document.getElementById("cityInput");
const error = document.getElementById("error");
const currWeather = document.getElementById("currWeather");
const table = document.getElementById("table");
const forecastTable = document.getElementById("forecastTable");

form.addEventListener("submit",getweather);
const API_KEY = "245384ba48034e558d9161134261808";

async function getweather(event){
    event.preventDefault();
    const city = cityip.value;
    console.log(city);
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=14&aqi=no&alerts=no`;

    try{
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        currWeather.classList.remove("d-none");
        document.getElementById("cityName").textContent ="📍 " + data.location.name;
        document.getElementById("temp").textContent = data.current.temp_c + "°C";
        document.getElementById("condition").textContent =  data.current.condition.text;
        document.getElementById("humidity").textContent = data.current.humidity + "%";
        document.getElementById("wind").textContent = data.current.wind_kph + " km/h";
        document.getElementById("rain").textContent = data.current.chance_of_rain + "%";

        table.classList.remove("d-none");
        forecastTable.innerHTML = "";

        data.forecast.forecastday.forEach(day => {
            forecastTable.innerHTML += `
                <tr>
                    <td>${day.date}</td>
                    <td><img src="https:${day.day.condition.icon}" width="40">${day.day.condition.text}</td>
                    <td>${day.day.mintemp_c}°C</td>
                    <td>${day.day.maxtemp_c}°C</td>
                    <td>${day.day.daily_chance_of_rain}%</td>
                </tr>`;
        });
    }catch(err){
        console.log("Error : ",err);
    }
}