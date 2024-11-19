import { fade } from "../Animation/animation";

class sAnimation {

    constructor(elem, startAnimationProperties = {
        timerMillisecond : null, updaingVal : null, startPos : null, stopPos: null,
        direction : null, type : null, opacityOperation : null
    }, endAnimationProperties  = {
        timerMillisecond : null, updaingVal : null, startPos : null, stopPos: null,
        direction : null, type : null, opacityOperation : null
    }) {

        this.elem = elem;
        this.posofit = null;
        this.headingswitch = false;
        this.boolRunning = [false]; this.boolTerminate = [false];
        this.viewPortHeight = [null];
        this.appear = [null];
        this.unAppear = [null];
        this.iAmRunning = false;
        this.startAnimationProperties = startAnimationProperties;
        this.endAnimationProperties = endAnimationProperties;


       

        if (!this.elem) {
            throw new Error('sAnimation constructor with falsey elem argument');
        }

        sAnimation.getViewPortHeight(this.viewPortHeight, this.appear,
            this.unAppear
        )

        window.addEventListener('resize',
            sAnimation.getViewPortHeight.bind(null,
                this.viewPortHeight, this.appear, this.unAppear));
    }

    async theLogin() {

        this.posofit = this.elem.getBoundingClientRect();
        console.log(this.posofit.top);



        if (this.posofit.top <= this.appear[0] && this.posofit.top >= 0 && !this.headingswitch) {


            if (this.boolRunning[0] && !this.iAmRunning) {
                this.iAmRunning = true;
                console.log('am i running multiple tinmes');

                await sAnimation.terminateRunningAnimationAndConfirm(this.boolTerminate);
                console.log(`val of the terminates before reset = ${this.boolTerminate}`);

                sAnimation.resetTerminateVariable(this.boolTerminate);

                this.iAmRunning = false;
            }


            this.headingswitch = true;
            sAnimation.animation(this.boolRunning,
                this.startAnimationProperties, this.endAnimationProperties,
                 this.elem, true, this.boolTerminate);

        }
        else if (this.posofit.top > this.unAppear[0] && this.posofit.top >= 0 && this.headingswitch) {


            if (this.boolRunning[0] && !this.iAmRunning) {
                this.iAmRunning = true;
                console.log('am i running multiple tinmes');

                await sAnimation.terminateRunningAnimationAndConfirm(this.boolTerminate);
                console.log(`val of the terminates before reset = ${this.boolTerminate}`);

                sAnimation.resetTerminateVariable(this.boolTerminate);

                this.iAmRunning = false;
            }


            this.headingswitch = false;
            /* 
            
            sAnimation.animation(this.boolRunning,
            this.recivedAnimation, this.elem, false, this.boolTerminate);

            sAnimation.theHeadingAnimation(this.boolRunning,
            this.recivedAnimation, this.elem, false, this.boolTerminate);
            */
                sAnimation.animation(this.boolRunning,
                    this.startAnimationProperties, this.endAnimationProperties,
                     this.elem, false, this.boolTerminate);
        }

    }

    static async animation(boolswitch, start, end, elem, mode, terminate) {
        console.log('From the static animation version');
        console.log('waiting');
        boolswitch[0] = true;

        /* 
        
        await givenAnimation(elem, mode, terminate);
          if (mode) {
            await fade(elem, 15, 0.5, -30, 0, 'left', 'plus', 1, terminate);
        }
        else if (!mode) {
            await fade(elem, 15, 0.5, 0, -30, 'left', 'minus', -1, terminate);
        }
        */

        if (mode) {
            console.log(start);
           
            await fade(elem, start.timerMillisecond, start.updatingVal,
            start.startPos, start.stopPos, 
            start.direction, start.type, start.opacityOperation, terminate);
            
        }
        else if (!mode) {
            await fade(elem, end.timerMillisecond, end.updatingVal,
                end.startPos, end.stopPos, 
               end.direction, end.type, end.opacityOperation, terminate);
        }

        boolswitch[0] = false;
        console.log('done');
    }

    static getViewPortHeight(variable, appear, unAppear) {
        variable[0] = window.innerHeight;
        appear[0] = variable[0] - ((19 / 100) * variable[0]);
        unAppear[0] = variable[0] - ((15 / 100) * variable[0]);

    }

    static async terminateRunningAnimationAndConfirm(terminate) {
        terminate[0] = true;
        await new Promise((resolve, reject) => {
            let inter = setInterval(() => {
                console.log('terminating..');
                if (terminate[1] == true) {
                    resolve();
                    clearInterval(inter);
                }
            }, 0)
        })
    }

    static resetTerminateVariable(terminate) {
        terminate = [false, false];
    }

  


}

export { sAnimation };