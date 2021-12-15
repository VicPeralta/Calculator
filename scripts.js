
class Calculator {
    constructor(rootElementName) {
        this.container = document.getElementById(rootElementName);
        this.operators = ['Add', 'Subtract', 'Multiply', 'Divide', 'Equal'];
        this.registerEvents();
        this.firstTermEntered = false;
        this.operation = null;
        this.clearContent = false;
        this.MAX_NUMBER_DIGITS = 11;
        this.display = document.getElementById('display');
    }
    registerEvents() {
        this.container.addEventListener('click', e => {
            const numbers = "0123456789.";
            if (e.target.classList.contains('row')) return;
            if (numbers.includes(e.target.id)) {
                this.processKey(e.target.id);
            }
            else if (this.operators.includes(e.target.id)) {
                this.processKey(e.target.id);
            }
            else if (e.target.id == 'C') this.processKey('C');
        });

        this.container.addEventListener('transitionend', e => {
            if (e.propertyName == 'background-color') {
                let element = e.path[0];
                element.classList.remove('active');
            }
        });

        window.addEventListener('keydown', e => {
            let textKey;
            //console.log(e.code);
            if (e.code.substring(0, 5) == 'Digit') {
                textKey = e.code.substring(5);
            }
            else if (e.code.substring(0, 6) == 'Numpad') {
                if (e.code == 'NumpadAdd') textKey = 'Add';
                else if (e.code == 'NumpadMultiply') textKey = 'Multiply';
                else if (e.code == 'NumpadSubtract') textKey = "Subtract";
                else if (e.code == 'NumpadDivide') textKey = "Divide";
                else if (e.code == 'NumpadEnter') textKey = "Equal";
                else if (e.code == 'NumpadDecimal') textKey = ".";
                else textKey = e.code.substring(6);
            }
            else if (e.code == 'KeyC' || e.code == 'Escape') {
                textKey = 'C';
            }
            if (textKey) {
                this.clickKey(textKey);
                this.processKey(textKey);
            }
        });
    }
    processKey(key) {
        if (key == 'C') {
            console.log("Clearing");
            this.display.textContent = '0';
            this.clearState();
            return;
        }
        if (this.operators.includes(key)) {
            this.processOperator(key);
            return;
        }

        if (this.clearContent) {
            this.display.textContent = '';
            this.clearContent = false;
            this.display.textContent = key;
        }
        else {
            if (this.display.textContent.length > this.MAX_NUMBER_DIGITS) return;
            if (key == '.') {
                if (!this.display.textContent.includes('.'))
                    this.display.textContent += ".";
                return;
            }
            const currentNumber = parseFloat((this.display.textContent.replaceAll(',', '') + key));
            this.display.textContent = this.format(`${currentNumber}`);
        }
    }

    processOperator(key) {
        if (key == 'Add' || key == 'Subtract' || key == 'Multiply' || key == 'Divide') {
            console.log(`Operator: ${key}`);
            if (this.firstTermEntered == false) {
                console.log("Storing firstTerm");
                this.firsTerm = display.textContent;
                this.clearContent = true;
                this.firstTermEntered = true;
                this.setOperation(key);
                return;
            }
            else {
                console.log("Storing secondTerm");
                this.secondTerm = this.display.textContent;
                this.display.textContent = this.format(this.operation(this.firsTerm, this.secondTerm));
                console.log("Storing result as firstTerm");
                this.firsTerm = this.display.textContent;
                this.setOperation(key);
                this.firstTermEntered = true;
                this.clearContent = true;
                return;
            }
        }
        else if (key == 'Equal') {
            if (this.firstTermEntered) {
                this.secondTerm = display.textContent;
                this.display.textContent = this.format(this.operation(this.firsTerm, this.secondTerm));
                this.clearContent = true;
                this.firsTerm = 0;
                this.secondTerm = 0;
                this.firstTermEntered = false;
                return;
            }
            else return;
        }
    }

    clearState() {
        this.firstTermEntered = false;
        this.firsTerm = 0;
        this.secondTerm = 0;
        this.operation = null;
    }

    setOperation(key) {
        if (key == 'Add') this.operation = this.sum;
        else if (key == 'Subtract') this.operation = this.subtract;
        else if (key == 'Multiply') this.operation = this.multiply;
        else if (key == 'Divide') this.operation = this.divide;
    }

    format(number) {
        const options = { style: 'decimal' };
        const numberFormat1 = new Intl.NumberFormat('en-US', options);
        return numberFormat1.format(`${number}`);
    }

    sum(first, second) {
        let f = parseFloat(first.replaceAll(',', ''));
        let s = parseFloat(second.replaceAll(',', ''));
        console.log(`Returning:${f + s}`);
        return f + s;
    }

    multiply(first, second) {
        let f = parseFloat(first.replaceAll(',', ''));
        let s = parseFloat(second.replaceAll(',', ''));
        console.log(`Returning:${f * s}`);
        return f * s;
    }

    divide(first, second) {
        let f = parseFloat(first.replaceAll(',', ''));
        let s = parseFloat(second.replaceAll(',', ''));
        console.log(`Returning:${f / s}`);
        return f / s;
    }

    subtract(first, second) {
        let f = parseFloat(first.replaceAll(',', ''));
        let s = parseFloat(second.replaceAll(',', ''));
        console.log(`Returning:${f - s}`);
        return f - s;
    }

    clickKey(keyID) {
        const key = document.getElementById(keyID);
        if (key == null) return;
        //key.click();
        key.classList.add('active');
    }
};

let calculator = new Calculator('main-container');


