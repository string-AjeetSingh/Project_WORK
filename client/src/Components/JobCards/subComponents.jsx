import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Container({ children }) {
    return (
        <>
            <div className=" mb-3   ">
                {children}
            </div>
        </>
    );
}


function ContainerNav({ data, common, setCommon, setContainer, children, isDefault = null, thekey }) {

    const aref = useRef(null);
    const [lstate, setlstate] = useState('border-slate-400');



    function handleClick() {
        setlstate('border-reen-200');
        setContainer(data);


        if (common.current) {
            if (common.current.previousKey !== thekey) {
                common.current.previous();
            }
        }

        if (setCommon) {
            console.log('from ContainerNav , the typeof setcommon : ', typeof setCommon);
            setCommon({ previous: setOff, previousKey: thekey });
        }

    }

    function setOff() {
        setlstate('border-slate-400');

    }

    useEffect(() => {
        if (isDefault) {
            handleClick();
            setlstate('border-reen-200');
        }
    }, [])


    return (
        <>

            <button ref={aref} onClick={handleClick}
                className={` ${lstate} m-1 p-3 font-serif 
                hover:bg-green-700 border-2  text-green-200
               text-[1.2rem] rounded-md`}>
                {children}
            </button>
        </>
    );
}

function Card({ companyName, imgSrc, jobHeading,
    timeAgo, tag, prev, index, location, theClick,
    dataToSetOnState, setState, isDefault }) {

    const aref = useRef(null);
    const [lstate, setlstate] = useState('border-black');
    const navigate = useNavigate();

    function off() {
        setlstate('border-black');
    }

    function handleClick() {
        if (theClick === 'link') {
            alert('going to use link');
            navigate('jobDetial');

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
            <div ref={aref} onClick={handleClick}
                className={` flex flex-col m-2 p-2 
            items-start border 
             ${lstate} rounded-lg  text-green-200
             hover:bg-green-900 active:bg-green-800`}>

                <div className="flex flex-row text-[0.8rem] 
                justify-between w-full">
                    <div>{timeAgo} Ago</div> <div className='p-1
                     text-slate-500 text-[0.8rem] bg-blue-950'>{tag}</div>
                </div>

                <div className='flex flex-row flex-wrap
                flex-start w-full'>
                    <img className='m-1' src={imgSrc} alt='company image'></img>
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
        </>
    );
}


export { Container, ContainerNav, Card };