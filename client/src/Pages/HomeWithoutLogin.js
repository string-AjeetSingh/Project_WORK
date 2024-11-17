import { Header } from "../Components/Header/header";
import { fade, ButtonAnimation } from '../MyLib/Animation/animation';

import { useEffect, useRef, useState } from 'react';


function BigButton({ children, className, resetClassName = false, AddOnClassName }) {
    const bref = useRef(null);
    return (
        <>
            <button ref={bref} onClick={async () => {
                await ButtonAnimation(bref);
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

function Section1({ children }) {
    const iref = useRef(null);
    const href = useRef(null);
    const asectionref = useRef(null);

    const [size, setsize] = useState([window.innerWidth, window.innerHeight]);


    useEffect(() => {

        window.addEventListener('resize', () => {
            setsize([window.innerWidth, window.innerHeight]);
        });

        async function wrapper(){

            if (size[0] <= 751) {
             await fade(asectionref.current, 15, 0.5, -30, 0, 'right', 'plus', 1);
             await fade(iref.current, 5, 0.5, -100, 0, 'top', 'plus', 1);
             await fade(href.current, 15, 0.5, -30, 0, 'left', 'plus', 1);
            }
            else{
                 fade(href.current, 10, 0.5, -60, 0, 'right', 'plus', 1);
                 fade(iref.current, 10, 0.5, -60, 0, 'left', 'plus', 1);
            }

        }

        wrapper();


    }, [])


    if (size[0] <= 751) {
        return (
            <>
                <section ref={asectionref}
                    className="flex flex-col justify-center
            items-center m-1 mb-10 mt-2 p-1  ">

                    <div ref={href} className="flex flex-col justify-center
            items-center m-1 mb-5 mt-2 p-1 relative opacity-0 " >

                        <div
                            className="font-serif text-5xl 
                        text-center font-semibold m-2 
                        text-green-800 ">

                            To <br></br>Your Destination
                        </div>

                        <h3
                            className="font-normal font-serif">Do <span className=" text-green-800 font-serif
                        text-2xl font-bold "><u>WORK</u>
                            </span> you <span className=" text-green-800
            text-2xl font-serif font-bold "><u>WANT</u></span>
                        </h3>


                    </div>

                    <img
                        ref={iref} className="size-48 m-2 opacity-0
                        relative"
                        src='./logo.png' alt="logo">
                    </img>

           
                    <BigButton AddOnClassName={`w-[60%]`}>Let's Find It</BigButton>
           

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
    text-left font-semibold m-2 
    text-green-800 ">

                            To <br></br>Your Destination


                            <div
                                className="text-xl text-black font-normal">

                                <h3>Do <span className=" text-green-800 font-serif
    text-2xl font-bold "><u>WORK</u>
                                </span> you <span className=" text-green-800
                             text-2xl font-serif font-bold "><u>WANT</u></span></h3>
                            </div>
                        </div>
                        <BigButton>Let's Find It</BigButton>
                    </div>

                    <img ref={iref} className="size-48 m-4 
                    relative opacity-0"
                        src='./logo.png' alt="logo"></img>


                </section> <hr className="border-[1px] 
                             border-green-950"></hr>

            </>
        );

    }


}




function HomeWithoutLogin({ children }) {



    return (
        <>
            <header>
                <Header></Header>
            </header><hr className="border-[1px] 
     border-green-950"></hr>

            <main>

                <Section1></Section1>

            </main>

            <footer>

            </footer>
        </>
    );
}



export { HomeWithoutLogin };