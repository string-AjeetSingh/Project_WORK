import './animation.css'
async function fade(elem, speed, updateCountValue, startFrom,
    endAt, type = 'left', flow = 'plus', opacityValues = 1, terminate = false) {
   

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
                        
                        if(terminate){
                            clearInterval(inter);
                            resolve();
                        }
                        
                        finishInterval(inter, count, endAt, resolve, flow);
                        elem.style[type] = `${count}px`;
                        
                        if(!(opacityValues === 0)){
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
                        console.error('Error - ', error.message);
                        
                    }
                    
                }, speed)
                
            } catch (error) {
                console.error( error.message);
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

function startAnimationType(loopName,RefAnimationId, RefCloseAnimation, functionToRun) {
    let animationCycleCount = 0;
    if(typeof(loopName) != 'string'){
       
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

async function ButtonAnimation(butt){
    await new Promise((resolve, reject)=>{
        let counter = 1;
        let counterUpdate = 0.02;
        let inter = setInterval(()=>{

            finishInterval(inter, counter, 0.85, resolve, 'minus');
            
            butt.current.style.transform = `scale(${counter})`
            ///console.log('from button counter = '+counter);
            counter -= counterUpdate;
        }, 10)
    })
    await new Promise((resolve, reject)=>{
        let counter = 0.85;
        let counterUpdate = 0.02;
        let inter = setInterval(()=>{

            finishInterval(inter, counter, 1, resolve, 'plus');
            
            butt.current.style.transform = `scale(${counter})`
            ///console.log('from button counter = '+counter);
            counter += counterUpdate;
        }, 10)
    })

}

export {fade, pleaseWait, finishInterval, startAnimationType, ButtonAnimation};