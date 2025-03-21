document.addEventListener("DOMContentLoaded", () => {
    const searchBox = document.querySelector(".search-box");
    const searchBtn = document.querySelector(".search-btn");
    const locationBtn = document.querySelector(".location-btn");
    const suggestionsContainer = document.querySelector(".suggestions");
    const weatherContainer = document.querySelector(".weather");
    const errorContainer = document.querySelector(".error");
    const loadingIndicator = document.querySelector(".loading-indicator");
    const weatherIcon = document.querySelector(".weather-icon");
    const weatherDescription = document.querySelector(".weather-icon-container .description");

    const weatherIcons = {
        "Clear": { icon: "./images/clear.png", desc: "Clear Sky" },
        "Partly cloudy": { icon: "./images/partly-cloudy.png", desc: "Partly Cloudy" },
        "Cloudy": { icon: "./images/cloudy.png", desc: "Overcast Skies" },
        "Rain": { icon: "./images/rain.png", desc: "Rain Showers" },
        "Snow": { icon: "./images/snow.png", desc: "Snowfall" },
        "Thunderstorm": { icon: "./images/thunderstorm.png", desc: "Thunderstorms" },
        "Mist": { icon: "./images/mist.png", desc: "Misty Conditions" },
        "Fog": { icon: "./images/fog.png", desc: "Foggy Weather" }
    };

    const fetchWeather = async (location) => {
        weatherContainer.classList.add("loading");
        errorContainer.style.display = "none";
        loadingIndicator.style.display = "block";

        try {
            const res = await fetch(`https://wttr.in/${location}?format=j1`);
            if (!res.ok) throw new Error("Network response was not ok");
            const data = await res.json();
            updateWeatherUI(data, location);
        } catch (error) {
            showError("Could not fetch weather data. Try again later.");
        }
    };

    const updateWeatherUI = (data, city) => {
        const current = data.current_condition[0];
        const { temp_C, humidity, windspeedKmph, uvIndex, pressure } = current;
        const weatherDesc = current.weatherDesc[0].value;
        const today = data.weather[0];

        document.querySelector(".city").textContent = city;
        document.querySelector(".temp").textContent = `${temp_C}°C`;
        document.querySelector(".temp-hi").textContent = `H: ${today.maxtempC}°C`;
        document.querySelector(".temp-lo").textContent = `L: ${today.mintempC}°C`;
        document.querySelector(".pressure").textContent = `Pressure: ${pressure}`;
        document.querySelector(".humidity").textContent = `Humidity: ${humidity}%`;
        document.querySelector(".wind").textContent = `Wind: ${windspeedKmph} km/h`;
        document.querySelector(".uv-index").textContent = `UV Index: ${uvIndex}`;

        if (weatherIcons[weatherDesc]) {
            const iconPath = weatherIcons[weatherDesc].icon || "images/default.png";
            weatherIcon.src = iconPath;
            weatherDescription.textContent = weatherIcons[weatherDesc].desc;
        } else {
            weatherIcon.src = "images/default.png";
            weatherDescription.textContent = weatherDesc;
        }

        loadingIndicator.style.display = "none";
        weatherContainer.classList.remove("loading");
    };

    const showError = (message) => {
        errorContainer.style.display = "block";
        errorContainer.textContent = message;
        loadingIndicator.style.display = "none";
        weatherContainer.classList.remove("loading");
    };

    searchBox.addEventListener("input", async () => {
        const query = searchBox.value.trim();
        if (query.length < 3) {
            suggestionsContainer.innerHTML = "";
            return;
        }

        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=5`);
            if (!res.ok) throw new Error("Network response was not ok");
            const data = await res.json();
            suggestionsContainer.innerHTML = data.map(city => 
                `<div class="suggestion">${city.display_name}</div>`
            ).join("");

            document.querySelectorAll(".suggestion").forEach(item => {
                item.addEventListener("click", () => {
                    searchBox.value = item.textContent;
                    suggestionsContainer.innerHTML = "";
                    fetchWeather(searchBox.value);
                });
            });
        } catch {
            suggestionsContainer.innerHTML = "<div class='suggestion'>No results found</div>";
        }
    });

    searchBtn.addEventListener("click", () => {
        const city = searchBox.value.trim();
        if (city) fetchWeather(city);
    });

    searchBox.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const city = searchBox.value.trim();
            if (city) fetchWeather(city);
        }
    });

    locationBtn.addEventListener("click", () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchWeather(`${latitude},${longitude}`);
                },
                () => showError("Location access denied. Please search manually."),
                { enableHighAccuracy: true }
            );
        } else {
            showError("Geolocation is not supported by your browser.");
        }
    });
});