// <--ALL THE API's AND INFORMATION RELATED API's-->

/* 
1. WeatherBit API
https://www.weatherbit.io/api/weather-forecast-16-day
*/
const weatherbit_base_URL = 'https://api.weatherbit.io/v2.0/forecast/daily';
const weatherbit_api_key = '5743ac4e4b894a8eaf444a7ea695bb16';

// <--ALL SELECTORS-->
const searchBtn = document.querySelector('#searchBtn');
const swapBtn = document.querySelector('#swap');
const closeFlash = document.querySelector('#closeFlash');
const flashMsg = document.querySelector('h1');
let input_from = document.querySelector('#from');
let input_to = document.querySelector('#to');

// <--ALL VARIABLE DECLARITION-->
let cityName = '';

// <--FUNCTIONS & EVENT LISTENERS-->
const hideFlash = () => flashMsg.classList.add('hidden');
closeFlash.addEventListener('click', hideFlash);

const swapInput = () => {
    let fromValue = input_from.value,
        toValue = input_to.value;

    if (!fromValue || !toValue) {
        alert('Input area is empty, kindly add a City!')
    } else {
        input_from.value = toValue;
        input_to.value = fromValue;
    }
};
swapBtn.addEventListener('click', swapInput)

function test() {
    const weatherbit_final_URL = `${weatherbit_base_URL}?key=${weatherbit_api_key}&city=${cityName}`

    getForcast(weatherbit_final_URL)
        .then((allData) => {
            const temperature = allData.main.temp;
            const { name, coord, main, sys, weather } = allData;
            const { lon, lat } = coord;
            const { temp_min, temp_max, humidity } = main;
            const { country } = sys;
            save("/create", {
                temperature: temperature,
                name: name,
                coord: coord,
                main: main,
                sys: sys,
                weather: weather,
                lon: lon,
                lat: lat,
                temp_min: temp_min,
                temp_max: temp_max,
                humidity: humidity,
                country: country
            });
        })
        .then(() => getData("/all"));
}

// QueryWeather Service
async function getForcast(finalURL) {

    const res = await fetch(finalURL);
    const weatherData = await res.json();
    return weatherData;
}

// save function,
const save = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    // const saveResult = await res.json();
};

const getData = async (url) => {
    const response = await fetch(url);
    try {
        console.log(response);

    } catch (err) {
        console.log('error', err)
    }
}