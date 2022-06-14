//alert('This works!');
//backticks let us do f strings - called template literal in js
/*
element.style {
    white-space: pre;
}
let calcDescription = `current: ${currentResult}

valid syntax`;  

typeof
*/

const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];

function getUserNumberInput() {
    return parseInt(userInput.value);
}

function printOutput(operator, resultBeforeCalc, currentNum) {
    const calcDescription = `${resultBeforeCalc} ${operator} ${currentNum}`;
    outputResult(currentResult, calcDescription);
}

//creating an object
function writeToLog(operator, prevResult, currentNum, result) {
    const logEntry = {
        operation: operator,
        prevResult: prevResult,
        currentNum: currentNum,
        result: result
    }; 
    logEntries.push(logEntry);
    console.log(logEntries);
}

function calcResult(calcType) {
    const enteredNum = getUserNumberInput();
    const initalResult = currentResult;
    if (calcType == 'ADD') {
        currentResult += enteredNum;
        mathOperator = '+';
    } else if (calcType == 'SUBTRACT') {
        currentResult -= enteredNum;
        mathOperator = '-';
    } else if (calcType == 'MULTIPLY') {
        currentResult *= enteredNum;
        mathOperator = '*';
    } else if (calcType == 'DIVIDE') {
        currentResult /= enteredNum;
        mathOperator = '/';
    } 
    printOutput(mathOperator, initalResult, enteredNum);
    writeToLog(calcType, initalResult, enteredNum, currentResult);
}

function add() {
    calcResult('ADD');
}

function subtract() {
    calcResult('SUBTRACT');
}

function multiply() {
    calcResult('MULTIPLY');
}

function divide() {
    calcResult('DIVIDE');
}

addBtn.addEventListener('click', add);
subtractBtn.addEventListener('click', subtract);
multiplyBtn.addEventListener('click', multiply);
divideBtn.addEventListener('click', divide);
