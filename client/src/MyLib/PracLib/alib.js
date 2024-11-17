//.........................................
class useData {
    constructor(paramData) {
        this.length = paramData.length;
        this.data = paramData;
        this.pos = 0;
        this.boolLoop = false;
    }
    getVal() {    //get the value from array, one after one,each call.

        if (this.boolLoop) {

            let out;
            if (this.pos >= this.length) {
               this.pos = 0;
            }
                out = this.data[this.pos];
                this.pos++;
                return out;
            

        } else {


            let out;
            if (this.pos < this.length) {
                out = this.data[this.pos];
                this.pos++;

                return out;
            }
            else {
                return false;
            }
        }
    }
    reset() {
        this.pos = 0;
    }
    setPos(par) {
        this.pos = par;
    }
    loop(bool) {
       
        if(bool === true){
            this.boolLoop = bool;
        }
        else if(bool === false){
            this.boolLoop = bool;
        }
        else{
            throw new Error("Give boolen value to the parameter");
            
        }
    }
}




export { useData }