
class Calculator {
    constructor(rootElementName) {
        this.container = document.getElementById(rootElementName);
        this.registerEvents();
        this.firstTermEntered = false;
        this.operation = null;
    }
    registerEvents() {
        this.container.addEventListener('click', e => {
            const numbers = "0123456789.";
            if (e.target.classList.contains('row')) return;
            if (numbers.includes(e.target.id)) {
                console.log(e.target.textContent);
            }
        });

        this.container.addEventListener('transitionend', e => {
            if (e.propertyName == 'background-color') {
                let element = e.path[0];
                element.classList.remove('active');
            }
        });

        document.addEventListener('keypress', e => {
            let textKey;
            console.log(e);
            if (e.code.substring(0, 5) == 'Digit') {
                textKey = e.code.substring(5);
            }
            else if (e.code.substring(0, 6) == 'Numpad') {
                if (e.code == 'NumpadAdd') textKey = 'Add';
                else if (e.code == 'NumpadMultiply') textKey = 'Multiply';
                else if (e.code == 'NumpadSubtract') textKey = "Subtract";
                else if (e.code == 'NumpadDivide') textKey = "Divide";
                else if (e.code == 'NumpadEnter') textKey = "Equal";
                else
                    textKey = e.code.substring(6);
            }
            else if (e.code == 'KeyC') {
                textKey = 'C';
            }
            if (textKey) {
                this.clickKey(textKey);
                this.processKey(textKey);
            }
        });
    }
    processKey(key) {
        console.log(`Procesing key ${key}`);
        let display = document.getElementById('display');
        if (display.textContent.length > 11) return;
        if (key == 'C') {
            display.textContent = '0';
            this.firstTermEntered = false;
            this.firsTerm = 0;
            this.secondTerm = 0;
            return;
        }
        if (key == 'Add' || key == 'Subtract' || key == 'Multiply' || key == 'Divide') {
            if (this.firstTermEntered == false) {
                this.firsTerm = display.textContent;
                display.textContent = '0';
                this.firstTermEntered = true;
                if (key == 'Add') this.operation = this.sum;
                else if (key == 'Subtract') this.operation = this.subtract;
                else if (key == 'Multiply') this.operation = this.multiply;
                else if (key == 'Divide') this.operation = this.divide;
                return;
            }
            else {
                this.secondTerm = display.textContent;
                display.textContent = this.format(this.operation(this.firsTerm, this.secondTerm));
                return;
            }
        }
        else if (key == 'Equal') {
            if (this.firstTermEntered) {
                this.secondTerm = display.textContent;
                display.textContent = this.format(this.operation(this.firsTerm, this.secondTerm));
                return;
            }
            else return;
        }
        const options = { style: 'decimal' };
        const numberFormat1 = new Intl.NumberFormat('en-US', options);
        const currentNumber = parseInt(display.textContent.replaceAll(',', ''));
        display.textContent = numberFormat1.format(`${currentNumber}${key}`);
    }
    format(number) {
        const options = { style: 'decimal' };
        const numberFormat1 = new Intl.NumberFormat('en-US', options);
        return numberFormat1.format(`${number}`);
    }

    sum(first, second) {
        let f = parseInt(first.replaceAll(',', ''));
        let s = parseInt(second.replaceAll(',', ''));
        return f + s;
    }
    multiply(first, second) {
        let f = parseInt(first.replaceAll(',', ''));
        let s = parseInt(second.replaceAll(',', ''));
        return f * s;
    }
    divide(first, second) {
        let f = parseInt(first.replaceAll(',', ''));
        let s = parseInt(second.replaceAll(',', ''));
        return f / s;
    }
    subtract(first, second) {
        let f = parseInt(first.replaceAll(',', ''));
        let s = parseInt(second.replaceAll(',', ''));
        return f - s;
    }
    clickKey(keyID) {
        console.log(`Clicking ${keyID}`);
        const key = document.getElementById(keyID);
        if (key == null) return;
        key.click();
        key.classList.add('active');
    }
};
let calculator = new Calculator('main-container');


