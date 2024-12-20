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

    const elemImg3 = useRef(null);
    const elemImg4 = useRef(null);
    const elemImg5 = useRef(null);
    const elemImg6 = useRef(null);


    const [container, setcontainer] = useState([<div className=" ">

        <div className="size-24
          relative
         right">
            <img ref={elemImg1} className="w-full
        absolute"
                src="/logo.png"></img>
            <img ref={elemImg2} className="w-full
         absolute "
                src="/logo.png"></img>
        </div>


    </div>])

    /* 
    
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
    */

    function newStructure() {
        setcontainer([null,

            <div className="size-24 
        relative flex flex-row flex-nowrap items-center justify-center
       right">
                <div ref={elemImg3}
                    className="w-48 h-[80%] bg-emerald-900
             z-10 rounded-2xl 
             absolute right-4">

                </div>
                <div ref={elemImg4} className="flex flex-row flex-nowrap items-end m-3 mr-8">

                    <div className="text-green-700 text-5xl 
                        font-serif font-bold">W</div>
                    <div className="text-3xl font-serif mr-1">ORK</div>
                    <img className="size-10 rotate-90 relative bottom-5 right-1
                " src="/stock/leaf.png"></img>
                </div >

                <div ref={elemImg5} className="
            border-2 border-green-700 h-[80%] m-3
            opacity-0">

                </div>

                <img ref={elemImg6} className="w-full
            relative right-28 scale-[0] z-20
            "
                    src="/logo.png"></img>
            </div>
        ]
        )
    }

    async function closeTheLoopAnimation() {
        await up(elemImg6);
        await pleaseWait(200);
        await fade(elemImg6.current, 6, 2, 110, 0
            , 'right', 'minus', 0
        );
        await fade(elemImg5.current, 20, 2.9, 50, 0
            , 'right', 'minus', 1
        );
        await fade(elemImg3.current, 20, 10, 16, 240
            , 'right', 'plus', 0
        );

        await fade(elemImg5.current, 20, 2.9, 50, 0
            , 'right', 'minus', -1
        );

        if (window.innerWidth <= 500) {
            await fade(elem1.current, 8, 10, 0, window.innerWidth, 'right', 'plus', 0);
        }
        else if (window.innerWidth > 500 && window.innerWidth <= 800) {
            await fade(elem1.current, 8, 11, 0, window.innerWidth, 'right', 'plus', 0);
        }
        else {
            await fade(elem1.current, 8, 19, 0, window.innerWidth, 'right', 'plus', 0);
        }

    }

    useEffect(() => {


        if (toggleTo === 'on') {
            refLoopAnimationClose.current = false;
            startAnimationType("The Loop Animation", refLoopAnimationId
                , refLoopAnimationClose, async (closeBool) => {

                    console.log("running animation cycle");
                    elemImg2.current.style.opacity = 0;
                    await upDown(elemImg1, 'ref', closeBool);
                    await fadeAgainAgain(elemImg2, 'ref',
                        closeBool);

                    await pleaseWait(200);


                }
            )

        }

        else if (toggleTo === 'off') {
            console.log('animation off');

            refLoopAnimationClose.current = true;
            cancelAnimationFrame(refLoopAnimationId.current);

            newStructure();

        }

        else if (toggleTo === 'undefined') {
            console.log('toggle to on will start the animations, you must also able to control it');
        }
        else if (toggleTo === 'cancel') {
            refLoopAnimationClose.current = true;
            cancelAnimationFrame(refLoopAnimationId.current);
        }



        return (() => {
            refLoopAnimationClose.current = true;
            cancelAnimationFrame(refLoopAnimationId.current);
        });
    }, [toggleTo])

    useEffect(() => {
        if (container[1]) {
            ;
            closeTheLoopAnimation();

        }
    }, [container])

    return (
        <>
            {/* 
        
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
            */
            }


            <div ref={elem1} className="w-screen
             fixed   top-0 h-screen z-30
             bg-emerald-900
            flex flex-row justify-around
                items-center">

                {container}

            </div>
        </>
    );
}


export { TheLoopAnimation }
