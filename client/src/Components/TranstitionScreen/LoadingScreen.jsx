import { useSearchParams } from "react-router-dom";
import { TheLoopAnimation } from "./subComponents";
import { useEffect, useState } from "react";

function LoadingScreen({ outControl }) {
    const [animationFlow, setanimationFlow] = useState('undefined');


    function toggleAnimationFlow(bool) {
        if (bool) {
            setanimationFlow('on');
        }
        else {
            setanimationFlow('off');

        }
    }

    function on() {
        setanimationFlow('on');
    }
    function off() {
        setanimationFlow('off');
    }
    function cancel() {
        setanimationFlow('cancel');
    }

    useEffect(() => {
        //    toggleAnimationFlow(false);
        if (outControl) {
            outControl.current = { on, off, cancel };
        }
    }, [])

    return (
        <>
            {/* 
             <he>We are going to create a loading screen for sure -- </he>
            <OnOfButton
                setFunction={toggleAnimationFlow}>
                Toggle TheLoopAnimation
            </OnOfButton >
        */
            }

            <TheLoopAnimation toggleTo={animationFlow} />

        </>
    );
}

function OnOfButton({ children, setFunction }) {

    const [toggle, settoggle] = useState(false);

    function handleClick() {
        if (toggle === false) {
            settoggle(true);
            setFunction(true);
        }
        else {
            settoggle(false);
            setFunction(false);
        }
    }

    return (
        <>
            <button className="block m-2 border-2 
            p-1  pr-4 pl-4 bg-violet-700 font-bold
            active:rounded-full
            text-2xl rounded-xl text-center "
                onClick={() => {
                    handleClick();
                }}>
                {children}
            </button>
        </>
    );

}


export { LoadingScreen }