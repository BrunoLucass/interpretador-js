const analyseCode = require('./lexer-analyser');
const parseTokens = require('./parser-analyser');
const interpret = require('./interpreter');

const code = `
let firstName = 'John';
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
