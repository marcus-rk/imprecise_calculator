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
    button.addEventListener('click', () => {
        const calculatorValue = button.innerText;
        addValue(calculatorValue)
    })
});

// Function to calculate the result of the input string
const calculate = (inputString) => {
    // allow for clearing on '=' press
    if (needClear) {
        needClear = false;
        return '';
    }

    // if no input string, don't show '=' and return empty string
    if (inputString.length === 0)
        return '';

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
    // otherwise return the input string
    needClear = true;
    return hasPlus ? `${inputString}=${sum}` : inputString;
}

// Function to handle button clicks and update the input field
const addValue = (calculatorValue) => {
    const currentInputValue = inputElement.value;
    const lastIndex = currentInputValue.length - 1;
    const lastIndexValue = currentInputValue[lastIndex];
    const isNumber = NUMBER_REGEX.test(calculatorValue);

    let newInputValue = '';

    switch (true) {
        case calculatorValue === '0':
            if (lastIndexValue !== '+' && lastIndex !== -1)
                newInputValue = currentInputValue + calculatorValue;
            else
                newInputValue = currentInputValue;
            break;
        case isNumber:
            newInputValue = currentInputValue + calculatorValue;
            break;
        case calculatorValue === '+':
            hasPlus = true;
            if (lastIndexValue !== '+' && lastIndex !== -1)
                newInputValue = currentInputValue + calculatorValue;
            else
                newInputValue = currentInputValue;
            break;
        case calculatorValue === '=':
            newInputValue = calculate(currentInputValue);
            break;
    }

    // Update the input field with the new value
    inputElement.value = newInputValue;
}