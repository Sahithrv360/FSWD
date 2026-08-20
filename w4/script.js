const API_KEY = "YOUR_API_KEY";

const form = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const city = cityInput.value.trim();

    if (!city) return;

    try {

        // Fetch weather data
        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            showError();
            return;
        }

        // Convert JSON data to webpage
        showWeather(data);

    } catch (error) {

        console.log(error);
        showError();

    }
});


function showWeather(data) {

    // Current weather

    document.getElementById("location").textContent =
        `${data.name}, ${data.sys.country}`;

    document.getElementById("temperature").textContent =
        Math.round(data.main.temp);

    document.getElementById("description").textContent =
        data.weather[0].description;

    document.getElementById("weather-icon").src =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    document.getElementById("weather").classList.remove("d-none");


    // Metrics

    const metrics = [
        ["Humidity", data.main.humidity + "%"],
        ["Feels Like", Math.round(data.main.feels_like) + "°C"],
        ["Wind Speed", data.wind.speed + " m/s"],
        ["Pressure", data.main.pressure + " hPa"]
    ];

    document.getElementById("metrics-container").innerHTML =
        metrics.map(item => `
            <div class="col-md-3">
                <div class="card text-center p-3 shadow">

                    <h5>${item[0]}</h5>

                    <p class="fs-4">
                        ${item[1]}
                    </p>

                </div>
            </div>
        `).join("");

    document.getElementById("metrics").classList.remove("d-none");


    // Background

    const condition = data.weather[0].main.toLowerCase();

    const backgrounds = {
        clear: "sunny.png",
        clouds: "cloudy.png",
        rain: "rainy.png",
        drizzle: "rainy.png",
        thunderstorm: "thunderstorm.png",
        snow: "snowy.png",
        mist: "foggy.png",
        fog: "foggy.png"
    };

    document.getElementById("weather").style.backgroundImage =
        `url("images/${backgrounds[condition] || "sunny.png"}")`;
}


function showError() {

    document.getElementById("error")
        .classList.remove("d-none");

    document.getElementById("weather")
        .classList.add("d-none");

    document.getElementById("metrics")
        .classList.add("d-none");

    document.getElementById("forecast")
        .classList.add("d-none");
}