import { useRef, useEffect } from "react";

function AboutJob({ children }) {
    return (<>
    <div className="p-2">
        <div className="flex flex-row justify-start 
        items-center mb-2">
            <div className="rounded-full size-10
            mr-2  bg-slate-500">

            </div>
            <div className="font-serif text-2xl text-green-800
            font-bold">
                Mirosoft
            </div>
        </div>
        

         <div className="text-[1.2rem] font-serif underline
          text-slate-500 w-[60%] min-w-[320px]">
         Software Designer, fresher job posting for Microsoft entry level working batch
         </div>
        <div className="flex flex-row justify-end">
            <button className="rounded-full font-serif font-bold
            text-2xl p-2 pr-5 pl-5 m-1 border-2 text-blue-800 border-blue-800
             bg-blue-400 hover:border-black 
             active:bg-blue-600 active:text-blue-400">
                Apply
            </button>

        </div>
        <hr className="w-full mt-1 mb-1 rounded-xl border-1 
            border-slate-500"></hr>

            <div className="font-serif text-2xl text-slate-500 font-bold">
                About:
            </div>
            <div className="relative left-5">
            - Dummy row about some thing. <br></br> 
            - Dummy row about some thing <br></br> 
            - Dummy row about some thing <br></br>
            - Dummy row about some thing <br></br>
            - Dummy row about some thing <br></br>
            </div><br></br>

            <div className="font-serif text-2xl text-slate-500 font-bold">
                Qualification:
            </div>
            <div className="relative left-5">
            - Dummy row about some thing. <br></br> 
            - Dummy row about some thing <br></br> 
            - Dummy row about some thing <br></br>
            - Dummy row about some thing <br></br>
            - Dummy row about some thing <br></br>
            </div><br></br>

            <div className="font-serif text-2xl text-slate-500 font-bold">
                Responsibilities:
            </div>
            <div className="relative left-5">
            - Dummy row about some thing. <br></br> 
            - Dummy row about some thing <br></br> 
            - Dummy row about some thing <br></br>
            - Dummy row about some thing <br></br>
            - Dummy row about some thing <br></br>
            </div>
            <hr className="w-full mt-1 mb-1 rounded-xl border-1 
            border-slate-500"></hr>
            <div className="m-1 flex flex-row flex-wrap justify-between">

                <div className="m-1">
               <div className="font-serif font-bold text-[1.2rem]">Email : </div>
               <span className="relative bottom-2">Mirosoft@gmail.com</span> 
                </div>
                <div className="m-1">
                <div className="font-serif font-bold text-[1.2rem]">X : </div>
                <span className="relative bottom-2">Mirosoft</span>     
                </div>
               
               <div className="m-1">
               <div className="font-serif font-bold text-[1.2rem]">GitHub : </div>
               <span className="relative bottom-2">Mirosoft_Comunnity</span>
               </div>
                
            </div>
    </div>
    </>);
}

export { AboutJob };