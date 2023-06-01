module.exports = class CharacterReader {
    constructor(code) {
        this.code = code; 
        this.characterPosition = 0; 
        this.linePosition = 0; 
        this.position = 0; 
    }

    
    peek(amount = 1) {
        return this.code.substring(this.position, this.position + amount);
    }

    next(amount = 1) {
        for (let i = this.position; i < this.position + amount; i++) {
            if (this.code[i] == '\n') { 
                this.linePosition++; 
                this.characterPosition = 0; 
                continue;
            }

            this.characterPosition++; 
        }

        this.position += amount; 
    }

    getCharacterPosition() {
        return this.characterPosition;
    }

    getLinePosition() {
        return this.linePosition;
    }

    hasNext() {
        return this.position < this.code.length;
    }
}