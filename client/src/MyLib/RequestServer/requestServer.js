
import { ifDebugging } from "../ifDebugging/ifDebugging";

const debug = new ifDebugging(process.env.REACT_APP_isDebugging);

class requestServer {
    constructor(url,
        options = {
            method: null,
            headers: {}, body: null,
            credentials: "omit",
            optionsMode: 'default'

        }, isDebugging = 1) {

        this.ifDebug = new ifDebugging(isDebugging);
        this.formData = new FormData();
        this.url = url;
        if (options.optionsMode !== 'default') {
            this.options = options;
            this.options.body = {}
            if (!this.options.headers) {
                this.options.headers = {}
            }
        }
        else {

            this.options = options.optionsMode;
        }


    }
    async requestJson() {

        try {

            let result = await requestServer.fetch(this.options.optionsMode, this.url, this.options);
            // this.options.body = {};       //reset the body data,

            if (result.ok) {
                this.ifDebug.console(`succesfully connected to ${this.url}`);
            } else {
                this.ifDebug.console(`Fail to connect with ${this.url}`);
            }

            let resultJson = await result.json();

            return {
                status: result.status,
                headers: result.headers,
                json: resultJson
            };

        } catch (error) {
            console.error("the error from requerst Json is :", error);
        }
    }

    noBody() {
        delete (this.options.body);
    }
    setBody(val) {
        this.options.body.data = val;
    }

    setBodyCustom(obj) {
        this.options.body = obj;
    }

    setBodyProperty(key, val) {
        this.options.body[key] = val;
    }

    setAuthorizedFlag(bool) {
        this.options.headers.authorized = bool;
    }

    setFormData(key, val, stringify) {
        if (!stringify) {

            this.formData.append(key, val);
        }
        else {
            this.formData.append(key, JSON.stringify(val));
        }
    }

    setUrl(url) {
        this.url = url;
    }

    configOptions(key, val) {
        this.options[key] = val;
    }
    setContentType(contentType) {
        this.options.headers['content-type'] = contentType;
    }
    setNoHeader() {
        delete (this.options.headers);
    }
    resetFormData() {
        this.formData = null;
        this.formData = new FormData();
    }




    static async fetch(mode, url, options) {

        if (mode === 'default') {
            let result = await fetch(url);
            return result;
        }

        else {

            debug.console('final fetch body : ', options.body)

            let finalOptions = { ...options };
            finalOptions.body = JSON.stringify(finalOptions.body);
            debug.console('final fetch stringify body : ', finalOptions.body)

            let result = await fetch(url, finalOptions);

            return result;
        }

    }

    async fetchNoStringify() {


        let finalOptions = { ...this.options };
        debug.console('final fetchNoString body : ', finalOptions)
        finalOptions.body = this.formData;

        let result = await fetch(this.url, finalOptions);

        if (result.ok) {
            this.ifDebug.console(`succesfully connected to ${this.url}`);
        } else {
            this.ifDebug.console(`Fail to connect with ${this.url}`);
        }

        let resultJson = await result.json();

        this.formData = new FormData();  // reset the format data ,
        return {
            status: result.status,
            headers: result.headers,
            json: resultJson
        };

    }

}






export { requestServer };