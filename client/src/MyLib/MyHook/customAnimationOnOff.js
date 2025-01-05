import { useEffect, useState, useRef } from "react";
import { fade } from '../Animation/animation';

function useAnimationOnOff(secElem) {
    const onOffSwitch = useRef(false);

    async function on() {
        if (!onOffSwitch.current) {
            await fade(secElem.current, 10, 0.5, -30, 0, 'right',
                'plus', 1);
            onOffSwitch.current = true;
        }
        else {
            // alert('wrong call to on() of section1');
            // console.error('wrong call to on() of section1');
        }
    }

    async function off() {
        if (onOffSwitch.current) {
            await fade(secElem.current, 10, 0.5, 0, 30, 'right',
                'plus', -1);
            onOffSwitch.current = false;
        }
        else {
            // alert('wrong call to off() of section1');
            //console.error('wrong call to off() of section1');
        }
    }

    useEffect(() => {

        return (() => {

        });

    }, []);

    return {
        on: on,
        off: off
    };

}


export { useAnimationOnOff };