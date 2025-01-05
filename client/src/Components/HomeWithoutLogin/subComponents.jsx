
import { fade, ButtonAnimation } from '../../MyLib/Animation/animation';
import { sAnimation } from "../../MyLib/ScrollAnimation/sAnimation";
import { useNavigate } from 'react-router-dom';

import { useEffect, useRef, useState } from 'react';


function BigButton({ children, className, resetClassName = false, AddOnClassName, aref,
    handleClick
}) {
    const bref = useRef(null);


    useEffect(() => {
        if (aref) {

            aref.current = bref.current;
        }
    }, [])
    return (
        <>
            <button ref={bref} onClick={async () => {
                await ButtonAnimation(bref);
                if (handleClick) {
                    //alert('handleLogin')
                    handleClick();
                }
            }}
                className={resetClassName ? className : `"hover:bg-green-800 hover:text-blue-400 
                                     active:bg-green-900
                                                 rounded-3xl text-4xl font-serif font-medium
                                                 bg-sky-900 text-green-600
                                                 m-2 p-2 border-2 border-green-950 ${AddOnClassName} `}>
                {children}
            </button>
        </>
    );
}

function Section1({ children, login }) {
    const iref = useRef(null);
    const href = useRef(null);
    const asectionref = useRef(null);
    const navigate = useNavigate();

    const [size, setsize] = useState([window.innerWidth, window.innerHeight]);

    async function theAnimation() {

        if (size[0] <= 751) {
            fade(asectionref.current, 15, 0.5, -30, 0, 'right', 'plus', 1);
            //await fade(iref.current, 2, 0.5, -100, 0, 'top', 'plus', 1);
            fade(href.current, 15, 0.5, -30, 0, 'left', 'plus', 1);
        }
        else {
            fade(href.current, 10, 0.5, -60, 0, 'right', 'plus', 1);
            fade(iref.current, 10, 0.5, -60, 0, 'left', 'plus', 1);
        }

    }


    useEffect(() => {

        window.addEventListener('resize', () => {
            setsize([window.innerWidth, window.innerHeight]);
        });



        theAnimation();

    }, [])


    if (size[0] <= 751) {
        return (
            <>
                <section ref={asectionref}
                    className="flex flex-col justify-center
            items-center m-1 mb-10 mt-2 p-1    ">

                    <div ref={href} className="flex flex-col justify-center
            items-center m-1 mb-5 mt-2 p-1 relative opacity-0 " >

                        <div
                            className="font-serif text-5xl  relative
                        text-center font-semibold m-2  flex flex-col items-center
                        h-fit 
                        text-green-800 ">


                            <div className=' flex flex-row justify-center relative '>
                                <div className="absolute opacity-50
                            w-12 rotate-90 top-[-25px] left-[50px]">
                                    <img className="w-full"
                                        alt="stock image"
                                        src="/stock/leaf.png"></img>
                                </div>
                                To
                            </div>

                            Your Destination
                        </div>


                        <h3
                            className="font-normal font-serif text-black">Do <span className=" text-green-800 font-serif
                        text-2xl font-bold "><u>WORK</u>
                            </span> you <span className=" text-green-800
            text-2xl font-serif font-bold "><u>WANT</u></span>
                        </h3>


                    </div>

                    <img
                        ref={iref} className="size-48 m-2 
                        relative"
                        src='/logo.png' alt="logo">
                    </img>


                    <BigButton handleClick={() => {
                        login();
                    }}
                        AddOnClassName={`w-[60%] min-w-[19rem]`}>Let's Find It</BigButton>


                </section> <hr className="border-[1px] 
            border-green-950"></hr>

            </>
        );

    }
    else {
        return (
            <>
                <section
                    className="flex flex-row justify-center
        items-center m-1 mb-10 mt-10 p-1  ">

                    <div ref={href}
                        className="flex flex-col  opacity-0 relative
    border-green-950  ">

                        <div className="font-serif text-7xl w-[500px] 
    text-left font-semibold m-2 relative 
    text-green-800 ">
                            <div className="absolute opacity-50
                            w-14 rotate-90 left-[90px] top-[-20px]">
                                <img className="w-full"
                                    alt="stock image"
                                    src="/stock/leaf.png"></img>
                            </div>
                            To <br></br>Your Destination


                            <div
                                className="text-xl text-black font-normal">

                                <h3>Do <span className=" text-green-800 font-serif
    text-2xl font-bold "><u>WORK</u>
                                </span> you <span className=" text-green-800
                             text-2xl font-serif font-bold "><u>WANT</u></span></h3>
                            </div>
                        </div>
                        <BigButton handleClick={() => {
                            login();
                        }}>Let's Find It</BigButton>
                    </div>

                    <img ref={iref} className="size-48 m-4 
                    relative opacity-0"
                        src='/logo.png' alt="logo"></img>


                </section> <hr className="border-[1px] 
                             border-green-950"></hr>

            </>
        );

    }


}

