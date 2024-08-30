const promptIa = (prompt) => {
    return `Extraia os seguintes dados do texto abaixo,
    que está formatado como uma ficha de cadastro ou formulário. 
    Certifique-se de capturar com precisão cada campo do texto fornecido ${prompt}. 
    Note que o nome do pai e da mãe estarão na mesma linha:

    Nome: Roberta (exemplo)
    CPF: 453.489.687-00 (exemplo)
    NomedoPaiMãe: Carlos da Silva e Ana Souza (exemplo)
    DatadeNascimento: 19/10/1985 (exemplo)
    Bairro: Jardim das Flores (exemplo)
    DatadeEntrada: 01/10/2024 (exemplo)
    HoradeEntrada: 09:00 (exemplo)
    DatadeSaída: 10/04/1998 (exemplo)
    HoradeSaída: 20:45 (exemplo)
    
    Telefone: (11) 99999-9999 (exemplo)

    Além disso, envie apenas um arquivo .json contendo os dados extraídos.
    Preste muita atenção à estrutura do texto para identificar e extrair corretamente cada campo.`;
};

export default promptIa;
