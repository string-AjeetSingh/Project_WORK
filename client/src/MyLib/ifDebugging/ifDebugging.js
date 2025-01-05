class ifDebugging {

    constructor(isDebugging, level = 'log') {
        this.isDebugging = null;
        if (isDebugging) {
            parseInt(isDebugging);
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

    alert(...message) {
        if (this.isDebugging) {
            alert(...message);
        }
    }
}


export { ifDebugging }