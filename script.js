class Calculator {
    constructor(currentValue, previousValue) {
        this.currentValue = currentValue;
        this.previousValue = previousValue;
        this.currentOperand = '';
        this.previousOperand = '';
        this.operator = '';
    }

    clear() {
        this.currentValue.innerText = '';
        this.previousValue.innerText = '';
        this.currentOperand = '';
        this.previousOperand = '';
        this.operator = '';
        this.display();
    }

    delete() {
        let array = this.currentOperand.split('');
        this.currentOperand = array.slice(0, -1).join('');
        this.display();
    }

    addNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand + number;
        this.display();
    }

    addOperator(operator) {
        if(!this.currentOperand) {
            if(operator !== '-') {
                return;
            } else {
                this.currentOperand = operator;
                this.display();
                return;
            } 
        }

        if(this.currentOperand.length === 1 && this.currentOperand.includes('-')) {
            return;
        } else {
            if(this.operator) {
                this.compute();
            }

            this.operator = operator;
            this.previousOperand = this.currentOperand;
            this.currentOperand = '';
            this.display();
        }
    }
    
    compute() {
        if(!this.previousOperand) return;
        let output;
        switch(this.operator) {
            case '÷':
            case '/':
                output = this.previousOperand / this.currentOperand;
                break;
            case '✕':
            case '*':
                output = this.previousOperand * this.currentOperand;
                break;
            case '-':
                output = this.previousOperand - this.currentOperand;
                break;
            case '+':
                output = parseFloat(this.previousOperand) + parseFloat(this.currentOperand);
                break;    
            default:
                break;     
        }

        this.previousValue.innerText = this.currentValue.innerText;
        this.currentOperand = output.toString();
        this.previousOperand = '';
        this.operator = '';

        this.display();
    }

    display() {
        this.currentValue.innerText = this.previousOperand + this.operator + this.currentOperand;
    }
}

const outputCurrent = document.querySelector('.output__current');
const outputPrevious = document.querySelector('.output__previous');

const numberButtons = document.querySelectorAll('.calculator__number');
const operatorButtons = document.querySelectorAll('.calculator__operator');
const equalButton = document.querySelector('.calculator__equal');
const clearButton = document.querySelector('.calculator__clear');
const deleteButton = document.querySelector('.calculator__delete');

const calculator = new Calculator(outputCurrent, outputPrevious);

numberButtons.forEach(numberButton => numberButton.addEventListener('click', evt => {
    calculator.addNumber(evt.currentTarget.innerText);
}));

operatorButtons.forEach(operatorButton => operatorButton.addEventListener('click', evt => {
    calculator.addOperator(evt.currentTarget.innerText);
}));

clearButton.addEventListener('click', () => {
    calculator.clear();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
});

equalButton.addEventListener('click', () => {
    calculator.compute();

});

window.addEventListener('keypress', (evt) => {
    console.log(evt);
    switch(evt.key) {
        case 'Enter':
            calculator.compute();
            break;
        case 'Delete':
            calculator.delete();
            break;
        case '/':
        case '*':
        case '-':
        case '+':
            calculator.addOperator(evt.key);
            break;
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '.':
            calculator.addNumber(evt.key);
            break;
        default:
            break;
    }
});