function Section2({ children, login }) {

    const [size, setsize] = useState([window.innerWidth, window.innerHeight]);
    const headingref = useRef(null);
    const elemRef2 = useRef(null);
    const elemRef3 = useRef(null);
    const elemRef4 = useRef(null);



    function handleSize() {
        setsize([window.innerWidth, window.innerHeight]);
    }



    useEffect(() => {

        let startProperties = {
            timerMillisecond: 15, updatingVal: 0.5, startPos: -30,
            stopPos: 0, direction: 'left', type: 'plus',
            opacityOperation: 1
        };

        let stopProperties = {
            timerMillisecond: 15, updatingVal: 0.5, startPos: 0,
            stopPos: -30, direction: 'left', type: 'minus',
            opacityOperation: -1
        }

        let startelemRef3 = {
            timerMillisecond: 10, updatingVal: 0.5, startPos: -20,
            stopPos: 0, direction: 'bottom', type: 'plus',
            opacityOperation: 1
        };

        let stopelemRef3 = {
            timerMillisecond: 10, updatingVal: 0.5, startPos: 0,
            stopPos: -20, direction: 'bottom', type: 'minus',
            opacityOperation: -1
        }

        let startelemRef2 = {
            timerMillisecond: 10, updatingVal: 0.5, startPos: -25,
            stopPos: 10, direction: 'left', type: 'plus',
            opacityOperation: 1
        };

        let stopelemRef2 = {
            timerMillisecond: 10, updatingVal: 0.5, startPos: 10,
            stopPos: -25, direction: 'left', type: 'minus',
            opacityOperation: -1
        }

        let aScrollAnimationObject = new sAnimation(headingref.current,
            startProperties, stopProperties
        );
        let aScrollAnimationObject2 = new sAnimation(elemRef3.current,
            startelemRef3, stopelemRef3
        );
        let aScrollAnimationObject3 = new sAnimation(elemRef2.current,
            startelemRef2, stopelemRef2
        );

        function wrapper() {
            aScrollAnimationObject.theLogin();
            aScrollAnimationObject2.theLogin();
            aScrollAnimationObject3.theLogin();
        }

        window.addEventListener('resize', handleSize);

        window.addEventListener('scroll', wrapper);



        return () => {

            window.removeEventListener('scroll', wrapper);
            window.removeEventListener('resize', handleSize);
            aScrollAnimationObject = null;
            aScrollAnimationObject2 = null;
            aScrollAnimationObject3 = null;
        }

    }, [])

    if (size[0] <= 664) {
        return (
            <>
                <section className="m-4">

                    <div className="flex flex-row 
                    font-serif font-bold text-green-900
                    items-center justify-start mb-3">
                        <h2 ref={headingref}
                            className="text-[2.9rem] relative opacity-0" >Unemployed</h2>
                        <h1 className={`${size[0] < 380 ? "text-5xl" : "text-7xl"}`}>?</h1>
                    </div>

                    <div className="relative 
                    bottom-6 font-serif text-[1.2rem] 
                    sm:text-2xl md:text-3xl
                    ml-2 text-slate-950 ">
                        Find the <br />Best For You <br>
                        </br>With Very Simple Steps ...
                        <p className="text-slate-950 text-sm ml-2">
                            <ul className="list-disc">
                                <li>Login In</li>
                                <li>Set Profile</li>
                                <li>Build Resume</li>
                                <li>finally - Apply </li>
                            </ul>
                        </p>
                    </div>

                    <div className="flex flex-row flex-wrap justify-center 
                    items-center rounded-2xl pt-4
                    relative border-2 border-green-900">


                        <BigButton aref={elemRef2}
                            handleClick={login}
                            AddOnClassName="font-bold absolute
                        bottom-7 left-5 
                        w-[50%] z-[1] min-w-[200px]
                        max-w-[300px] opacity-0 
                         "
                        >
                            Find</BigButton>
                        <img ref={elemRef3} className="size-[50%]
                        max-w-[450px] min-w-[280px] opacity-0
                        relative ml-5 border-b-2 border-black "
                            src='/stock/bussinessman1.png'
                            alt="stock img"></img>

                    </div>

                </section><hr className="border-[1px] 
            border-green-950"></hr>

            </>
        );
    }
    else {
        return (
            <>
                <section className="m-4">

                    <div className="flex flex-row  
                    font-serif font-bold text-green-900
                    items-center justify-start mb-[2px] ">
                        <h2 ref={headingref} className="text-6xl opacity-0 relative">Unemployed</h2>
                        <h1 className="text-9xl">?</h1>
                    </div>


                    <div className="flex flex-row flex-wrap justify-center 
                    items-center rounded-2xl pt-4
                    relative border-2 border-green-900">

                        <div className="relative 
                    bottom-0 font-serif text-[1.2rem] 
                    sm:text-2xl md:text-3xl
                    ml-2 text-slate-900 ">
                            Find the <br />Best For You <br>
                            </br>With Very Simple Steps ...
                            <p className="text-slate-950 text-sm ml-2">
                                <ul className="list-disc">
                                    <li>Login In</li>
                                    <li>Set Profile</li>
                                    <li>Build Resume</li>
                                    <li>finally - Apply </li>
                                </ul>
                            </p>
                        </div>

                        <BigButton aref={elemRef2}
                            handleClick={login}
                            AddOnClassName="font-bold absolute
                        bottom-1 left-5 opacity-0
                        w-[50%] z-[1] min-w-[200px]
                        max-w-[300px]
                         "
                        >
                            Find</BigButton>
                        <img ref={elemRef3} className="size-[50%]
                        max-w-[450px] min-w-[280px] opacity-0
                        relative ml-5 border-b-2 border-black"
                            src='/stock/bussinessman1.png'
                            alt="stock img"></img>

                    </div>

                </section><hr className="border-[1px] 
            border-green-950"></hr>

            </>
        );
    }

}


