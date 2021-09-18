// <--ALL SELECTORS-->
const searchBtn = document.querySelector('#searchBtn');
const swapBtn = document.querySelector('#swap');
const closeFlash = document.querySelector('#closeFlash');
const flashMsg = document.querySelector('h1');
let input_from = document.querySelector('#from');
let input_to = document.querySelector('#to');

// <--ALL VARIABLE DECLARATIONS-->

// <--FUNCTIONS & EVENT LISTENERS-->

const hideFlash = function () {
    flashMsg.classList.add('hidden')
}

closeFlash.addEventListener('click', hideFlash)

const swapInput = function () {
    let fromValue = input_from.value,
        toValue = input_to.value;
    if (!fromValue && !toValue) {
        alert('Input is empty, Type something')
    } else {
        input_from.value = toValue;
        input_to.value = fromValue;
    }
};
swapBtn.addEventListener('click', swapInput)