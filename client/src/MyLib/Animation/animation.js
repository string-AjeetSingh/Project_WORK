
import { clear } from '@testing-library/user-event/dist/clear';
import './animation.css'

async function fade(elem, speed, updateCountValue, startFrom,
    endAt, type = 'left', flow = 'plus', opacityValues = 1, terminate = [false]) {


    if (!(type.toLowerCase() === 'left' || type.toLowerCase() === 'right' ||
        type.toLowerCase() === 'top' || type.toLowerCase() === 'bottom')
    ) {
        throw new Error("Wrong type parameter given to fade");
    }
    else if (!(flow.toLowerCase() === 'plus' || flow.toLowerCase() === 'minus')) {
        throw new Error("Wrong flow parameter given to fade");
    }
    else if (!(opacityValues === 1 || opacityValues === -1 || opacityValues === 0)) {
        throw new Error("Wrong opacityValue parameter given to fade");
    }

    await new Promise((resolve, reject) => {
        try {


            let count = startFrom;
            let countOpacity

            if (opacityValues === 1) {
                countOpacity = 0;
            }
            else {
                countOpacity = 1;
            }

            let opacityCountUpdate = Math.abs(updateCountValue / (endAt - startFrom));

            let inter = setInterval(() => {
                try {

                    if (terminate[0]) {

                        terminate[1] = true;
                        clearInterval(inter);
                        resolve();
                    }

                    finishInterval(inter, count, endAt, resolve, flow);
                    elem.style[type] = `${count}px`;

                    if (!(opacityValues === 0)) {
                        elem.style.opacity = countOpacity;



                        if (opacityValues === 1) {
                            countOpacity += opacityCountUpdate;
                        } else if (opacityValues === -1) {
                            countOpacity -= opacityCountUpdate;
                        }
                    }

                    if (flow === 'plus') {

                        count += updateCountValue;
                    } else if (flow === 'minus') {
                        count -= updateCountValue;

                    }

                } catch (error) {
                    clearInterval(inter);
                    resolve();
                    console.error('Error - ', error.message);

                }

            }, speed)

        } catch (error) {
            console.error(error.message);
        }

    })

    return true;


}

function finishInterval(inter, count, x, resolve, flow) {
    if (flow === 'plus') {
        if (count >= x) {
            clearInterval(inter);
            return resolve();
        }

    } else if (flow === 'minus') {
        if (count <= x) {
            clearInterval(inter);
            return resolve();
        }

    }


}

async function pleaseWait(no) {
    await new Promise((resolve, reject) => {

        setTimeout(() => {
            resolve();
        }, no)
    })
    return true;


}

function startAnimationType(loopName, RefAnimationId, RefCloseAnimation, functionToRun) {
    let animationCycleCount = 0;
    if (typeof (loopName) != 'string') {

        throw new Error('param loopName is not type of string');
    }

    const animate = async () => {

        try {
            if (RefCloseAnimation.current) {
                ///console.log(`The attemp to close render ${loopName}`); 
                return;
            }

            await functionToRun(RefCloseAnimation);
            /////console.log(`Animation loop running with cycle count = ${animationCycleCount}`);
            ///console.log(`${loopName} running with cycle count`);
            animationCycleCount++;
            RefAnimationId.current = requestAnimationFrame(animate);

        } catch (error) {

            console.error(error);
        }
    }
    RefAnimationId.current = requestAnimationFrame(animate);
}

async function ButtonAnimation(butt) {
    await new Promise((resolve, reject) => {
        let counter = 1;
        let counterUpdate = 0.02;
        let inter = setInterval(() => {

            finishInterval(inter, counter, 0.85, resolve, 'minus');

            butt.current.style.transform = `scale(${counter})`
            ///console.log('from button counter = '+counter);
            counter -= counterUpdate;
        }, 10)
    })
    await new Promise((resolve, reject) => {
        let counter = 0.85;
        let counterUpdate = 0.02;
        let inter = setInterval(() => {

            finishInterval(inter, counter, 1, resolve, 'plus');

            butt.current.style.transform = `scale(${counter})`
            ///console.log('from button counter = '+counter);
            counter += counterUpdate;
        }, 10)
    })

}

async function fadeAgainAgain(elem, elemType = "ref",
    shouldTerminate = { current: false }, config = {
        scaleVal: 0.8,
        scaleValInc: 0.02,
        scaleValLimit: 2,
        opacity: 1,
    }) {
    if (elemType === "ref") {


        await new Promise((resolve, reject) => {

            let astore = config.scaleValLimit - config.scaleVal;
            astore = astore / config.scaleValInc;
            astore = config.opacity / astore;

            let opacityValInc = astore;


            let interval = setInterval(() => {

                try {

                    if (shouldTerminate.current) {

                        console.log('closed the fade againagian animation');

                        resolve();
                        clearInterval(interval);
                    }

                    if (config.scaleVal >= config.scaleValLimit) {

                        resolve();
                        clearInterval(interval);
                    }

                    elem.current.style.transform = `scale(${config.scaleVal})`;
                    elem.current.style.opacity = config.opacity;

                    config.scaleVal += config.scaleValInc;
                    config.opacity -= opacityValInc;



                } catch (error) {
                    console.log(error);
                }

            }, 20)
        })
    }
    else if (elemType === "normal") {

    }
    else {
        throw new Error('Wrong val to elemType parameter');
    }
}

async function upDown(elem, elemType = 'ref',
    shouldTerminate = { current: false }) {

    if (elemType === 'ref') {

        await new Promise((resolve, reject) => {
            let counter = 1;
            let counterUpdate = 0.02;
            let inter = setInterval(() => {

                try {

                    console.log('running up down animation');
                    if (shouldTerminate.current) {

                        console.log('closed the updown animation');
                        resolve();
                        clearInterval(inter);
                    }

                    finishInterval(inter, counter, 0.85, resolve, 'minus');

                    elem.current.style.transform = `scale(${counter})`
                    ///console.log('from button counter = '+counter);
                    counter -= counterUpdate;
                } catch (error) {
                    console.log(error);
                }
            }, 10)
        })
        await new Promise((resolve, reject) => {
            let counter = 0.85;
            let counterUpdate = 0.02;
            let inter = setInterval(() => {
                try {

                    console.log('running up down animation');
                    if (shouldTerminate.current) {

                        console.log('closed the updown animation');
                        resolve();
                        clearInterval(inter);
                    }

                    finishInterval(inter, counter, 1, resolve, 'plus');

                    elem.current.style.transform = `scale(${counter})`
                    ///console.log('from button counter = '+counter);
                    counter += counterUpdate;
                } catch (error) {
                    console.log(error);
                }
            }, 10)
        })
    }
    else if (elemType === 'normal') {

    }
    else {
        throw new Error('Wrong val to elemType parameter');

    }
}

async function up(elem, elemType = 'ref') {

    if (elemType === 'ref') {

        await new Promise((resolve, reject) => {
            let inter;

            let counter = 0;
            let counterUpdate = 0.1;
            inter = setInterval(() => {
                try {

                    finishInterval(inter, counter, 1, resolve, 'plus');

                    elem.current.style.transform = `scale(${counter})`
                    ///console.log('from button counter = '+counter);
                    counter += counterUpdate;
                } catch (error) {
                    clearInterval(inter);
                    resolve();
                    console.error('Error -', error);
                }
            }, 20)
        })
    }
    else if (elemType === 'normal') {

    }
    else {
        throw new Error('Wrong val to elemType parameter');

    }
}


export {
    fade, pleaseWait, finishInterval, startAnimationType,
    ButtonAnimation, fadeAgainAgain, upDown, up
};