function Section3({ children, login }) {

    const [size, setsize] = useState([window.innerWidth, window.innerHeight]);
    const headingref = useRef(null);
    const elemRef2 = useRef(null);
    const elemRef3 = useRef(null);

    function handleSize() {
        setsize([window.innerWidth, window.innerHeight]);
    }

    useEffect(() => {

        let startProperties = {
            timerMillisecond: 15, updatingVal: 0.5, startPos: -30,
            stopPos: 0, direction: 'left', type: 'plus',
            opacityOperation: 1
        };

        let stopProperties = {
            timerMillisecond: 15, updatingVal: 0.5, startPos: 0,
            stopPos: -30, direction: 'left', type: 'minus',
            opacityOperation: -1
        }

        let startelemRef3 = {
            timerMillisecond: 10, updatingVal: 0.5, startPos: -60,
            stopPos: -30, direction: 'left', type: 'plus',
            opacityOperation: 1
        };

        let stopelemRef3 = {
            timerMillisecond: 10, updatingVal: 0.5, startPos: -30,
            stopPos: -60, direction: 'left', type: 'minus',
            opacityOperation: -1
        }

        let startelemRef2 = {
            timerMillisecond: 10, updatingVal: 0.5, startPos: -25,
            stopPos: 10, direction: 'right', type: 'plus',
            opacityOperation: 1
        };

        let stopelemRef2 = {
            timerMillisecond: 10, updatingVal: 0.5, startPos: 10,
            stopPos: -25, direction: 'right', type: 'minus',
            opacityOperation: -1
        }

        let aScrollAnimationObject = new sAnimation(headingref.current,
            startProperties, stopProperties
        );

        let aScrollAnimationObject2 = new sAnimation(elemRef3.current,
            startelemRef3, stopelemRef3
        );
        let aScrollAnimationObject3 = new sAnimation(elemRef2.current,
            startelemRef2, stopelemRef2
        );

        function wrapper() {
            aScrollAnimationObject.theLogin();
            aScrollAnimationObject2.theLogin();
            aScrollAnimationObject3.theLogin();
        }

        window.addEventListener('resize', handleSize);

        window.addEventListener('scroll', wrapper);


        window.addEventListener('resize', handleSize());

        return () => {

            window.removeEventListener('scroll', wrapper);
            window.removeEventListener('resize', handleSize);
            aScrollAnimationObject = null;
            aScrollAnimationObject2 = null;
            aScrollAnimationObject3 = null;
        }

    }, [])

    if (size[0] <= 664) {
        return (
            <>
                <section className="m-4">

                    <div className="flex flex-row  
                     overflow-hidden 
                    font-serif font-bold text-green-900
                    items-center justify-start mb-[2px] ">
                        <h2 ref={headingref} className="text-[2.9rem] mb-4 relative opacity-0" >Provide Work</h2>
                        <h1 className="text-8xl"></h1>
                    </div>

                    <div className="relative 
                    bottom-6 font-serif text-[1.2rem] 
                    sm:text-2xl md:text-3xl
                    ml-2 text-slate-950 ">
                        Give Opportunities, <br />Trust People <br>
                        </br>On WORK Platform ...
                        <p className="text-slate-950 text-sm ml-2">
                            <ul className="list-disc">
                                <li>Login </li>
                                <li>Switch To Provider</li>
                                <li>Create Job</li>
                                <li>Finally - Post It </li>
                            </ul>
                        </p>
                    </div>

                    <div className="flex flex-row flex-wrap justify-right 
                    items-center rounded-2xl pt-4 overflow-hidden
                    relative border-2 border-green-900 
                    border-l-2 border-l-slate-950">


                        <BigButton aref={elemRef2}
                            handleClick={login}
                            AddOnClassName="font-bold absolute
                        bottom-7 right-5 
                        w-[50%] z-[1] min-w-[200px]
                        max-w-[300px] opacity-0
                         "
                        >
                            Provide</BigButton>
                        <img ref={elemRef3} className="size-[50%] opacity-0
                        max-w-[450px] min-w-[280px]
                        relative ml-5 -left-20 "
                            src='/stock/bussinessman2.png'
                            alt="stock img"></img>

                    </div>

                </section><hr className="border-[1px] 
            border-green-950"></hr>

            </>
        );
    }
    else {
        return (
            <>
                <section className="m-4">

                    <div className="flex flex-row  
                    font-serif font-bold text-green-900
                    items-center justify-start mb-[2px] ">
                        <h2 ref={headingref} className="text-6xl opacity-0 relative">Provide Work</h2>
                        <h1 className="text-9xl"></h1>
                    </div>


                    <div className="flex flex-row flex-wrap justify-center 
                    items-center rounded-2xl pt-4 overflow-hidden
                    relative border-2 border-green-900
                  ">

                        <img ref={elemRef3} className="size-[50%] opacity-0
                        max-w-[450px] min-w-[280px]
                        relative ml-5 border-b-2 border-black "
                            src='/stock/bussinessman2.png'
                            alt="stock img"></img>

                        <div className="relative 
                    bottom-0 font-serif text-[1.2rem] 
                    sm:text-2xl md:text-3xl
                    ml-2 text-slate-900 ">
                            Give Opportunities, <br />Trust People <br>
                            </br>On WORK Platform ...
                            <p className="text-slate-950 text-sm ml-2">
                                <ul className="list-disc">
                                    <li>Login </li>
                                    <li>Switch To Provider</li>
                                    <li>Create Job</li>
                                    <li>Finally - Post It </li>
                                </ul>
                            </p>
                        </div>

                        <BigButton aref={elemRef2}
                            handleClick={login}
                            AddOnClassName="font-bold absolute
                        bottom-1 right-5 opacity-0
                        w-[50%] z-[1] min-w-[200px]
                        max-w-[300px]
                         "
                        >
                            Provide </BigButton>

                    </div>

                </section><hr className="border-[1px] 
            border-green-950"></hr>

            </>
        );
    }

}


export { Section1, Section2, Section3, BigButton }