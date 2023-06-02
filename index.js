const analyseCode = require('./analysers/lexer-analyser');
const parseTokens = require('./analysers/parser-analyser');
const interpret = require('./analysers/interpreter');

const code = `
const numero = 3;
if (numero % 2 == 0){
    print("Par");
}
if(numero % 2 != 0){
    print("Impar");
}
`;

const tokens = analyseCode(code);
const statements = parseTokens(tokens);



console.log('Code we ran:');
console.log(code);
console.log("--------------------------------------------------------")

const vm = {
    variables: {},
    functions: {
        print(message) {
            console.log('MESSAGE:', message); 
        },
        pow(x, y) {
            return Math.pow(x, y);
        }
    }
};
const result = interpret(statements, vm);

console.log('Result:')
console.dir(result, {depth: null});
console.log('Final VM State:', vm);
