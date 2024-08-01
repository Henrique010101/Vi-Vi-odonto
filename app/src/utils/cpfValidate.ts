const NUMEROS_REPETIDOS: string[] = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999'
];

/**
 * Verifica se o CPF possui todos os números repetidos.
 * @param cpf - CPF a ser verificado.
 * @returns `true` se o CPF possui números repetidos, caso contrário `false`.
 */
export function isNumerosRepetidos(cpf: string): boolean {
    return NUMEROS_REPETIDOS.includes(cpf);
}

/**
 * Calcula o dígito verificador de um CPF.
 * @param cpf - CPF sem os dígitos verificadores.
 * @param multiplicadorInicial - Multiplicador inicial para o cálculo.
 * @returns O dígito verificador calculado.
 */
export function calcularDigito(cpf: string, multiplicadorInicial: number): number {
    let soma = 0;

    for (let i = 0; i < cpf.length; i++) {
        soma += parseInt(cpf[i]) * multiplicadorInicial--;
    }

    const resto = (soma * 10) % 11;
    return resto === 10 || resto === 11 ? 0 : resto;
}

/**
 * Valida se o CPF é válido.
 * @param campo - Campo do formulário contendo o CPF.
 */
export function ehUmCPF(campo: HTMLInputElement): void {
    const cpf = campo.value.replace(/[^\d]/g, "");

    if (isNumerosRepetidos(cpf) || !validaDigitos(cpf)) {
        campo.setCustomValidity('Esse CPF não é válido');
    } else {
        campo.setCustomValidity('');
    }
}

/**
 * Função privada para validar os dígitos verificadores do CPF.
 * @param cpf - CPF a ser validado.
 * @returns `true` se os dígitos são válidos, caso contrário `false`.
 */
function validaDigitos(cpf: string): boolean {
    const primeiroDigitoValido = calcularDigito(cpf.substring(0, 9), 10) === parseInt(cpf[9]);
    const segundoDigitoValido = calcularDigito(cpf.substring(0, 10), 11) === parseInt(cpf[10]);

    return primeiroDigitoValido && segundoDigitoValido;
}