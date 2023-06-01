const code = `
firstName = 'John';
lastName = 'Smith';
age = 50;

print('Entered name: ' + firstName + ', ' + lastName);

if (age > 40) {
    if (age > 45) {
        print('Age is above 45');
    }
    print('Welcome, ' + firstName + ' you are ' + age + ' old.');
}
`;

const analyseCode = require('./lexer-analyser');

const tokens = analyseCode(code);

const parseTokens = require('./parser-analyser');

const statements = parseTokens(tokens);


const interpret = require('./interpreter');

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
