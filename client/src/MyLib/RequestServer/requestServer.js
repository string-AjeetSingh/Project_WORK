

class requestServer {
    constructor(url,
        options = {
            method: 'get',
            header: 'application/json', body: null,
            credentials: "omit",
            optionsMode: 'normal'

        }, isDebugging = 1) {

        this.ifDebug = new ifDebugging(isDebugging);

        this.url = url;
        if (options.optionsMode === 'default') {

            this.options = {
                method: 'get',
                header: 'application/json', body: null,
                credentials: "omit"

            }

        } else {
            this.options = options;
        }

    }
    async requestJson() {

        try {

            let result = await fetch(this.url, this.options);

            if (result) {
                this.ifDebug.dLog(`succesfully connected to ${this.url}`);
            }
            let resultJson = await result.json();
            return {
                status: result.status,
                headers: result.headers,
                json: resultJson
            };

        } catch (error) {
            console.error(error);
        }
    }

    setBody(object) {
        this.options.body = object;
    }

    setUrl(url) {
        this.url = url;
    }

    configOptions(options) {
        this.options = {
            ...this.options, ...options
        };
    }

}

class ifDebugging {

    constructor(isDebugging, level = 'log') {
        this.isDebugging = isDebugging;
        this.level = level

    }

    dLog(...message) {
        if (this.isDebugging) {
            console[this.level](...message);
        }
    }

    dLogCustom(level, ...message) {
        if (this.isDebugging) {
            console[level](...message);
        }
    }

    setLevel(val = 'log') {
        this.level = val;
    }
}




export { requestServer, ifDebugging };