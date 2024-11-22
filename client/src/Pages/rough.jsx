import { useEffect, useRef, useState } from 'react';
import list from '../Components/Rough/list.json';

function Container({ children }) {
    return (
        <>
            <div className="border-2 border-black mb-3 ">
                {children}
            </div>
        </>
    );
}


function ContainerNav({ data, common, setCommon,setContainer, children, isDefault=null }) {

    const aref = useRef(null);
    const [lstate, setlstate] = useState('border-slate-400');
   
   

    function handleClick() {
        setlstate('border-black');
        setContainer(data);
       

        console.log('from ContainerNav below common');
        console.log(common);

        if(common.current) {
            common.current();
        }

       setCommon(setOff);
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

                <div className='text-2xl underline'>{jobHeading}</div>


            </div>
        </>
    );
}

function Rough({ children }) {

    let [cardsArr, setCardsArr] = useState([]);
    let [navItemArr, setnavItemArr] = useState([]);
    let docs = list.docs;
    let navItemCommon = useRef(null);


    function setCommon(val){
        navItemCommon.current = val;
    }

    function setContainer(docs) {
        let arr = [];
        for (let i = 0; i < docs.length; i++) {
            arr.push(
                <Card companyName={docs[i].CompanyName} imgSrc={docs[i].ImgSrc}
                    jobHeading={docs[i].JobHeading} tag={docs[i].Tag} timeAgo={docs[i].TimeAgo} />
            )
        }
        setCardsArr([...arr]);
    }

    function calibrate(each, total) {

        const cd = total / each;
        const remainder = total % each;
        let navItemCount = null;

        if (cd > 0) {
            if (cd < 1) {

                navItemCount = 1;
                return {
                    navItemCount: navItemCount,
                    remainder: remainder,
                    remainderOnly: true
                }
            } else {
                navItemCount = parseInt(cd)+1;
                return {
                    navItemCount: navItemCount,
                    remainder: remainder,
                    each: each
                }
            }
        }
        else {
            return {
                navItemCount: 0
            }
        }
    }

    function divideData(calibrationData) {

        if (calibrationData.remainderOnly) {
            setnavItemArr([
                <ContainerNav
                    data={docs} common={navItemCommon}
                    setContainer={setContainer}>
                    {calibrationData.navItemCount}
                </ContainerNav>
            ]);
        }
        else if (calibrationData.navItemCount === 0) {
            setnavItemArr(
                "---"
            );

            setCardsArr(<div>No Job found</div>);
        }
        else {
            let arr1 = [];
            let arr2 = [];
            let counter = 0;

            for (let i = 1; i <= calibrationData.navItemCount; i++) {
                arr1 = [];

                if (i === calibrationData.navItemCount) {

                    if (calibrationData.remainder !== 0) {
                        for (let j = 1; j <= calibrationData.remainder; j++) {
                            arr1.push(docs[counter]);
                            counter++;
                        }
                    } else {
                        for (let j = 1; j <= calibrationData.each; j++) {
                            arr1.push(docs[counter]);
                            counter++;
                        }
                    }

                } else {
                    for (let j = 1; j <= calibrationData.each; j++) {
                        
                        arr1.push(docs[counter]);
                        counter++;
                    }
                }

                arr2.push(  <ContainerNav
                    data={[...arr1]} common={navItemCommon}
                    setCommon={setCommon}
                    setContainer={setContainer}
                    isDefault={i === 1 ? true : false}
                    >
                    {i}
                </ContainerNav>);
            }

            console.log(`counter = ${counter}`);
            console.log(`arr2 below :`);
            console.log(arr2);

            setnavItemArr([...arr2]);
       
        }
    }

    useEffect(() => {

        let result = calibrate(10, docs.length-1);
        console.log(`the calibrated data below : `);
        console.log(`the total no of data: ${docs.length - 1}`);
        console.log(result);

        divideData(result);

    }, [])
    return (
        <>

            <div className="sticky  top-0 border-2
        bg-blue-950 
       border-gray-900 h-50 ">
                <div className="m-4">i am nav bar</div>
            </div>

            <div className="flex flex-row justify-center
        item-center  border-2 border-white">

                <div className="flex flex-col p-2 m-2 border-2 border-black">

                    <Container >
                        {cardsArr}
                    </Container>
                    
                    <div className='overflow-auto'>
                    {navItemArr}
                    </div>

                </div>

            </div>

        </>
    );
}



export { Rough };