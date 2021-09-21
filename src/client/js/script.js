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
const date = document.querySelector('.date');
const temperature = document.querySelector('.temperature');
const details = document.querySelector('.details');
const nameCode = document.querySelector('.nameCode');
const latlon = document.querySelector('.latlon');
const searchImageTag = document.querySelector('#searchImageTag');
let input_from = document.querySelector('#from');
let input_to = document.querySelector('#to');

// <--ALL VARIABLE DECLARITION-->
const imageSearchTerms = ['scenery', 'lighthouse', 'travel']
// const monthNames = ["January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December"];

// let d = new Date();
// let date = `${d.getDate()}-${monthNames[d.getMonth()]}-${d.getFullYear()}`;

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
    let pixabay_final_URL = `${pixabay_base_URL}?key=${pixabay_api_key}&?q=${imageSearchTerms[Math.trunc(Math.random() * imageSearchTerms.length)]}&image_type=photo&per_page=50`;
    console.log(pixabay_final_URL)

    getResponse(pixabay_final_URL)
        .then((allData) => {
            let searchImage = allData.hits[Math.trunc(Math.random() * 50)].largeImageURL;
            searchImageTag.setAttribute('src', searchImage);
            searchImageTag.classList.add('border-4');
            searchImageTag.classList.add('border-gray-800');
            searchImageTag.classList.remove('ml-80');
        })
        .then(() => getData("/all"));

    getResponse(weatherbit_final_URL)
        .then((allData) => {
            const { city_name, lon, lat, timezone, country_code } = allData
            const { valid_date, temp } = allData.data[0];
            const { description } = allData.data[0].weather;

            nameCode.append(`${city_name}, ${country_code}`)
            latlon.append(`${lon} / ${lat}`);
            date.append(`Date: ${valid_date}`)
            temperature.append(`${temp}°C`)
            details.append(`${description}`)
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