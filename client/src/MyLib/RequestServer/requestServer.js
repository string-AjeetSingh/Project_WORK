
import { ifDebugging } from "../ifDebugging/ifDebugging";

const debug = new ifDebugging(process.env.REACT_APP_isDebugging);

class requestServer {
    constructor(url,
        options = {
            method: null,
            headers: null, body: null,
            credentials: "omit",
            optionsMode: 'default'

        }, isDebugging = 1) {

        this.ifDebug = new ifDebugging(isDebugging);

        this.url = url;
        if (options.optionsMode !== 'default') {
            this.options = options;
        }
        else {
            this.options = this.options;
        }

    }
    async requestJson() {

        try {


            let result = await requestServer.fetch(this.options.optionsMode, this.url, this.options);

            if (result.ok) {
                this.ifDebug.console(`succesfully connected to ${this.url}`);
            } else {
                //this.ifDebug.console(`Fail to connect with ${this.url}`);
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
        this.options.body = JSON.stringify(object);
    }

    setUrl(url) {
        this.url = url;
    }

    configOptions(options) {
        this.options = {
            ...this.options, ...options
        };
    }

    static async fetch(mode, url, options) {

        if (mode === 'default') {
            let result = await fetch(url);
            return result;
        }
        else {
            let result = await fetch(url, options);
            return result;
        }
    }

}






export { requestServer };