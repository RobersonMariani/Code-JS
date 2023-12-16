class ValidateForm {
    constructor() {
        this.form = document.querySelector('.form');
        this.events();
    }

    events() {
        this.form.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const checkFields = this.validateFields();
        const checkPass = this.validatePasswords();

        if (checkFields && checkPass) {
            alert("Cadastro realizado com sucesso!");
            this.form.submit();
        }
    }

    validateFields() {
        let isValid = true;

        for (let textError of this.form.querySelectorAll('.text-error')) {
            textError.remove();
        }

        for (let field of this.form.querySelectorAll('.validate')) {
            const label = field.previousElementSibling.innerText.replace(/:/g, '');
            if (!field.value) {
                isValid = false;
                this.newError(field, `O campo ${label} não pode estar em branco`);
            }

            if (field.classList.contains('user')) {
                if (!this.validateUser(field)) isValid = false;
            }

            if (field.classList.contains('cpf')) {
                if (!this.validateCpf(field)) isValid = false;
            }
        }

        return isValid;
    }

    validateUser(field) {
        let isValid = true;
        const user = field.value;
        const regex = /^[a-zA-Z\d]+$/;

        if (!regex.test(user)) {
            this.newError(field, `Usuário deve contar apenas letras e/ou números`);
            isValid = false;
        }

        if (user.length < 3 || user.length > 12) {
            this.newError(field, `Quantidade de caracteres inválida para o usuário. Deve ter entre 3 a 12 caracteres.`);
            isValid = false;
        }

        return isValid;
    }

    validateCpf(field) {
        let isValid = true;
        const cpf = new ValidateCpf(field.value);

        if (!cpf.validateCpf()) {
            this.newError(field, 'CPF inválido!');
            isValid = false;
        }

        return isValid;
    }

    validatePasswords() {
        let isValid = true;
        const password = document.querySelector('#pass');
        const confirmPass = document.querySelector('#confirmPass');

        if (password.value !== confirmPass.value) {
            this.newError(password, 'As senhas devem ser iguais');
            this.newError(confirmPass, 'As senhas devem ser iguais');
            isValid = false;
        }

        if (password.value.length < 6 || password.value.length > 12) {
            this.newError(password, 'A senha deve ter entre 6 a 12 caracteres');
            isValid = false;
        }

        return isValid;
    }

    newError(field, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('text-error');
        field.insertAdjacentElement('afterend', div);
    }
}

const valida = new ValidateForm();

class ValidateCpf {
    constructor(inputCpf) {
        Object.defineProperty(this, 'cpf', {
            writable: false,
            enumerable: true,
            configurable: false,
            value: inputCpf.replace(/\D+/g, '')
        });
    }

    validateCpf() {
        let arrayCpf = Array.from(this.cpf).slice(0, 9);

        //Pega o primeiro digito
        let firstDigit = this.calculateDigit(arrayCpf, 10);
        firstDigit = (11 - firstDigit) < 10 ? (11 - firstDigit) : 0;
        arrayCpf.push(firstDigit);

        //Pega o segundo digito
        let secondDigit = this.calculateDigit(arrayCpf, 11);
        secondDigit = (11 - secondDigit) < 10 ? (11 - secondDigit) : 0;
        arrayCpf.push(secondDigit);

        //Verifica os digitos com o cpf digitado, se bater o CPF é válido se não é inválido
        let verifiedCpf = arrayCpf.join('');
        return verifiedCpf === this.cpf
    }

    calculateDigit(cpf, multiplier) {
        return cpf.map((digit, index) => digit * (multiplier - index))
            .reduce((total, result) => total + result, 0) % 11;
    }
}