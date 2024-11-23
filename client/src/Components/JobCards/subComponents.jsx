import { useEffect, useRef, useState } from 'react';


function Container({ children }) {
    return (
        <>
            <div className="border-2 border-black mb-3 ">
                {children}
            </div>
        </>
    );
}


function ContainerNav({ data, common, setCommon,setContainer, children, isDefault=null, thekey }) {

    const aref = useRef(null);
    const [lstate, setlstate] = useState('border-slate-400');
   
   

    function handleClick() {
        setlstate('border-black');
        setContainer(data);
       

        console.log('from ContainerNav below common');
        console.log(common);

        if(common.current) {
            if(common.current.previousKey !== thekey){
                common.current.previous();
            }
        }

       setCommon({previous : setOff, previousKey : thekey});
         console.log(common);
    }

    function setOff() {
        setlstate('border-slate-400');
       
    }

    useEffect(()=>{
        if(isDefault){
            handleClick();
            setlstate('border-black');
        }
    }, [])


    return (
        <>

            <button ref={aref} onClick={handleClick}
                className={`border-2 ${lstate} m-1 p-3 font-serif 
                hover:bg-green-700 
               text-[1.2rem] rounded-md`}>
                {children}
            </button>
        </>
    );
}

function Card({ companyName, imgSrc, jobHeading,
    timeAgo, tag }) {
    return (
        <>
            <div className=' flex flex-col m-2 p-2 items-center border-2
             border-black rounded-lg font-serif text-slate-300'>

                <div className="flex flex-row justify-between w-full">
                    <div>{timeAgo} Ago</div> <div className='p-2 text-slate-300 bg-blue-950'>{tag}</div>
                </div>

                <div className='flex flex-row flex-start w-full'>
                    <img className='m-1' src={imgSrc} alt='company image'></img> <div className='text-[1.2rem]'>{companyName}</div>
                </div>

                <div className='text-[1.3rem] underline'>{jobHeading}</div> 
                <hr className='w-full m-1 border-1 border-green-800 rounded-md'></hr>

                <div className='p-2 m-1 text-green-300 font-serif font-bold self-start
                 bg-green-900 rounded-r-2xl' >{tag}</div>

            </div>
        </>
    );
}


export{Container, ContainerNav, Card};