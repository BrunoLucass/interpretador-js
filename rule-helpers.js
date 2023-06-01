const rule = (getChecks, onMatch) => reader => {

    const checkRule = getChecks();

    const result = checkRule(reader);

    return result ? onMatch(result) : null;
};

const exactly = (...checks) => reader => {
    
    reader.pushState();

    const results = [];

    for (const check of checks) {

        const match = check(reader);

        if (!match) {
            reader.restoreState();
            return null;
        }

        results.push(match);
    }

    reader.popState();

    return results;
};

const either = (...checks) => reader => {
    for (const check of checks) {
        reader.pushState();

        const match = check(reader);
        if (match) {
            reader.popState();
            return match;
        }

        reader.restoreState();
    }

    return null;
};

const optional = (check, defaultValue = { type: 'optional' }) => reader => {
    reader.pushState();
    const result = check(reader);

    if (!result) {
        reader.restoreState();
    } else {
        reader.popState();
    }

    return result ? result : defaultValue;
};

const minOf = (minAmount, check) => reader => {
    reader.pushState();

    const results = [];

    let result = null;

    while (true) {
        result = check(reader);

        if (!result) {
            if (results.length < minAmount) {
                reader.restoreState();
                return null;
            }

            break;
        }

        results.push(result);
    }

    reader.popState();
    return results;
};

const token = (type, value = null) => reader => {
    let valueMatches = value ? reader.isValue(value) : true;

    if (reader.isType(type) && valueMatches) {
        const result = reader.get();

        reader.next();

        return result;
    };

    return null;
};

module.exports = {
    rule,
    exactly,
    either,
    optional,
    minOf,
    token,
};