import { Header } from "../Components/Header/header";
import { Footer } from "../Components/Footer/footer";
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

    async function theAnimation() {

        if (size[0] <= 751) {
            await fade(asectionref.current, 15, 0.5, -30, 0, 'right', 'plus', 1);
            await fade(iref.current, 5, 0.5, -100, 0, 'top', 'plus', 1);
            await fade(href.current, 15, 0.5, -30, 0, 'left', 'plus', 1);
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


                    <BigButton AddOnClassName={`w-[60%] min-w-[19rem]`}>Let's Find It</BigButton>


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

function Section2({ children }) {
    const [astr, setastr] = useState(null);
    const [size, setsize] = useState([window.innerWidth, window.innerHeight]);
    const headingref = useRef(null);
    const [headingOn, setheadingOn] = useState(null);

    async function theHeadingAnimation(elem, mode) {
        //fade(elem, )
        if(mode){
            await fade(elem, 15, 0.5, -30, 0, 'right', 'plus', 1);
        }
        else if(!mode){
            await fade(elem, 15, 0.5, 0, -30, 'left', 'minus', -1);
        }
    }

    useEffect(()=>{
        let posofit = null;
        let headingswitch = false;
        window.addEventListener('resize', ()=>{
            setsize([window.innerWidth, window.innerHeight]);
        })
        window.addEventListener('scroll', ()=>{
            posofit = headingref.current.getBoundingClientRect();
            console.log(posofit.bottom);
            
            if(posofit.bottom >= 30 && !headingswitch){
             
                    setheadingOn(true);
                    headingswitch=true;
       
            }
            else if(posofit.bottom < 30 && headingswitch){

               
                 setheadingOn(false);
                 headingswitch=false;

             }
            
        })


    }, [])

    useEffect(()=>{
        if(headingOn != null){

            if(headingOn){
                theHeadingAnimation(headingref.current, headingOn);
            }
            else if(!headingOn){
              
                theHeadingAnimation(headingref.current, headingOn);
            }
        }
    }, [headingOn])
    
    if(size[0] <= 664){
        return (
            <>
                <section className="m-4">
    
                    <div className="flex flex-row  
                    font-serif font-bold text-green-900
                    items-center justify-start mb-[2px] ">
                        <h2 ref={headingref} 
                        className="text-[2.9rem]" >Unemployed</h2>
                        <h1 className="text-8xl">?</h1>
                    </div>
            
                    <div className="relative 
                    bottom-6 font-serif text-[1.2rem] 
                    sm:text-2xl md:text-3xl
                    ml-2 text-slate-950 ">
                            Find the <br/>Best For You <br>
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
    
    
                        <BigButton
                            AddOnClassName="font-bold absolute
                        bottom-7 left-5 
                        w-[50%] z-[1] min-w-[200px]
                        max-w-[300px]
                         "
                        >
                            Find</BigButton>
                        <img className="size-[50%]
                        max-w-[450px] min-w-[280px]
                        relative ml-5 border-b-2 border-black "
                            src='./stock/bussinessman1.png'
                            alt="stock img"></img>
    
                    </div>
    
                </section><hr className="border-[1px] 
            border-green-950"></hr>
    
            </>
        );
    }
    else{
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
                            Find the <br/>Best For You <br>
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
    
                        <BigButton
                            AddOnClassName="font-bold absolute
                        bottom-1 left-5 
                        w-[50%] z-[1] min-w-[200px]
                        max-w-[300px]
                         "
                        >
                            Find</BigButton>
                        <img className="size-[50%]
                        max-w-[450px] min-w-[280px]
                        relative ml-5 border-b-2 border-black"
                            src='./stock/bussinessman1.png'
                            alt="stock img"></img>
    
                    </div>
    
                </section><hr className="border-[1px] 
            border-green-950"></hr>
    
            </>
        );
    }
   
}


function Section3({ children }) {
  
    const [size, setsize] = useState([window.innerWidth, window.innerHeight]);

    useEffect(()=>{
        window.addEventListener('resize', ()=>{
            setsize([window.innerWidth, window.innerHeight]);
        })


    }, [])
    
    if(size[0] <= 664){
        return (
            <>
                <section className="m-4">
    
                    <div className="flex flex-row  
                     overflow-hidden 
                    font-serif font-bold text-green-900
                    items-center justify-start mb-[2px] ">
                        <h2 className="text-[2.9rem]" >Provide Work</h2>
                        <h1 className="text-8xl"></h1>
                    </div>
            
                    <div className="relative 
                    bottom-6 font-serif text-[1.2rem] 
                    sm:text-2xl md:text-3xl
                    ml-2 text-slate-950 ">
                            Give Opportunities, <br/>Trust People <br>
                            </br>On WORK Platform ...
                            <p className="text-slate-950 text-sm ml-2">
                                <ul className="list-disc">
                                    <li>Login As 'Provider'</li>
                                    <li>Set Profile</li>
                                    <li>Create Job</li>
                                    <li>finally - Post It </li>
                                </ul>
                            </p>
                        </div>
                 
                    <div className="flex flex-row flex-wrap justify-right 
                    items-center rounded-2xl pt-4 overflow-hidden
                    relative border-2 border-green-900 
                    border-l-2 border-l-slate-950">
    
    
                        <BigButton
                            AddOnClassName="font-bold absolute
                        bottom-7 right-5 
                        w-[50%] z-[1] min-w-[200px]
                        max-w-[300px]
                         "
                        >
                            Provide</BigButton>
                        <img className="size-[50%]
                        max-w-[450px] min-w-[280px]
                        relative ml-5 -left-20 "
                            src='./stock/bussinessman2.png'
                            alt="stock img"></img>
    
                    </div>
    
                </section><hr className="border-[1px] 
            border-green-950"></hr>
    
            </>
        );
    }
    else{
        return (
            <>
                <section className="m-4">
    
                    <div className="flex flex-row  
                    font-serif font-bold text-green-900
                    items-center justify-start mb-[2px] ">
                        <h2 className="text-6xl">Provide Work</h2>
                        <h1 className="text-9xl"></h1>
                    </div>
    
                 
                    <div className="flex flex-row flex-wrap justify-center 
                    items-center rounded-2xl pt-4 overflow-hidden
                    relative border-2 border-green-900
                  ">
    
                        <img className="size-[50%]
                        max-w-[450px] min-w-[280px]
                        relative ml-5 border-b-2 border-black "
                            src='./stock/bussinessman2.png'
                            alt="stock img"></img>

                        <div className="relative 
                    bottom-0 font-serif text-[1.2rem] 
                    sm:text-2xl md:text-3xl
                    ml-2 text-slate-900 ">
                            Give Opportunities, <br/>Trust People <br>
                            </br>On WORK Platform ...
                            <p className="text-slate-950 text-sm ml-2">
                                <ul className="list-disc">
                                <li>Login As 'Provider'</li>
                                    <li>Set Profile</li>
                                    <li>Create Job</li>
                                    <li>finally - Post It </li>
                                </ul>
                            </p>
                        </div>
    
                        <BigButton
                            AddOnClassName="font-bold absolute
                        bottom-1 right-5 
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




function HomeWithoutLogin({ children }) {
    
 

    return (
        <>
            <header>
                <Header></Header>
            </header><hr className="border-[1px] 
     border-green-950"></hr>

            <main>

                <Section1></Section1>
                <Section2></Section2>
                <Section3></Section3>

            </main>

            <footer>
                <Footer></Footer>
            </footer>
        </>
    );
}



export { HomeWithoutLogin };