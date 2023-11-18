function createParagraph() {
    let p = document.createElement('p');
    return p;
}

function calcularimc(peso, altura) {
    const imc = peso / (altura * altura);
    const imctotal = imc.toFixed(1);
    if (imc <= 18.5) return `Seu IMC é ${imctotal} Abaixo do Peso`;
    if (imc <= 24.9) return `Seu IMC é ${imctotal} Peso Normal`;
    if (imc <= 29.9) return `Seu IMC é ${imctotal} Acima do Peso`;
    if (imc <= 34.99) return `Seu IMC é ${imctotal} Obesidade Grau I`;
    if (imc <= 39.99) return `Seu IMC é ${imctotal} Obesidade Grau II (severa)`;
    if (imc > 40) return `Seu IMC é ${imctotal} Obesidade Grau III (mórbida)`;
}

function getResult(peso, altura) {
    const resultDiv = document.querySelector("#result");
    resultDiv.innerHTML = '';
    let paragraph = createParagraph();
    if (!peso && !altura) {
        paragraph.className = 'erro';
        paragraph.innerHTML = `Digite um valor válido`;
    } else if (!peso) {
        paragraph.className = 'erro';
        paragraph.innerHTML = `Peso Inválido`;
    } else if (!altura) {
        paragraph.className = 'erro';
        paragraph.innerHTML = `Altura Inválida`;
    } else {
        paragraph.className = 'sucesso';
        paragraph.innerHTML = `${calcularimc(peso, altura)}`
    }
    resultDiv.appendChild(paragraph);
}