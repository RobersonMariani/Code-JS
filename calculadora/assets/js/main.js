const display = document.querySelector('#display');

document.addEventListener('click', function (e) {
    const el = e.target;
    if (el.classList.contains('btn')) {
        let value = el.innerText || '';
        const result = checkValueBtn(value, display);
        result ? display.value = result : display.value = '';
    }
})

function checkValueBtn(value, display) {
    if (value === 'C' || value === 'CE') {
        return '';
    } else if (value === '=') {
        try {
            return getOperation(display.value);
        } catch (err) {
            return alert(err);
        };
    } else if (value == '<<') {
        return display.value.slice(0, -1);
    } else if (value == '²√x') {
        return Math.sqrt(Number(display.value));
    } else if (value == 'x2') {
        return Number(display.value) ** 2;
    } else {
        return display.value += value;
    }
}

function getOperation(...value) {
    console.log(value)
    let expressao = value[0];
    let splitValues = expressao.split(/(\*\*|[+\-*/%])/);
    let numberBefore = Number(splitValues[0]);
    let operador = splitValues[1];
    let numberAfter = Number(splitValues[2]);
    return calculator(numberBefore, operador, numberAfter);
}

function calculator(numberBefore, operador, numberAfter) {
    switch (operador) {
        case '+':
            return numberBefore + numberAfter;
        case '-':
            return numberBefore - numberAfter;
        case '*':
            return numberBefore * numberAfter;
        case '**':
            return Math.pow(numberBefore, numberAfter);
        case '/':
            if (numberBefore === 0 || numberAfter === 0) {
                throw new Error("Divisão por zero não permitida.");
            }
            return numberBefore / numberAfter;
        case '%':
            return (numberBefore * numberAfter) / 100;
        default:
            throw new Error("Operação inválida.");
    }
}

// Mapeamento de teclas para a calculadora 
document.addEventListener('keydown', handleKeyPress);
function handleKeyPress(event) {
    const keyName = event.key;
    switch (keyName) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
        case '/':
        case '*':
        case '-':
        case '+':
        case '%':
        case '.':
        case '(':
        case ')':
            display.value += keyName;
            break;
        case 'Enter':
            try {
                return display.value = getOperation(display.value);
            } catch (err) {
                return alert(err);
            };
        case 'Backspace':
            display.value = display.value.slice(0, -1);
            break;
    }
}
