export default function MaiorDeIdade(campo: HTMLInputElement) {
    const dataNascimento = new Date(campo.value)
    if (validaIdade(dataNascimento)) {
        campo.setCustomValidity('O usuário não é maior de idade')
    }
}

function validaIdade(data: Date){
    const dataAtual = new Date()
    const dataMais18 = new Date(data.getFullYear() +18, data.getUTCMonth(), data.getUTCDate())

    return dataAtual >= dataMais18;
}