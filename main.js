// @Marcus Rappenborg Kjærsgaard, Makj0005
// https://nicklasdean.gitbook.io/ita2023-1.-semester/web-technology/12-js-dom-2

// Select all button elements and the input element
const allButtons = document.querySelectorAll("button");
const inputElement = document.querySelector('input');

// Regular expression to match numbers
const NUMBER_REGEX = /[0-9]/;

// Track calculator state
let needClear = false;
let hasPlus = false;

// Add click event listeners to all buttons
allButtons.forEach((button,index) => {
    const calculatorValue = button.innerText;
    // If the button represents a number (0-9) or '+', add a click event listener
    if (NUMBER_REGEX.test(calculatorValue) || calculatorValue === '+') {

        button.addEventListener('click', () => {
            addValueAndUpdate(calculatorValue);
        });
    } else {
        // operator '='
        button.addEventListener('click', () => {
            calculateAndUpdate();
        });
    }
});

// Add keypress event listeners to document
document.addEventListener('keypress', (event) => {
    const keyValue = event.key;

    if (NUMBER_REGEX.test(keyValue) || keyValue === '+') {
        addValueAndUpdate(keyValue);
    } else if (keyValue === '=' || keyValue === 'Enter') {
        calculateAndUpdate();
    }
});

const update = (newInputValue) => {
    inputElement.value = newInputValue;
}

// Function to calculate the result of the input string
const calculateAndUpdate = () => {
    // allow for clearing on '=' press
    if (needClear) {
        needClear = false;
        update('');
    }

    let inputString = inputElement.value;

    // if no input string, don't show '=' and return empty string
    if (inputString.length === 0)
        return;

    // remove '+' if last character
    if (inputString.endsWith('+')) {
        inputString = inputString.slice(0, -1);
    }

    // split on '+' to get numbers
    const inputStringArray = inputString.split("+");

    // calculate sum of numbers
    let sum = 0;
    for (const numberString of inputStringArray) {
        sum += parseInt(numberString);
    }

    // If the sum is divisible by 3 or 5, add one
    const isDividableThree = (sum % 3 === 0);
    const isDividableFive = (sum % 5 === 0);

    if (isDividableThree || isDividableFive)
        sum += 1;

    // Return the result if there are at least two numbers,
    // otherwise inputString stay the same
    needClear = true;

    if (hasPlus)
        update(`${inputString}=${sum}`);
    else
        update(inputString);
}

// Function to handle button clicks and update the input field
const addValueAndUpdate = (calculatorValue) => {
    const currentInputValue = inputElement.value;

    let newInputValue = '';

    // Check if calculatorValue is '0' or '+' and if last character is '+'
    const isZero = (calculatorValue === '0');
    const isPlus = (calculatorValue === '+');
    const lastIndexPlus = currentInputValue.endsWith('+');
    const isEmpty = (currentInputValue.length === 0);

    // do not add value if '0' or '+' is after '+' or if empty field.
    if ((isZero || isPlus) && (lastIndexPlus || isEmpty)) {
        newInputValue += currentInputValue; // no change
    } else {
        newInputValue = currentInputValue + calculatorValue;
    }

    // Update hasPlus
    if (isPlus) hasPlus = true;

    // Update input field with the new value
    update(newInputValue);
}