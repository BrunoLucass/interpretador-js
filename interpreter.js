const interpretStatements = (statements, vm) => {
    let result = null;

    for (const statement of statements) {
        result = interpretStatement(statement, vm);
    }

    return result;
};

const interpretStatement = (statement, vm) => {
    switch (statement.type) { 
        case 'assignment':
            return interpretAssignment(statement, vm);
        case 'function':
            return interpretFunctionCall(statement, vm);
        case 'if':
            return interpretIf(statement, vm);
    }

    throw new Error(`Invalid statement type: ${statement.type}`);
};

const interpretAssignment = (statement, vm) => {
    vm.variables[statement.name] = interpretExpression(statement.expression, vm);

    return vm.variables[statement.name];
};

const interpretExpression = (expression, vm) => {
    switch (expression.type) {
        case 'string':
            return expression.value;
        case 'number':
            return parseFloat(expression.value);
        case 'variable':
            return interpretVariableRetrieval(expression, vm);
        case 'function':
            return interpretFunctionCall(expression, vm);
        case 'unary':
            return interpretUnaryOperation(expression, vm);
        case 'operation':
            return interpretBinaryOperation(expression, vm);
    }

    throw new Error(`Invalid type: ${expression.type}`);
};

const interpretVariableRetrieval = (expression, vm) => {
    if (!(expression.name in vm.variables)) {
        throw new Error(`Runtime Error. Variable '${expression.name}' does not exist.`);
    }

    return vm.variables[expression.name];
};

const interpretFunctionCall = (expression, vm) => {
    if (!(expression.name in vm.functions)) {
        throw new Error(`Runtime Error. Function '${expression.name}' is not defined.`);
    }

    const parameters = expression.parameters.map(
        parameter => interpretExpression(parameter, vm)
    );

    return vm.functions[expression.name](...parameters);
};

const interpretUnaryOperation = (expression, vm) => {
    const value = interpretExpression(expression.value, vm);

    return expression.withNot ? !value : value;
};

const interpretBinaryOperation = (expression, vm) => {
    const leftValue = interpretExpression(expression.left, vm);
    const rightValue = interpretExpression(expression.right, vm);

    switch (expression.operation) {
        case '+':
            return leftValue + rightValue;
        case '-':
            return leftValue - rightValue;
        case '*':
            return leftValue * rightValue;
        case '/':
            return leftValue / rightValue;
        case '&&':
            return leftValue && rightValue;
        case '||':
            return leftValue || rightValue;
        case '>':
            return leftValue > rightValue;
        case '<':
            return leftValue < rightValue;
        case '<=':
            return leftValue <= rightValue;
        case '>=':
            return leftValue >= rightValue;
        case '==':
            return leftValue == rightValue;
        case '===':
            return leftValue === rightValue;
        case '!==':
            return leftValue !== rightValue;
        case '!=':
            return leftValue != rightValue;
    }

    throw new Error(`Invalid operation requested: ${expression.operation}`);
};

const interpretIf = (statement, vm) => {
    const checkValue = interpretExpression(statement.check, vm);

    if (checkValue) {
        return interpretStatements(statement.statements, vm);
    }

    return null;
};

module.exports = interpretStatements;