# Interpretador JavaScript

Este projeto é um interpretador para a linguagem JavaScript, desenvolvido com o objetivo de demonstrar como um interpretador pode ser construído.
Nele temos o analisador léxico, semântico e sintático e foi desenvolvido utilizando JavaScript puro.


## Como usar

1. Certifique-se de ter o Node.js instalado em seu sistema.
2. Clone este repositório ou baixe o código-fonte.
3. Navegue até o diretório do projeto.
4. Modifique o arquivo index.js com o código JavaScript que você deseja analisar. O interpretador irá analisar este arquivo.

Execute o arquivo principal index.js:
    ```
   node index.js 
    ```

O interpretador irá processar o arquivo index.js, imprimir todos os tokens reconhecidos e indicar quaisquer erros encontrados.

## Tokens

Os seguintes tipos de tokens são reconhecidos:

- Palavras-chave (`KEYWORD`)
- Identificadores (`IDENTIFIER`)
- Números (`NUMBER`)
- Strings (`STRING`)
- Operadores (`OPERATOR`)
- Operadores de atribuição (`ASSIGNMENT_OPERATOR`)
- Pontuação (`PUNCTUATION`)
- Comentários de linha (`LINE_COMMENT`)
- Comentários de bloco (`BLOCK_COMMENT`)
- Booleanos (`BOOLEAN`)
- Nulo (`NULL`)

## Tratamento de erros

Se um caractere não puder ser reconhecido como parte de um token válido, será gerado um erro. Todos os erros são coletados e exibidos após a conclusão do interpretador.

## Contribuições

Contribuições para o projeto são bem-vindas. Por favor, abra uma issue ou envie um pull request para propor melhorias ou adicionar novas funcionalidades.

## Licença

Este projeto é licenciado sob a Licença MIT. Consulte o arquivo `LICENSE` para obter mais informações.

## Arvore de arquivos

.
├── analysers
│   ├── interpreter.js
│   ├── lexer-analyser.js
│   └── parser-analyser.js
├── readers
│   ├── character-reader.js
│   └── token-reader.js
├── .gitignore
├── README.md
├── grammar.js
├── index.js
├── package.json
├── rule-helpers.js
└── tokens.js


### Detalhes dos Diretórios e Arquivos

- `analysers`: Este diretório contém os módulos relacionados à análise de código. Inclui os seguintes arquivos:

  - `interpreter.js`: Este módulo implementa o interpretador de código que processa tokens analisados e gera a saída.

  - `lexer-analyser.js`: Este módulo implementa o analisador léxico que decompõe o código em tokens.

  - `parser-analyser.js`: Este módulo implementa o analisador que verifica se os tokens seguem a sintaxe correta.

- `readers`: Este diretório contém utilitários de leitura usados para análise de código e de tokens.

  - `character-reader.js`: Esta utilidade auxilia na leitura de caracteres a partir da string de código.

  - `token-reader.js`: Esta utilidade auxilia na leitura de tokens a partir do array de tokens.

- `index.js`: Este é o arquivo principal que inicia a execução do interpretador.

- `grammar.js`, `rule-helpers.js`, e `tokens.js`: Esses arquivos auxiliam na definição das regras gramaticais e tipos de tokens para a linguagem suportada pelo interpretador.

  
