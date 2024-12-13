document.getElementById("Contact_page").addEventListener("click", function()
{
  window.location.href = "Contact.html"
})  
document.getElementById("Find_btn").addEventListener('click', function () {
  let city = document.getElementById("serch_input").value;
  fetchWeatherData(city);
});

document.getElementById("serch_input").addEventListener("keyup", function () {
  let city = document.getElementById("serch_input").value;
  fetchWeatherData(city);
});


fetchWeatherData("Nasr City");
let forecastData = [];
let data = [];

// Function to Fetch Weather Data
async function fetchWeatherData(city) {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=261005240f014b7aae4102254241112&q=${city}&days=3`);
    if (response.ok) {
      data = await response.json();
      forecastData = data.forecast.forecastday; // Store forecast data globally
      displayCurrentDay(data);
      displayNextDay(1); // Tomorrow
      displayNextDay(2); // Day after tomorrow
    }
}

// Display Current Day
function displayCurrentDay(data) {
  let today = forecastData[0]; // Today is always index 0
  let dateObject = new Date(today.date);
  let dayName = dateObject.toLocaleDateString("en-US", { weekday: 'long' });
  let day = dateObject.getDate();
  let monthName = dateObject.toLocaleDateString("en-US", { month: 'long' });

  let currentHTML = `
    <div class="card main_colour text-white shadow">
      <div id="Current-Date" class="d-flex justify-content-between p-3 fw-bolder">
        <small class="text-white fs-4 me-auto ms-4">${dayName}</small>
        <small class="text-white fs-4 ms-auto me-4">${day} ${monthName}</small>
      </div>
      <div class="card-header bg-body-table">
        <p class="City-Name fs-3 ms-5 colour_data">${data.location.name}</p>
        <p class="City-Temp fs-1 text-center fw-bolder">${data.current.temp_c}<sup>o</sup>c</p>
        <img src="${today.day.condition.icon}" class="card-img-top bg-body-table w-50 mt-5" height="80px" alt="Weather icon">
        <div class="card-body">
          <h5 class="Weather-Type fs-3 ms-3">${today.day.condition.text}</h5>
        </div>
      </div>
    <div class="d-flex justify-content-center mt-3 p-3">
          <div class="detail-condition col-3 d-flex align-items-center">
             <img src="Images/icon-umberella.png" alt="Umbrella">
              <span class="ms-1 fs-4">20%</span>
          </div>
          <div class="detail-condition col-3 d-flex align-items-center">
            <img src="Images/icon-wind.png" alt="Wind">
            <span class="ms-1 fs-4">18km/hr</span>
          </div>
          <div class="detail-condition col-3 d-flex align-items-center">
            <img src="Images/icon-compass.png" class="ms-4" alt="Compass">
          <span class="ms-2 fs-4">East</span>
          </div>
        </div>
      </div>
          `;
  document.getElementById("Current_Day").innerHTML = currentHTML;
}

// Display Forecast for Tomorrow or the Day After
function displayNextDay(index) {
  if (forecastData[index]) {
    let forecast = forecastData[index];
    let dateObject = new Date(forecast.date);
    let dayName = dateObject.toLocaleDateString("en-US", { weekday: 'long' });
    let day = dateObject.getDate();
    let monthName = dateObject.toLocaleDateString("en-US", { month: 'long' });

    let nextDayHTML = `
      <div class="card main_colour text-white shadow">
        <div id="Current-Date" class="d-flex justify-content-between p-3 fw-bolder">
          <small class="text-white fs-4 me-auto ms-4">${dayName}</small>
          <small class="text-white fs-4 ms-auto me-4">${day} ${monthName}</small>
        </div>
        <div class="card-header bg-body-table">
        <p class="City-Name fs-3 ms-5 colour_data">${data.location.name}</p>
        <p class="City-Temp w-100 fs-3 text-center fw-bolder">${forecast.day.maxtemp_c}<sup>o</sup>c</p>
          <p class="City-Temp w-100 fs-3 text-center fw-bolder">${forecast.day.avgtemp_c}<sup>o</sup>c</p>
          <img src="${forecast.day.condition.icon}" class="card-img-top bg-body-table w-50" height="80px" alt="Weather icon">
          <div class="card-body">
            <h5 class="Weather-Type fs-3 ms-3">${forecast.day.condition.text}</h5>
          </div>
        </div>
       <div class="d-flex justify-content-center mt-3 p-3">
          <div class="detail-condition col-3 d-flex align-items-center">
             <img src="Images/icon-umberella.png" alt="Umbrella">
              <span class="ms-1 fs-4">20%</span>
          </div>
          <div class="detail-condition col-3 d-flex align-items-center">
            <img src="Images/icon-wind.png" alt="Wind">
            <span class="ms-1 fs-4">18km/hr</span>
          </div>
          <div class="detail-condition col-3 d-flex align-items-center">
            <img src="Images/icon-compass.png" class="ms-4" alt="Compass">
          <span class="ms-2 fs-4">East</span>
          </div>
        </div>
      </div>
            
      `;
    if (index === 1) {
      document.getElementById("Tomorrow_weather").innerHTML = nextDayHTML;
    } else if (index === 2) {
      document.getElementById("After_nextday").innerHTML = nextDayHTML;
    }
  }
}


