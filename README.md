
# Projeto de Extração e Manipulação de Dados com Imagens

## Descrição do Projeto

Este projeto tem como objetivo automatizar o processo de extração de informações de uma imagem, processamento dessas informações por meio de uma IA, e inserção dos dados formatados em uma planilha do Excel.

### Fluxo de Trabalho

1. **Processamento de Imagem**:
   - Uma imagem contendo dados relevantes é carregada a partir de um caminho especificado.
   - A imagem é processada utilizando a biblioteca **Recognize** para extrair as informações desejadas.

2. **Formatação dos Dados**:
   - As informações extraídas são enviadas para uma IA, utilizando a biblioteca **Gemini**.
   - A IA processa os dados e os formata de acordo com as especificações necessárias.

3. **Inserção de Dados na Planilha**:
   - Os dados formatados são então inseridos em uma planilha do Excel usando a biblioteca **ExcelJS**.
   - A planilha é atualizada com os novos dados em células específicas.

### Tecnologias e Bibliotecas Utilizadas

- **Gemini**: Biblioteca responsável por processar e formatar os dados extraídos da imagem utilizando IA.
- **Recognize**: Usada para o processamento da imagem e extração de dados relevantes.
- **ExcelJS**: Biblioteca utilizada para manipulação de arquivos Excel, permitindo leitura, escrita e atualização de planilhas.
