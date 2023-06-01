const CharacterReader = require('../readers/character-reader');

const tokenDetectors = require('../tokens');

const detectTokens = code => {
    const reader = new CharacterReader(code);

    const foundTokens = [];

    while (reader.hasNext()) {
        let token = null;

        let startPosition = reader.position;
        let linePosition = reader.getLinePosition();
        let characterPosition = reader.getCharacterPosition();

        for (const detectToken of tokenDetectors) {
            token = detectToken(reader);

            if (token) {
                break;
            }
        }

        if (!token) {
            throw new Error(`Invalid character '${reader.peek()}' at ${linePosition}:${characterPosition}`);
        }

        foundTokens.push({
            ...token,
            start: startPosition,
            end: reader.position,
            line: linePosition,
            character: characterPosition
        });
    }

    return foundTokens.filter(i => i.type !== 'whitespace' && i.type !== 'comment');
};

module.exports = code => detectTokens(code);