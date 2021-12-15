
const container = document.getElementById('main-container');
container.addEventListener('click', e => {
    const numbers = "0123456789.";
    if (e.target.classList.contains('row')) return;
    if (numbers.includes(e.target.id)) {
        console.log(e.target.textContent);
        e.target.classList.remove('active');
    }
});
container.addEventListener('transitionend', e => {
    if (e.propertyName = 'background-color') {
        let element = e.path[0];
        element.classList.remove('active');
    }
});

document.addEventListener('keypress', e => {
    
    if (e.code.substring(0, 5) == 'Digit') {
        let text=e.code.substring(5);
        clickKey(text);
        processKey(text);
    }
    else if (e.code.substring(0, 6) == 'Numpad') {
        console.log(e.code);
        clickKey(e.code.substring(6));
    }
});

function processKey(key){
    let display=document.getElementById('display');
    const options = { style: 'decimal'};
    const numberFormat1 = new Intl.NumberFormat('en-US',options);
    const currentNumber=parseInt(display.textContent.replaceAll(',',''));
    console.log(currentNumber);
    display.textContent=numberFormat1.format(`${currentNumber}${key}`);
}
function clickKey(keyID) {
    const key = document.getElementById(keyID);
    if (key == null) return;
    key.click();
    key.classList.add('active');
}