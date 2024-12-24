import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";



function Card({ companyName, imgSrc, jobHeading,
    timeAgo, tag, prev, index, location, theClick,
    dataToSetOnState, setState, isDefault, docNo }) {

    const aref = useRef(null);
    const [lstate, setlstate] = useState('border-green-800');
    const navigate = useNavigate();

    function off() {
        setlstate('border-green-800');
    }

    function handleClick() {
        if (theClick === 'link') {
            // alert('going to use link');
            // navigate('/jobDetail/' + docNo);

            return;
        }

        setlstate('border-slate-400');
        setState(dataToSetOnState);
        //console.log('from cards the state function ; ', setState);
        // console.log('the data to set on state : ', dataToSetOnState);
        if (prev.current.off && prev.current.index !== index) {
            prev.current.off();
        }
        prev.current = { index: index, off: off }
    }

    useEffect(() => {

        if (theClick !== 'link') {

            if (isDefault) {
                handleClick();
            }
        }

    }, [theClick])

    return (
        <>
            <Link to={'/providerJobDetail/' + docNo} target="blank">
                <div ref={aref} onClick={handleClick}
                    className={` flex flex-col m-2 p-2 
                    items-start border h-fit min-w-[300px]
                    ${lstate} rounded-lg  text-green-200
                    hover:bg-green-900 active:bg-green-800`}>

                    <div className="flex flex-row text-[0.8rem] 
                justify-between w-full">
                        <div>{timeAgo} Ago</div> <div className='p-1
                     text-slate-500 text-[0.8rem] bg-blue-950'>{tag}</div>
                    </div>

                    <div className='flex flex-row flex-wrap items-center
                flex-start w-full'>
                        <img className='m-1 size-10 rounded-full' src={imgSrc} alt='company image'></img>
                        <div className='text-[1.2rem] text-green-600
                    font-serif
                    '>{companyName}</div>
                    </div>
                    <div className='text-[0.8rem] relative bottom-1 
                
                '>{location ? location : "DumyBad, India"}</div>

                    <div className='text-[1rem] mt-1 '>{jobHeading}</div>
                    <hr className='w-full m-1 border-1 border-green-800 rounded-md'></hr>

                    <div className='p-1 m-1 text-green-300 
                font-serif self-start text-[0.8rem]
                bg-green-900 rounded-r-2xl' >{tag}</div>

                </div>
            </Link>
        </>
    );
}

function CommonWrapper({ children }) {
    return (<>
        <div className="flex-col m-1 
        p-1 rounded-xl  
        text-blue-400 
        ">
            {children}
        </div>
    </>);
}

export { Card, CommonWrapper }