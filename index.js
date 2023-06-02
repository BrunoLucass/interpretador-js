const analyseCode = require('./analysers/lexer-analyser');
const parseTokens = require('./analysers/parser-analyser');
const interpret = require('./analysers/interpreter');

const code = `
var x = 10;
let y = 5;
const z = 20;

var sum = x + y;
var diff = x - y;
var prod = x * y;
var quot = x / y;

var isSumGreaterThanDiff = sum > diff;
var isProdLessThanQuot = prod < quot;
var isSumEqualtoZ = sum === z;
var isXnotEqualToY = x !== y;
var areBothConditionsTrue = isSumGreaterThanDiff && isProdLessThanQuot;
var areEitherConditionsTrue = isSumEqualtoZ || isXnotEqualToY;

if (areBothConditionsTrue) {
    print("Both conditions are true");
}

//Esse é um exemplo de comentario


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
