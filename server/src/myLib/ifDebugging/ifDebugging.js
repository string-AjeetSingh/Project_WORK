class ifDebugging {

    constructor(isDebugging, level = 'log') {
        this.isDebugging = false;
        if (isDebugging && isDebugging.length > 0) {
            this.isDebugging = true;
        }
        this.level = level

    }

    console(...message) {
        if (this.isDebugging) {
            console[this.level](...message);
        }


    }

    levelConsole(level, ...message) {
        if (this.isDebugging) {
            console[level](...message);
        }

        return [level, ...message]
    }

    setLevel(val = 'log') {
        this.level = val;
    }
}


module.exports = ifDebugging 