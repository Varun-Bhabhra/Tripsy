// <--ALL THE API's AND INFORMATION RELATED API's-->

const moment = require("moment");

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
const outputSection = document.querySelector('#output');
const details = document.querySelector('#details');
const searchImageTag = document.querySelector('#searchImageTag');
let input_from = document.querySelector('#from');
let input_to = document.querySelector('#to');

// <--ALL VARIABLE DECLARITION-->
const imageSearchTerms = ['scenery', 'lighthouse', 'travel']
const monthNames = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

// <--FUNCTIONS & EVENT LISTENERS-->

// Date Function
let d = new Date();
let todayDate = `${d.getFullYear()}-${monthNames[d.getMonth()]}-${d.getDate()}`;

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
swapBtn.addEventListener('click', InputValidation);

// Fetch Data Function
function test() {
    const weatherbit_final_URL = `${weatherbit_base_URL}?key=${weatherbit_api_key}&city=${input_to.value}`
    let pixabay_final_URL = `${pixabay_base_URL}?key=${pixabay_api_key}&?q=${imageSearchTerms[Math.trunc(Math.random() * imageSearchTerms.length)]}&image_type=photo&per_page=50`;
    // console.log(pixabay_final_URL)

    // Responce Data from Pixabay [Image]
    getResponse(pixabay_final_URL)
        .then((allData) => {
            let searchImage = allData.hits[Math.trunc(Math.random() * 50)].largeImageURL;
            searchImageTag.setAttribute('src', searchImage);
            searchImageTag.classList.add('border-4');
            searchImageTag.classList.add('border-gray-800');
            searchImageTag.classList.remove('ml-80');
        })
        .then(() => getData("/all"));

    // Responce Data from Weatherbit [Weather Data]
    getResponse(weatherbit_final_URL)
        .then((allData) => {

            const { city_name, lon, lat, country_code } = allData;
            const { valid_date, temp } = allData.data[0];
            const { description } = allData.data[0].weather;
            const APIData = allData.data;
            // save("/create", {
            //     city_name: city_name,
            //     lon: lon,
            //     lat: lat,
            //     country_code: country_code,
            //     valid_date: valid_date,
            //     temp: temp,
            //     description: description
            // })

            const last_date = moment().add(7, 'days').format('YYYY-MM-DD');
            let forcast = APIData.filter(item => item.valid_date > todayDate && item.valid_date <= last_date);

            console.log(details.childNodes);
            const detailsChilds = details.childNodes;
            if (detailsChilds.length === 12) {
                for (let j = 0; j <= 12; j++) {
                    console.log(details.childNodes)
                    details.removeChild(details.childNodes[0])
                }
            }

            // Creating and Appending City name and Latitude and longitude
            const nameCode = document.createElement('SPAN');
            nameCode.setAttribute('class', 'nameCode text-yellow-200 text-7xl items-center mx-auto');
            const latlon = document.createElement('SPAN');
            latlon.setAttribute('class', 'latlon text-gray-200 text-lg mx-auto my-2');

            nameCode.append(`${city_name}, ${country_code}`)
            latlon.append(`${lon} / ${lat}`);

            details.appendChild(nameCode);
            details.appendChild(latlon);

            for (let i = 0; i <= 6; i++) {
                // Creating and Appending Weather Forcast of Next 7 days
                const detailsDiv = document.createElement('DIV');
                detailsDiv.setAttribute('class', 'flex text-gray-100 justify-around my-4 border-l-2 border-yellow-500');
                const dateSpan = document.createElement('SPAN');
                dateSpan.setAttribute('class', 'date')
                const tempSpan = document.createElement('SPAN');
                tempSpan.setAttribute('class', 'temperature')
                const detailsSpan = document.createElement('SPAN');
                detailsSpan.setAttribute('class', 'details');

                details.appendChild(detailsDiv);
                detailsDiv.appendChild(dateSpan);
                detailsDiv.append(tempSpan);
                detailsDiv.append(detailsSpan);

                dateSpan.append(`Date: ${forcast[i].valid_date}`)
                tempSpan.append(`${forcast[i].temp}°C`)
                detailsSpan.append(`${forcast[i].weather.description}`)
            }
        })
        .then(() => getData("/all"))
}

// Query Service
async function getResponse(finalURL) {
    const res = await fetch(finalURL);
    const weatherData = await res.json();
    return weatherData;
}

// Save function,
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
    // const response = await fetch(url);
    try {
        // const allData = await response.json();
        // console.log(allData);
    } catch (err) {
        console.log('error', err)
    }
}

// Search button Validation
searchBtn.addEventListener('click', () => {
    let fromValue = input_from.value,
        toValue = input_to.value;

    if (!fromValue || !toValue) {
        alert('Input area is empty, add a city!')
    } else {
        test()
    }
})