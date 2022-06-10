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

function add() {
    const enteredNum = getUserNumberInput();
    const initalResult = currentResult;
    currentResult += enteredNum; //+ +userInput.value
    printOutput('+', initalResult, enteredNum);
    writeToLog('ADD', initalResult, enteredNum, currentResult);
}

function subtract() {
    const enteredNum = getUserNumberInput();
    const initalResult = currentResult;
    currentResult -= enteredNum; //+ +userInput.value
    printOutput('-', initalResult, enteredNum);
    writeToLog('SUBTRACT', initalResult, enteredNum, currentResult);
}

function multiply() {
    const enteredNum = getUserNumberInput();
    const initalResult = currentResult;
    currentResult *= enteredNum; //+ +userInput.value
    printOutput('*', initalResult, enteredNum);
    writeToLog('MULTIPLY', initalResult, enteredNum, currentResult);
}

function divide() {
    const enteredNum = getUserNumberInput();
    const initalResult = currentResult;
    currentResult /= enteredNum; //+ +userInput.value
    printOutput('/', initalResult, enteredNum);
    writeToLog('DIVIDE', initalResult, enteredNum, currentResult);
}

addBtn.addEventListener('click', add);
subtractBtn.addEventListener('click', subtract);
multiplyBtn.addEventListener('click', multiply);
divideBtn.addEventListener('click', divide);
