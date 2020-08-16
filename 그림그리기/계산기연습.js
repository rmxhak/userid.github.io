const result = document.querySelector(".js-result");
const reset = document.querySelector(".js-reset");
const equals = document.querySelector(".js-equals");
const numbers = Array.from(document.querySelectorAll(".js-number"));
const operations = Array.from(document.querySelectorAll(".js-operation"));


let firstNumber = "",
    secondNumber = "",
    firstDone, secondDone,
    currentNumber;

function doOperation(){
    const InvalueA = parseInt(firstNumber);
    const InvalueB = parseInt(secondNumber);
    switch(currentNumber){
        case "+":
            return InvalueA + InvalueB;
        case "-":
            return  InvalueA - InvalueB;
        case "*":
            return  InvalueA * InvalueB;
        case "/":
            return  InvalueA / InvalueB;
        default:
           return;
       
    }
}

function calculate(){
    const operation = doOperation()
    result.innerHTML = operation;
    firstNumber = operation;
    secondNumber = "";
    secondDone = false;
}


    function handleNumber(e){
    const clickNumber = e.target.value;
    if(!firstDone){
        firstNumber = firstNumber + clickNumber;
        result.innerHTML = firstNumber;
    } else {
        secondNumber = secondNumber + clickNumber;
        result.innerHTML = secondNumber;
        secondDone = true;
    }
}

function handleOperation(e){
    const clickOperation = e.target.value;
    if(!firstDone){
        firstDone = true;
    }
    if(firstDone && secondDone){
        calculate()
    }
    currentNumber = clickOperation;
}

function resetClick(){
    firstNumber = "";
    secondNumber = "";
    firstDone = false;
    secondDone = false;
    currentNumber = null;
    result.innerHTML = "0";
}

function equalsClick(){
    if(firstDone && secondDone){
        calculate();
    }
}

numbers.forEach(function(number){
    number.addEventListener("click", handleNumber)
})
operations.forEach(function(operation){
    operation.addEventListener("click", handleOperation)
})
reset.addEventListener("click", resetClick)
equals.addEventListener("click", equalsClick)