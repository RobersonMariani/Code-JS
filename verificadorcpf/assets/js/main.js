const btnValidar = document.querySelector('.btnValidar');

btnValidar.addEventListener('click', function (e) {
    e.preventDefault();
    const inputCpf = document.querySelector('#cpf').value;
    validateCpf(inputCpf);
});

function validateCpf(inputCpf) {
    const cpf = inputCpf.replace(/\D+/g, '');
    if (cpf == '') return alert("Por favor, informe o CPF!");
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return alert("Por favor, digite um CPF válido!");
    let arrayCpf = Array.from(cpf).slice(0, 9);

    //Pega o primeiro digito
    let firstDigit = calculateDigit(arrayCpf, 10);
    firstDigit = (11 - firstDigit) < 10 ? (11 - firstDigit) : 0;
    arrayCpf.push(firstDigit);

    //Pega o segundo digito
    let secondDigit = calculateDigit(arrayCpf, 11);
    secondDigit = (11 - secondDigit) < 10 ? (11 - secondDigit) : 0;
    arrayCpf.push(secondDigit);

    //Verifica os digitos com o cpf digitado, se bater o CPF é válido se não é inválido
    let verifiedCpf = arrayCpf.join('');
    console.log(verifiedCpf)
    verifiedCpf === cpf ? alert("CPF válido") : alert("CPF inválido");
}

function calculateDigit(cpf, multiplier) {
    return cpf.map((digit, index) => digit * (multiplier - index))
        .reduce((total, result) => total + result, 0) % 11;
}