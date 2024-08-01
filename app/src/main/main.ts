import { ListaRespostas, FormElements } from '../interfaces/types.js';
import { mensagens, tiposDeErro, TiposDeErro } from '../constants/errorTypes.js';
import MaiorDeIdade from '../utils/valida-idade.js';
import { ehUmCPF } from '../utils/cpfValidate.js';

const camposDoFormulario: NodeListOf<HTMLInputElement> = document.querySelectorAll("[required]") as NodeListOf<HTMLInputElement>;
const formulario: HTMLFormElement = document.querySelector("[data-formulario]") as HTMLFormElement;

formulario.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const elements = target.elements as FormElements;

    const listaRespostas: ListaRespostas = {
        nome: elements.nome.value,
        email: elements.email.value,
        rg: elements.rg.value,
        cpf: elements.cpf.value,
        aniversario: elements.aniversario.value,
    };

    localStorage.setItem("cadastro", JSON.stringify(listaRespostas));
    window.location.href = './abrir-conta-form-2.html';
});

camposDoFormulario.forEach((campo: HTMLInputElement) => {
    campo.addEventListener("blur", () => verificaCampo(campo));
});

function verificaCampo(campo: HTMLInputElement): void {
    let mensagem: string = "";
    campo.setCustomValidity("");

    if (campo.name === "cpf" && campo.value.length >= 11) {
        ehUmCPF(campo);
    }

    if (campo.name === "aniversario" && campo.value !== "") {
        MaiorDeIdade(campo);
    }

    tiposDeErro.forEach((erro: TiposDeErro) => {
        if (erro in campo.validity && campo.validity[erro as keyof ValidityState]) {
            mensagem = mensagens[campo.name]?.[erro] || "";
        }
    });

    const mensagemErro = campo.parentNode?.querySelector('.mensagem-erro') as HTMLSpanElement;
    const validadorDeInput = campo.checkValidity();

    if (!validadorDeInput) {
        mensagemErro.textContent = mensagem;
    } else {
        mensagemErro.textContent = "";
    }
}

