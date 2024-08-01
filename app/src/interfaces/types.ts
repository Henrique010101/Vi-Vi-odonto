export interface ListaRespostas {
    nome: string;
    email: string;
    rg: string;
    cpf: string;
    aniversario: string;
}

export interface FormElements extends HTMLFormControlsCollection {
    nome: HTMLInputElement;
    email: HTMLInputElement;
    rg: HTMLInputElement;
    cpf: HTMLInputElement;
    aniversario: HTMLInputElement;
}