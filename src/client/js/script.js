// <--ALL THE API's AND INFORMATION RELATED API's-->
/* 
1. WeatherBit API
https://www.weatherbit.io/api/weather-forecast-16-day
*/
const weatherbit_base_URL = 'https://api.weatherbit.io/v2.0/forecast/daily';
const weatherbit_api_key = '5743ac4e4b894a8eaf444a7ea695bb16';

/* 
1. Pixabay API
https://pixabay.com/api/docs/
*/
const pixabay_base_URL = 'https://pixabay.com/api/';
const pixabay_api_key = '22995546-161a66f2748e30442e887ff40';

// <--ALL SELECTORS-->
const searchBtn = document.querySelector('#searchBtn');
const swapBtn = document.querySelector('#swap');
const closeFlash = document.querySelector('#closeFlash');
const flashMsg = document.querySelector('h1');
const weatherForcast = document.querySelector('.weatherForcast');
const searchImageTag = document.querySelector('#searchImageTag');
let input_from = document.querySelector('#from');
let input_to = document.querySelector('#to');

// <--ALL VARIABLE DECLARITION-->
const imageSearchTerms = ['forest', 'mountains', 'beach', 'adventure', 'streets', 'hotels', 'highways']

// <--FUNCTIONS & EVENT LISTENERS-->

//Flash Message Logic
const hideFlash = () => flashMsg.classList.add('hidden');
closeFlash.addEventListener('click', hideFlash);

// Swap Button Logic
const InputValidation = () => {
    let fromValue = input_from.value,
        toValue = input_to.value;

    if (!fromValue || !toValue) {
        alert('Input area is empty, kindly add a city!')
    } else {
        input_from.value = toValue;
        input_to.value = fromValue;
    }
};
swapBtn.addEventListener('click', InputValidation)

function test() {
    const weatherbit_final_URL = `${weatherbit_base_URL}?key=${weatherbit_api_key}&city=${input_to.value}`
    let pixabay_final_URL = `${pixabay_base_URL}?key=${pixabay_api_key}&?q=${imageSearchTerms[Math.trunc(Math.random() * imageSearchTerms.length)]}&image_type=photo&per_page=5`;
    console.log(pixabay_final_URL)

    getResponse(pixabay_final_URL)
        .then((allData) => {
            let searchImage = allData.hits[2].largeImageURL;
            searchImageTag.setAttribute('src', searchImage)
        })
        .then(() => getData("/all"));

    getResponse(weatherbit_final_URL)
        .then((allData) => {
            const { city_name, lon, lat, timezone, country_code } = allData
            // console.log(`${city_name} => ${country_code} => ${timezone} => ${Math.trunc(lon)} => ${Math.trunc(lat)}`)
            const { valid_date, temp } = allData.data[0];
            const { description } = allData.data[0].weather;
            // console.log(`${valid_date} => ${description} => ${temp}`);
            weatherForcast.append(`City Name = ${city_name}, Longitude = ${lon}, Latitude = ${lat}, Country Code = ${country_code}, Todays Date = ${valid_date}, Temperature = ${temp}, Climate = ${description}`)
        })
        .then(() => getData("/all"));
}

// QueryWeather Service
async function getResponse(finalURL) {
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
};

const getData = async (url) => {
    // const response = await fetch(url);
    try {
        // const allData = await response.json();
        // console.log(allData);
    } catch (err) {
        console.log('error', err)
    }
}

searchBtn.addEventListener('click', () => {
    let fromValue = input_from.value,
        toValue = input_to.value;

    if (!fromValue || !toValue) {
        alert('Input area is empty, add a city!')
    } else {
        test()
    }
})