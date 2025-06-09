

import { useEffect, useState, useRef } from "react";


function useResizeValue(params) {
    const [state, setstate] = useState(params);

    function handleResize() {
        setstate(window.innerWidth);
    }

    useEffect(() => {

        window.addEventListener('resize', handleResize);

        return (() => {
            window.removeEventListener('resize', handleResize);
        });

    }, []);

    return state;

}


export { useResizeValue };