const { rule, either, exactly, optional, minOf, token } = require('./rule-helpers');

const LineStatement = rule(
    () => either(IfExpressionStatement, AssignmentStatement, FunctionStatement),
    expression => expression
);

const IfExpressionStatement = rule(
    () => exactly(IfKeyword, PStart, Expression, PEnd, CodeBlock),
    ([,, check,, statements]) => ({ type: 'if', check, statements })
)

const CodeBlock = rule(
    () => exactly(BStart, minOf(0, LineStatement), BEnd),
    ([, statements]) => statements
);

const FunctionStatement = rule(
    () => exactly(FunctionExpression, Eol),
    ([expression]) => expression
);

const FunctionExpression = rule(
    () => exactly(Name, PStart, optional(FunctionParameters, []), PEnd),
    ([name, _, parameters]) => ({
        type: 'function',
        name: name.value,
        parameters
    })
);

const FunctionParameters = rule(
    () => exactly(Expression, minOf(0, exactly(Comma, Expression))),
    ([first, rest]) => [first, ...rest.map(([_, parameter]) => parameter)]
);

const AssignmentStatement = rule(
    () => exactly(either(VarKeyword, LetKeyword, ConstKeyword), Name, Equals, Expression, Eol),
    ([,name,, expression]) => ({ type: 'assignment', name: name.value, expression })
);

const processBinaryResult = ([left, right]) => {
    let expression = left;

    for (const [operator, rightSide] of right) {

        expression = {
            type: 'operation',
            operation: operator.value,
            left: expression,
            right: rightSide
        };
    }

    return expression;
};

const Expression = rule(
    () => exactly(EqualityTerm, minOf(0, exactly(either(And, Or), EqualityTerm))),
    processBinaryResult
);

const EqualityTerm = rule(
    () => exactly(RelationTerm, minOf(0, exactly(either(TripleEquals, DoubleEquals, NotEquals, NotDoubleEquals), RelationTerm))),
    processBinaryResult
);

const RelationTerm = rule(
    () => exactly(AddSubTerm, minOf(0, exactly(either(Less, Greater, LessEquals, GreaterEquals), AddSubTerm))),
    processBinaryResult
);

const AddSubTerm = rule(
    () => exactly(MulDivTerm, minOf(0, exactly(either(Add, Subtract), MulDivTerm))),
    processBinaryResult
);

const MulDivTerm = rule(
    () => exactly(UnaryTerm, minOf(0, exactly(either(Multiply, Divide), UnaryTerm))),
    processBinaryResult
);

const UnaryTerm = rule(
    () => exactly(optional(Not), Factor),
    ([addedNot, value]) => ({
        type: 'unary',
        withNot: addedNot.type !== 'optional',
        value
    })
);

const Factor = rule(
    () => either(GroupExpression, FunctionExpression, NumberExpression, VariableExpression, StringExpression),
    factor => factor
);

const GroupExpression = rule(
    () => exactly(PStart, Expression, PEnd),
    ([, expression]) => expression
);

const VariableExpression = rule(
    () => Name,
    name => ({
        type: 'variable',
        name: name.value
    })
);

const NumberExpression = rule(
    () => Number,
    number => ({
        type: 'number',
        value: number.value
    })
);

const StringExpression = rule(
    () => String,
    string => ({
        type: 'string',
        value: string.value
    })
);

const Number = token('number');
const String = token('string');
const Name = token('name');
const Equals = token('operator', '=');
const PStart = token('parenStart');
const PEnd = token('parenEnd');
const BStart = token('codeBlockStart');
const BEnd = token('codeBlockEnd');
const Comma = token('comma');
const Eol = token('endOfLine');
const IfKeyword = token('keyword', 'if');
const VarKeyword = token('keyword', 'var');
const LetKeyword = token('keyword', 'let');
const ConstKeyword = token('keyword', 'const');
const And = token('operator', '&&');
const Or = token('operator', '||');
const DoubleEquals = token('operator', '==');
const TripleEquals = token('operator', '===');
const NotEquals = token('operator', '!=');
const NotDoubleEquals = token('operator', '!==');
const Less = token('operator', '<');
const Greater = token('operator', '>');
const LessEquals = token('operator', '<=');
const GreaterEquals = token('operator', '>=');
const Add = token('operator', '+');
const Subtract = token('operator', '-');
const Multiply = token('operator', '*');
const Divide = token('operator', '/');
const Not = token('operator', '!');

module.exports = LineStatement;