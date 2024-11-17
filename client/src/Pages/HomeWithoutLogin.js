import { Header } from "../Components/Header/header";
import {fade, ButtonAnimation} from '../MyLib/Animation/animation';

import {useRef, useState} from 'react';

function HomeWithoutLogin({children}){
 const iref = useRef(null);
 const bref = useRef(null);
    

    return (
    <>
    <header>
        <Header></Header>
    </header><hr className="border-[1px] 
     border-green-950"></hr>

    <main>

      <section className="flex flex-row justify-center
       items-center m-1 mb-10 mt-10 p-1 ">
        <div className="flex flex-col border-x-2 border-green-950  ">
            <div className="font-serif text-7xl w-[500px] 
            text-left font-semibold m-2 
            text-green-800 ">
                To <br></br>Your Destination
            </div>
            <button ref={bref} onClick={async ()=>{
                await ButtonAnimation(bref);
            }}
            className="hover:bg-green-800 hover:text-blue-400
           active:bg-green-900
           rounded-3xl text-6xl font-serif font-medium
            bg-sky-900 text-green-600
            m-2 p-2 border-2 border-green-950 ">
                Let's Find it
            </button>
        </div>

        <img  ref={iref} className="size-48 m-4 relative"
         src='./logo.png' alt="logo"></img>
        </section> <hr className="border-[1px] 
     border-green-950"></hr> 
        
    </main>

    <footer>

    </footer>
     </>
    );
}



export {HomeWithoutLogin};