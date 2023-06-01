const readNumberToken = reader => {
    let numberText = '';
    const numberMatch = /\d/;

    while (reader.hasNext()) {
        if (reader.peek().match(numberMatch)) {
            numberText += reader.peek();
            reader.next();
        } else {
            break;
        }
    }

    if (numberText.length == 0) {
        return null;
    }

    return { type: 'number', value: numberText };
}

const readString = reader => {
    let value = '';
    let startedReading = false;
    let isEscaping = false;

    while (reader.hasNext()) {
        const matchFound = (reader.peek() == "'" || reader.peek() == '"');

        if (!startedReading && !matchFound) {
            break;
        }

        if (reader.peek() == '\\' && !isEscaping) {
            isEscaping = true;
            reader.next();
            continue;
        }

        if (startedReading && matchFound && !isEscaping) {
            reader.next();
            break;
        }

        if (!startedReading && matchFound) {
            startedReading = true;
            reader.next();
            continue;
        }

        value += reader.peek();
        reader.next();
        isEscaping = false;
    }

    if (value.length == 0) {
        return null;
    }

    return { type: 'string', value };
}

const readOperator = reader => {
    const operatorMatch = /^(!|\+|-|\*|\/|==|!=|&&|\|\||<|>|<=|>=|=|!=|===|!==)$/;

    const oneCharacterOperator = reader.peek();

    const twoCharacterOperator = reader.peek(2);
    const threeCharacterOperator = reader.peek(3);

    let value = null;


    if (threeCharacterOperator.match(operatorMatch)) {
        reader.next(3);
        value = threeCharacterOperator; 
    }
    else if (twoCharacterOperator.match(operatorMatch)) {
        reader.next(2);
        value = twoCharacterOperator; 
    } else if (oneCharacterOperator.match(operatorMatch)) {
        reader.next();
        value = oneCharacterOperator; 
    }

    if (value) {
        return { type: 'operator', value };
    }

    return null;
}

const readName = reader => {
    let value = '';
    const startOfVariableMatch = /[a-z]/;
    const restOfVariableMatch = /[a-zA-Z0-9]/;

    if (!reader.peek().match(startOfVariableMatch)) {
        return null;
    }

    value = reader.peek();
    reader.next();

    while (reader.hasNext() && reader.peek().match(restOfVariableMatch)) {
        value += reader.peek();
        reader.next();
    }

    return { type: 'name', value };
}

const readKeyword = reader => {
    if (reader.peek(2).match(/^if$/i)) {
        reader.next(2);
        return { type: 'keyword', value: 'if' };
    }
    if (reader.peek(3).match(/^var$/i)) {
        reader.next(3);
        return { type: 'keyword', value: 'var' };
    }
    if (reader.peek(3).match(/^let$/i)) {
        reader.next(3);
        return { type: 'keyword', value: 'let' };
    }
    if (reader.peek(5).match(/^const$/i)) {
        reader.next(5);
        return { type: 'keyword', value: 'const' };
    }
    return null;
}

const readParentheses = reader => {
    if (reader.peek() == '(') {
        reader.next();
        return { type: 'parenStart', value: '(' };
    }

    if (reader.peek() == ')') {
        reader.next();
        return { type: 'parenEnd', value: ')' };
    }

    return null;
}

const readCodeBlocks = reader => {
    if (reader.peek() == '{') {
        reader.next();
        return { type: 'codeBlockStart' };
    }

    if (reader.peek() == '}') {
        reader.next();
        return { type: 'codeBlockEnd' };
    }

    return null;
}

const readEndOfLine = reader => {
    if (reader.peek() == ';') {
        reader.next();
        return { type: 'endOfLine', value: ';' };
    }

    return null;
}

const readComma = reader => {
    if (reader.peek() == ',') {
        reader.next();
        return { type: 'comma', value: ',' };
    }

    return null;
}

const readWhitespace = reader => {
    const whitespaceRegex = /[\t\r\n ]/;
    let value = '';
    while (reader.hasNext() && reader.peek().match(whitespaceRegex)) {
        value += reader.peek();
        reader.next();
    }

    if (value.length > 0) {
        return { type: 'whitespace', value };
    }

    return null;
}

module.exports = [
    readNumberToken,
    readString,
    readOperator,
    readKeyword,
    readName,
    readParentheses,
    readCodeBlocks,
    readEndOfLine,
    readComma,
    readWhitespace,
];