import { useState, useRef, useEffect } from "react";
import {
    startAnimationType, pleaseWait,
    fadeAgainAgain, upDown, up, fade
} from "../../MyLib/Animation/animation";
import { flushSync } from "react-dom";
import { useResizeValue } from "../../MyLib/MyHook/customHook";

function TheLoopAnimation({ toggleTo = 'undefined' }) {

    let Resize = useResizeValue(window.innerWidth);
    const refLoopAnimationId = useRef(null);
    const refLoopAnimationClose = useRef(null);
    const [isClosed, setisClosed] = useState(null);


    const elem1 = useRef(null);
    const elemImg1 = useRef(null);
    const elemImg2 = useRef(null);
    const [container, setcontainer] = useState(<div ref={elem1} className=" ">

        <div className="size-24
          relative
         right">
            <img ref={elemImg1} className="w-full
        absolute"
                src="./logo.png"></img>
            <img ref={elemImg2} className="w-full
         absolute "
                src="./logo.png"></img>
        </div>


    </div>)

    async function closeTheLoopAnimation() {


        if (window.innerWidth <= 500) {
            await fade(elem1.current, 19, 10, 0, window.innerWidth, 'right', 'plus', 0);
        }
        else if (window.innerWidth > 500 && window.innerWidth <= 800) {
            await fade(elem1.current, 19, 15, 0, window.innerWidth, 'right', 'plus', 0);
        }
        else {
            await fade(elem1.current, 19, 26, 0, window.innerWidth, 'right', 'plus', 0);
        }

        refLoopAnimationClose.current = true;
        cancelAnimationFrame(refLoopAnimationId.current);

        setTimeout(() => {
            elem1.current.style.display = "none";
        }, 500)


    }



    useEffect(() => {

        if (toggleTo === 'on') {
            refLoopAnimationClose.current = false;
            startAnimationType("The Loop Animation", refLoopAnimationId
                , refLoopAnimationClose, async (closeBool) => {

                    elemImg2.current.style.opacity = 0;
                    await upDown(elemImg1);
                    await fadeAgainAgain(elemImg2, 'ref',
                        closeBool);

                    await pleaseWait(200);
                }
            )

        }
        else if (toggleTo === 'off') {
            console.log('animation off');


            closeTheLoopAnimation();

        }
        else if (toggleTo === 'undefined') {
            console.log('toggle to on will start the animations, you must also able to control it');
        }
        return (() => {
            cancelAnimationFrame(refLoopAnimationId.current);
        });
    }, [toggleTo])

    return (
        <>
            <button className="block m-2 border-2 
            p-1  pr-4 pl-4 bg-violet-700 font-bold
            active:rounded-full
            text-2xl rounded-xl text-center "
                onClick={() => {
                    console.log('attemp to cloase animation');

                    refLoopAnimationClose.current = true;
                    cancelAnimationFrame(refLoopAnimationId.current);
                }}>
                stop animation
            </button>

            <hr></hr>
            <div ref={elem1} className=" w-screen
             relative   top-0 h-screen
             bg-emerald-900
            flex flex-row justify-around
                items-center">

                {container}

            </div>
        </>
    );
}


export { TheLoopAnimation }
