// import StringCalculator from './StringCalculator.js';
const StringCalculator = require('./stringCalculator');
const calculator = new StringCalculator()

function calculateSum() {
    const input = document.getElementById('numbers').value
    const resultElement = document.getElementById('result')
    const errorElement = document.getElementById('error')
    
    resultElement.textContent = ''
    errorElement.textContent = ''
    
    try {
        const sum = calculator.add(input)
        resultElement.textContent = "Sum of digits: ".concat(sum)
    } catch (error) {
        console.log(error.stack)
        errorElement.textContent = error.message
    }
}

document.getElementById('calculate-btn').addEventListener('click', calculateSum)

