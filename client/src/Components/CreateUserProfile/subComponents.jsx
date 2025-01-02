
import { useState, useEffect, useRef } from 'react';
import { useResizeValue } from "../../MyLib/MyHook/customHook";
import { useAnimationOnOff } from "../../MyLib/MyHook/customAnimationOnOff";
import { MyContext } from './myContext';
import { MyContext as userContext } from '../UserProfile/myContext';
import { useContext } from 'react';
import { requestServer } from '../../MyLib/RequestServer/requestServer';
import { useNavigate } from 'react-router-dom';

function ProfileImage({ children,
    prevData, useAsUpdate }) {

    const [src, setsrc] = useState(null);
    const [width, setwidth] = useState(window.innerWidth);
    const [divColor, setdivColor] = useState('bg-slate-700');

    function handleResize() {
        setwidth(window.innerWidth);

    }

    function funcdivColor(mode, val) {
        if (mode === 'new') {

            setdivColor(val);
            return true;
        }
        else if (mode === 'default') {
            return divColor
        }
    }

    useEffect(() => {

        if (prevData) {
            console.log('from useeffect the prev effect from profieIMg is ,', prevData)
            if (prevData.inputData.data[1].color === '' || prevData.inputData.data[1].color === null
                || prevData.inputData.data[1].color === undefined || prevData.inputData.data[1].color === false
            ) {

            } else {
                setdivColor(prevData.inputData.data[1].color);
            }
            setsrc(prevData.inputData.data[0].tempUrl);
        }
        window.addEventListener('resize', handleResize);

        return (() => {
            window.removeEventListener('resize', handleResize);
        });

    }, [prevData])




    if (width <= 550 && width > 380) {

        return (<>
            <div className="p-1 flex flex-col items-center w-full">

                <div className={`${divColor} p-5 flex flex-row
           rounded-2xl border-2 border-green-800 w-full  `}>
                    <div className="size-28 relative top-14
            border-2 border-green-900 
             rounded-full bg-slate-500 ">
                    </div>
                </div>



                <UploadButton outSrcPimg={setsrc} useAsUpdate={useAsUpdate}
                    divToHaveEffect={funcdivColor}
                    mode={'pimg'} className="relative right-20 flex flex-row 
        justify-center items-center bg-green-950 rounded-xl p-1 scale-75
          bottom-3 border border-black"/>

                <UploadButton useAsUpdate={useAsUpdate}
                    divToHaveEffect={funcdivColor} className="relative left-36 flex flex-row 
        justify-center items-center bg-green-950 rounded-xl p-1 scale-75
          bottom-24 border border-black"/>

                <div className="text-[0.9rem] font-bold
relative bottom-5 ">
                    Png/Jpg/Jpeg
                </div>

                <div className="text-[1.2rem]
 text-teal-600
font-bold">
                    Profile Image and Background Image
                </div>

            </div>




        </>);
    }
    else if (width <= 380) {

        return (<>

            <div className="p-1 flex flex-col items-center w-full">

                <div className={`${divColor} p-5 flex flex-row
           rounded-2xl border-2 border-green-800 w-full  `}>
                    <div className="size-28 relative top-12
            border-2 border-green-900
             rounded-full bg-slate-500 "></div>
                </div>



                <UploadButton outSrcPimg={setsrc} useAsUpdate={useAsUpdate}
                    divToHaveEffect={funcdivColor}
                    mode={'pimg'} className="relative right-6 flex flex-row 
        justify-center items-center bg-green-950 rounded-xl p-1 scale-75
          bottom-5 border border-black"/>

                <UploadButton useAsUpdate={useAsUpdate}
                    divToHaveEffect={funcdivColor} className="relative left-24 flex flex-row 
        justify-center items-center bg-green-950 rounded-xl p-1 scale-75
          bottom-24 border border-black"/>

                <div className="text-[0.9rem] font-bold
        relative bottom-5 ">
                    Png/Jpg/Jpeg
                </div>

                <div className="text-[1.2rem]
         text-teal-600
        font-bold">
                    Profile Image and Background Image
                </div>

            </div>



        </>);
    }
    else {
        return (<>


            <div className="p-1 flex flex-col items-center w-full">


                <div className={`${divColor} p-5 flex flex-row
           rounded-2xl border-2 border-green-800 w-full max-w-[600px]  `}>
                    <div className="size-28 relative top-12
            border-2 border-green-900 overflow-hidden
             rounded-full bg-slate-500 ">
                        {src ? <img className='w-full' src={src} ></img> : null}
                    </div>
                </div>


                <UploadButton outSrcPimg={setsrc} useAsUpdate={useAsUpdate}
                    divToHaveEffect={funcdivColor}
                    mode={'pimg'} className="relative right-36 flex flex-row 
        justify-center items-center bg-green-950 rounded-xl p-1 scale-75
          bottom-3 border border-black"/>

                <UploadButton useAsUpdate={useAsUpdate}
                    divToHaveEffect={funcdivColor} className="relative left-52 flex flex-row 
        justify-center items-center bg-green-950 rounded-xl p-1 scale-75
          bottom-24 border border-black"/>


                <div className="text-[0.9rem] font-bold
relative bottom-5 ">
                    Png/Jpg/Jpeg
                </div>

                <div className="text-[1.2rem]
 text-teal-600
font-bold">
                    Profile Image and Background Image
                </div>

            </div>




        </>);
    }
}

function CircleNumberNavItem({ children, addOnStyle = "",
    highLight = null, akey }) {

    const [state, setState] = useState('transparent');

    useEffect(() => {
        if (highLight == akey) {
            setState(' border-2  border-teal-200 bg-teal-500');
        }
        else {
            setState('border-none');
        }
    }, [highLight])

    return (
        <>
            <div className={`text-[1.1rem] rounded-full 
      ${state}
      p-1 size-9 bg-teal-600  text-center font-bold  ${addOnStyle}`}>
                {children}
            </div>
        </>
    );

}

function LineNavItem({ children }) {
    return (
        <>
            <div className="w-3 border-2
      border-black  h-fit">

            </div>
        </>
    );

}


function NavShow({ children, containerClass, howMuch,
    highLight = 1
}) {

    const arr = [];
    for (let i = 0; i < howMuch; i++) {
        if (i == (howMuch - 1)) {
            arr.push(<CircleNumberNavItem akey={i + 1}
                highLight={highLight}
                addOnStyle={""}>{i + 1}
            </CircleNumberNavItem>)
        } else {
            arr.push(<><CircleNumberNavItem akey={i + 1}
                highLight={highLight}
                addOnStyle={""}>{i + 1}
            </CircleNumberNavItem>
                <LineNavItem /></>)
        }
    }
    return (
        <>
            <div className="flex flex-row p-1 items-center  ">
                {arr}
            </div>
        </>
    );
}

function SectionHeading({ children }) {
    return (
        <>
            <div className="text-3xl 
      font-bold text-teal-600
      text-center m-1">
                {children}
            </div>
        </>
    );
}

function GetInput({ name, inputName, index,
    totalInputLength = 100, needPreValues = true,
    prevValue, isDisabled
    , inputHeight = 10, typeToggle = true, placeHolder = '',
    spaceOccupy = '40%', OutReport, isMendatory = false
}) {

    let aref = useRef(null);
    let boolPreviousVal = false;
    if (prevValue) {
        if (Object.hasOwn(prevValue, 'inputData')) {
            boolPreviousVal = true;
        }
    }

    const TheReport = useRef({
        index: index,
        isMendatory: isMendatory,
        ok: false,
        inputData: {
            name: inputName,
            data: null,
            redNotice: redBorder,
        }
    });



    const [borderColor, setBorderColor] = useState(["border-teal-500", 'teal']);
    const [string, setString] = useState(['', totalInputLength]);

    function handledChanbg(event) {
        if (string[0].length < totalInputLength) {
            setString([event.target.value, string[1]])
            TheReport.current.inputData.data = event.target.value;
            OutReport(TheReport.current);

            if (borderColor[1] === 'red') {
                normalBorder();
            }

            if (string[0].length < 1) {
                TheReport.current.ok = false;
            } else {
                TheReport.current.ok = true;
            }
        }
    }

    function redBorder() {
        setBorderColor(['border-red-600', 'red']);
        alert('fill mendatory fields, if there is no mendatory field( one with red star), skip by pressing next');
    }

    function normalBorder() {
        setBorderColor(['border-teal-500', 'teal']);

    }

    useEffect(() => {


    }, [string])

    useEffect(() => {

        if (!OutReport) {
            console.error('please provide Functinoality to the attribute OutReport of the GetInput to get the report of the component');
        }


        if (boolPreviousVal) {
            console.log('have prev value');
            console.log(prevValue);
            aref.current.value = prevValue.inputData.data;
        } else {
            if (isMendatory) {
                OutReport(TheReport.current);
            }
        }
        if (aref.current.value.length < 1) {
            TheReport.current.ok = false;
        } else {
            TheReport.current.ok = true;
        }

    }, [prevValue])



    return (
        <>
            <div className={`flex flex-col  text-teal-300
            ${isDisabled ?
                    '*:text-slate-600 *:placeholder:text-slate-600' : null}
       m-1
       h-fit `} style={{
                    width: spaceOccupy
                }}>

                <div className="text-[1.2rem] 
      font-bold text-teal-600 m-1 
       ">
                    <i>{name}
                        {isMendatory ? <span className='text-red-700'>*</span> : ""}</i>
                </div>


                {typeToggle == 'input' ?
                    <input disabled={isDisabled}
                        ref={aref}
                        name={inputName} onChange={(e) => {
                            handledChanbg(e);
                        }}
                        placeholder={placeHolder}
                        className={`border ${borderColor[0]}
        bg-transparent rounded-md 
        p-1 h-${inputHeight}`}
                        maxLength={totalInputLength}>

                    </input>
                    :
                    <textarea disabled={isDisabled}
                        ref={aref}
                        name={inputName}
                        onChange={(e) => {
                            handledChanbg(e);
                        }}
                        placeholder={placeHolder}
                        className={`border ${borderColor[0]}
        bg-transparent rounded-md 
        p-1 h-${inputHeight}`}
                        maxLength={totalInputLength}
                    >

                    </textarea>}

                <div className=" flex flex-row justify-end
        font-bold ">
                    <div className="text-[0.9rem]">{string[0].length}/{string[1]}</div>
                </div>
            </div>
        </>
    );
}


function GetInputArray({ index, name, inputName, totalInputLength = 100
    , inputHeight = 10, isReadOnly = false,
    spaceOccupy = '40%', prevValue, isDisabled = false,
    OutReport, isMendatory = false
}) {


    let aref = useRef(null);
    let boolPreviousVal = false;
    if (prevValue) {
        if (Object.hasOwn(prevValue, 'inputData')) {
            boolPreviousVal = true;
        }
    }

    const TheReport = useRef({
        index: index,
        isMendatory: isMendatory,
        ok: false,
        inputData: {
            name: inputName,
            data: [],
            redNotice: redBorder,
        }
    });

    const childIndex = useRef(0);
    const [borderColor, setBorderColor] = useState(["border-teal-500", 'teal']);
    const [arr, setarr] = useState([null]);




    function redBorder() {
        setBorderColor(['border-red-600', 'red']);
        alert('fill mendatory fields, if there is no mendatory field( one with red star), skip by pressing next');
    }

    function normalBorder() {
        setBorderColor(['border-teal-500', 'teal']);

    }

    function add() {
        setarr([...arr, <ArrayItem index={provideNewIndex()} handleValues={handleReport}
            delFunction={del} />])
    }
    function del(index) {
        console.log('From del arr  : ', arr)
        handleReport(index, null, true);
        setarr((prev) => {
            let newarr = prev.slice();
            console.log('arr sliced : ', newarr)

            newarr[index] = null;
            console.log('new arr is : ', newarr)
            return newarr;
        });
        /* 
        */
    }

    function handleReport(locindex, val, remove = false) {
        console.log('from handlReport val is :', val);
        console.log('from handlReport locindex is :', locindex);
        if (remove) {
            TheReport.current.inputData.data[locindex] = null;
            console.log('from handleReport, new report : ', TheReport);
            refineData(TheReport.current.inputData.data);
            OutReport(TheReport.current);
            return true;
        }
        TheReport.current.inputData.data[locindex] = val;
        console.log('from handleReport, new report : ', TheReport);
        OutReport(TheReport.current);
    }

    function refineData(arr) {
        let newarr = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i]) {
                newarr[i] = arr[i];
            }
        }
        TheReport.current.inputData.data = newarr;
    }


    function provideNewIndex() {
        childIndex.current += 1
        return childIndex.current
    }

    // console.log('updated arr value is ', arr);
    useEffect(() => {

        if (!OutReport) {
            console.error('please provide Functinoality to the attribute OutReport of the GetInput to get the report of the component');
        }

        if (boolPreviousVal) {

            TheReport.current.inputData.data = prevValue.inputData.data;
            //console.log('if prev val the Report is : ', TheReport);
            let newarr = [];
            for (let i = 0; i < prevValue.inputData.data.length; i++) {

                if (prevValue.inputData.data[i]) {
                    childIndex.current = i;
                    newarr[i] = <ArrayItem index={i}
                        delFunction={del} handleValues={handleReport}
                        val={prevValue.inputData.data[i]} />
                }
            }
            console.log('if prev val the new arr is : ', newarr);
            setarr(newarr);
        }
        else {
            setarr([<ArrayItem index={0}
                handleValues={handleReport}
                delFunction={del} />])
        }

    }, [prevValue])

    return (
        <>
            <div className={`flex flex-col 
         m-1 max-sm:w-[300px] max-md:w-[600px] 
         max-w-[600px] 
         h-fit `} style={{
                    //width: spaceOccupy
                }}>

                <div className="text-[1.2rem] 
        font-bold text-teal-600 m-1 
        ">
                    <i>{name}</i>
                </div>
                <div className={`h-[300px] border border-teal-600
           overflow-y-auto bg-teal-800
               flex flex-col w-full p-1 m-1 rounded-md`}>
                    <div className='w-full h-[15%] border-b-2 border-b-teal-950 
            flex flex-row
            justify-end p-1 items-center  '>

                        <button onClick={add}
                            className='text-2xl overflow-hidden  
                active:bg-teal-700
              border border-transparent  hover:border-green-900 m-1 p-1 
             
              '><img className='size-7' src='./stock/icon/plus.png'></img></button>

                    </div>

                    <div className=' h-fit
            mt-1 justify-around
            flex flex-row flex-wrap  '
                    >
                        {arr}


                    </div>

                </div>
            </div>
        </>
    );
}

function ArrayItem({ refCustom, index, delFunction, handleValues, val }) {
    const theInput = useRef(null);

    useEffect(() => {
        if (refCustom) {
            refCustom.current.inputLength = theInput.current.value.length;
        }
        if (val) {

            theInput.current.value = val;
        }
    }, [val])
    return (
        <>
            <div className=' min-w-[250px] w-[45%] max-w-[290px]
         m-1  h-fit flex flex-row
        bg-teal-900  text-teal-300
        '>
                <input ref={theInput} onChange={(e) => {
                    handleValues(index, e.target.value);
                }}
                    placeholder='Tag'
                    className='p-1 w-full border border-transparent
            hover:border-teal-400 
            placeholder:text-teal-600 placeholder:text-center
             bg-transparent '>
                </input>
                <button onClick={() => {

                    if (delFunction) {
                        delFunction(index);
                    }
                }}
                    className='bg-red-900 p-1 text-red-400 
          font-bold mr-1 ml-1 overflow-hidden
           active:bg-red-950
          hover:bg-red-800'>
                    <img className='size-7' src='./stock/icon/minus.png'></img>
                </button>
            </div>
        </>
    );
}

function Button({ children, mode, handle, stateVal, useAsUpdate }) {


    const navigate = useNavigate();

    const butt = useRef(null);
    async function handleButton() {
        if (mode === 'next') {
            handle(1, stateVal);
        }
        else if (mode === 'back') {
            handle(-1, stateVal);

        }
        else if (mode === 'cancel') {
            navigate('/dashboard')

        }
        else if (mode === 'submit') {
            butt.current.innerHTML = 'Submitting';
            let bool = await handle(stateVal);
            if (bool) {
                alert('Uploaded succesfully, enjoy your work ');
                if (useAsUpdate) {
                    navigate("/dashboard");
                } else {
                    navigate("/");
                }
            }
            else {
                alert('Uploaded failed ');
            }
            butt.current.innerHTML = 'Submit';
        }
    }



    return (
        <>
            <button ref={butt} onClick={handleButton}
                className=" m-1 p-2
      pl-4 pr-4 flex flex-row items-center
      justify-center hover:bg-green-900 active:bg-green-800 active:text-teal-950
      bg-green-950 rounded-xl 
      text-teal-700 
      border border-green-800" >

                {children}

            </button>
        </>
    );
}


function UploadButton({ outSrcPimg, __this_component_use_context_and_i_am_a_message__,
    children, className, onClick = null, divToHaveEffect, mode, useAsUpdate }) {

    let inputRef = useRef(null);
    let bEditRef = useRef(null);
    const [showDiv, setshowDiv] = useState('none');
    const { index, prevData,
        OutReportFromInputs } = useContext(useAsUpdate ? userContext : MyContext);

    const TheReport = useRef({
        index: index,
        isMendatory: null,
        ok: false,
        inputData: {
            name: 'watch in data, it contain two datas files and color as array',
            data: [{ tempUrl: null },
            { color: divToHaveEffect('default') }],
            redNotice: null,
        }
    });

    function handleClick() {
        if (mode === 'pimg') {
            inputRef.current.click();
        }

    }

    async function requestTempImg(file) {

        const tempImg = new requestServer(process.env.REACT_APP_SERVER_URL +
            "xtServer/api/temp", { method: 'POST' }, true
        )

        tempImg.setAuthorizedFlag(true);
        tempImg.setFormData('tempImg', file);
        let result = await tempImg.fetchNoStringify();
        if (result) {
            console.log('found tempImgSrc is : ', result.json);
            return result.json.filePath;
        }
        return false;
    }

    async function handleChangeFile(e) {
        console.log('Changing file');

        let url = await requestTempImg(e.target.files[0]);
        outSrcPimg(url);

        if (prevData) {
            TheReport.current.inputData.data = [
                { files: e.target.files[0], tempUrl: url },
                prevData.inputData.data[1]
            ]

        } else {
            TheReport.current.inputData.data = [
                { files: e.target.files[0], tempUrl: url },
                prevData.inputData.data[1]
            ]

        }


        OutReportFromInputs(TheReport.current);


    }

    function handleColorBox(color) {

        if (prevData) {
            TheReport.current.inputData.data = [
                prevData.inputData.data[0],
                { 'color': color }

            ]

        } else {
            TheReport.current.inputData.data = [
                null,
                { 'color': color }

            ]

        }


        OutReportFromInputs(TheReport.current);
        divToHaveEffect('new', color);
    }

    function handleFocus() {
        setshowDiv('flex');
    }
    function handleFocusOver() {
        setshowDiv('none');

    }

    useEffect(() => {
        console.log("previous data is below");
        console.log(prevData);
        if (prevData) {

        } else {
            OutReportFromInputs(TheReport.current);
        }

    }, [prevData])


    if (mode === 'pimg') {
        return (
            <>

                <button
                    className={`${className} hover:bg-green-800 active:bg-green-700
                active:text-teal-950 min-w-24
                 border-green-700`} onClick={() => {
                        handleClick();

                    }}
                >
                    <input onChange={(e) => {
                        handleChangeFile(e);
                    }} ref={inputRef}
                        className='absolute opacity-0 -z-10  hidden'
                        type='file'></input>
                    <img className="size-8   border-black rounded-full"
                        src="./stock/icon/pencileSmall.gif"
                        alt='Edit Button'>
                    </img>
                    <div className="m-1 font-bold 
          text-teal-600">Edit</div>
                </button>
            </>
        );
    }



    return (
        <>
            <button ref={bEditRef} onBlur={handleFocusOver}
                onFocus={handleFocus}
                className={`${className} hover:bg-green-800
                 min-w-24
                 border-green-700`} onClick={() => {
                    handleClick();

                }}
            >
                <div className={`size-52 border border-black absolute 
                    self-start top-11 right-2 justify-center items-start
                     bg-slate-500 rounded-2xl
                     overflow-y-scroll  `}
                    style={{
                        display: showDiv,
                        flexWrap: 'wrap'
                    }}>
                    <div className='relative p-1 ' style={{
                        display: 'flex',
                        flexWrap: 'wrap'
                    }}>
                        <ColorGetDiv onClick={handleColorBox} color={'bg-slate-700'} />
                        <ColorGetDiv onClick={handleColorBox} color={'bg-slate-800'} />
                        <ColorGetDiv onClick={handleColorBox} color={'bg-slate-900'} />
                        <ColorGetDiv onClick={handleColorBox} color={'bg-red-400'} />
                        <ColorGetDiv onClick={handleColorBox} color={'bg-red-600'} />
                        <ColorGetDiv onClick={handleColorBox} color={'bg-red-700'} />
                        <ColorGetDiv onClick={handleColorBox} color={'bg-green-300'} />
                        <ColorGetDiv onClick={handleColorBox} color={'bg-green-600'} />
                        <ColorGetDiv onClick={handleColorBox} color={'bg-green-700'} />
                        <ColorGetDiv onClick={handleColorBox} color={'bg-amber-400'} />
                        <ColorGetDiv onClick={handleColorBox} color={'bg-amber-500'} />
                        <ColorGetDiv onClick={handleColorBox} color={'bg-amber-600'} />
                        <ColorGetDiv onClick={handleColorBox} color={'bg-amber-700'} />
                        <ColorGetDiv onClick={handleColorBox} color={'bg-amber-800'} />


                    </div>
                </div>
                <img className="size-8   border-black rounded-full"
                    src="./stock/icon/pencileSmall.gif"
                    alt='Edit Button'>
                </img>
                <div className="m-1 font-bold 
          text-teal-600">Edit</div>
            </button>
        </>
    );
}

function ColorGetDiv({ color, onClick }) {
    return (

        <div onClick={() => {
            onClick(color);
        }}
            className={`size-12 border border-black m-1 hover:border-white ${color}`}></div>

    );
}


function Section1({ children, animation = false,
    outOn, outOff, buttonHandle1, buttonHandle2,
    OutReportFromInputs, logout }) {

    const secElem = useRef(null);
    const { on, off } = useAnimationOnOff(secElem);
    const windowWidth = useResizeValue(window.innerWidth);
    const [getInputWrapperClassName, setGIWC] = useState("");
    const [getInputSpace, setGIS] = useState('');
    const { section1FinalInputReport } = useContext(MyContext);
    const { tryit } = useContext(MyContext);
    const navigate = useNavigate();






    useEffect(() => {
        tryit();
        if (animation) {
            secElem.current.style.opacity = 0;

            outOn(on)
            outOff(off)

        }
        else {
            if (outOn) {
                outOn(() => {
                    alert('to use on() for section1, set animation to true first');
                    console.error('to use on() for section1, set animation to true first');

                })
            }
            if (outOff) {
                outOff(() => {
                    alert('to use off() for section1, set animation to true first');
                    console.error('to use off() for section1, set animation to true first');

                })
            }

        }
    }, [])

    useEffect(() => {

        if (windowWidth < 700) {
            setGIWC(`flex flex-col 
          item-start`)
            if (windowWidth <= 465) {

                setGIS('95%');
            }
            else {
                setGIS('80%');

            }
        }
        else {
            setGIWC(`flex flex-row 
        flex-wrap
        justify-between`)
            setGIS('340px');
        }
    }, [windowWidth])


    return (
        <>

            <div ref={secElem} className=" m-1 p-4 border 
      border-green-800 rounded-2xl relative
      flex flex-col w-full max-w-[800px] " >
                <SectionHeading>Personal Detail</SectionHeading> <br></br>

                <div className="self-center w-full
          flex flex-row justify-center ">
                    <MyContext.Provider value={{
                        index: 1, OutReportFromInputs,
                        prevData: section1FinalInputReport[1]
                    }}>
                        <ProfileImage
                            prevData={section1FinalInputReport[1]}>

                        </ProfileImage>
                    </MyContext.Provider>

                </div><br></br><br></br>

                <div className={getInputWrapperClassName}>

                    <GetInput index="2" inputName="name"
                        inputHeight="10" spaceOccupy={getInputSpace}
                        name={"User Name"} typeToggle='input'
                        placeHolder="Ex : Ajeet Singh"
                        isMendatory={true} totalInputLength={50}
                        prevValue={section1FinalInputReport[2]}
                        OutReport={OutReportFromInputs}
                    />

                    <GetInput index="3" inputName="title"
                        inputHeight="10" spaceOccupy={getInputSpace}
                        name={"Professional Title"} typeToggle='input'
                        placeHolder="Ex : Web Developer" totalInputLength={50}
                        prevValue={section1FinalInputReport[3]}
                        OutReport={OutReportFromInputs}
                    />

                    <GetInput index='4' inputName="status"
                        inputHeight="20" spaceOccupy={getInputSpace}
                        name={"Status"} OutReport={OutReportFromInputs}
                        prevValue={section1FinalInputReport[4]}
                        placeHolder="Tell what you working on ..."
                    />

                    <GetInput index="5" inputName="discription"
                        inputHeight="20" spaceOccupy={getInputSpace}
                        name={"Description"}
                        prevValue={section1FinalInputReport[5]}
                        totalInputLength={200} OutReport={OutReportFromInputs}
                        placeHolder="Tell Brife About You ..."
                    />

                </div>

                <hr className="border m-1 border-green-800 "></hr>

                <div className="flex flex-row justify-between
        font-bold text-2xl">
                    <button onClick={() => {
                        logout();

                    }}
                        className=" m-1 p-2
      pl-4 pr-4 flex flex-row items-center
      justify-center hover:bg-green-900 active:bg-green-800 active:text-teal-950
      bg-green-950 rounded-xl 
      text-teal-700 
      border border-green-800" >
                        Cancel
                    </button>
                    <Button handle={buttonHandle1}
                        stateVal={section1FinalInputReport}
                        mode={'next'}>
                        Next
                    </Button>
                </div>

            </div>
        </>
    );
}

function Section2({ children, animation = false,
    outOn, outOff, buttonHandle1, OutReportFromInputs }) {

    const secElem = useRef(null);
    const { on, off } = useAnimationOnOff(secElem);
    const windowWidth = useResizeValue(window.innerWidth);
    const [getInputWrapperClassName, setGIWC] = useState("");
    const [getInputSpace, setGIS] = useState('');
    const { tryit } = useContext(MyContext);
    const { section2FinalInputReport } = useContext(MyContext);

    useEffect(() => {

        tryit();
        if (animation) {
            secElem.current.style.opacity = 0;

            outOn(on)
            outOff(off)

        }
        else {
            if (outOn) {
                outOn(() => {
                    alert('to use on() for section1, set animation to true first');
                    console.error('to use on() for section1, set animation to true first');

                })
            }
            if (outOff) {
                outOff(() => {
                    alert('to use off() for section1, set animation to true first');
                    console.error('to use off() for section1, set animation to true first');

                })
            }

        }
    }, [])

    useEffect(() => {
        if (windowWidth < 700) {
            setGIWC(`flex flex-col 
          item-start`)
            if (windowWidth <= 465) {

                setGIS('95%');
            }
            else {
                setGIS('80%');

            }
        }
        else {
            setGIWC(`flex flex-row 
        flex-wrap
        justify-between`)
            setGIS('340px');
        }
    }, [windowWidth])

    return (
        <>

            <div ref={secElem} className=" m-1 p-4 border 
      border-green-800 rounded-2xl relative
      flex flex-col w-full max-w-[800px] " >
                <SectionHeading>Your Knowledge</SectionHeading> <br></br>

                <div className={getInputWrapperClassName}>

                    <GetInput inputName="education"
                        index={6} OutReport={OutReportFromInputs}
                        inputHeight="32" spaceOccupy={getInputSpace}
                        name={"Education"} totalInputLength={250}
                        prevValue={section2FinalInputReport[6]}
                        placeHolder=" Ex: BCA From Punjab University"
                    />

                    <GetInput inputName="skills"
                        index={7} OutReport={OutReportFromInputs}
                        inputHeight="32" spaceOccupy={getInputSpace}
                        name={"Skills"} totalInputLength={500}
                        prevValue={section2FinalInputReport[7]}
                        placeHolder="Tell About Your Professional Skills"
                    />

                    <GetInput inputName="experiance"
                        index={8} OutReport={OutReportFromInputs}
                        inputHeight="32" spaceOccupy={getInputSpace}
                        name={"Experiance"}
                        totalInputLength={500}
                        prevValue={section2FinalInputReport[8]}
                        placeHolder="About Your Experiance"
                    />

                </div>

                <hr className="border m-1 border-green-800 "></hr>

                <div className="flex flex-row justify-between
        font-bold text-2xl">
                    <Button handle={buttonHandle1}
                        mode={'back'}>
                        Back
                    </Button>
                    <Button handle={buttonHandle1}

                        mode={'next'}>
                        Next
                    </Button>
                </div>

            </div>

        </>
    );
}

function Section3({ children, animation = false,
    outOn, outOff, OutReportFromInputs,
    buttonHandle1, submitButton }) {

    const secElem = useRef(null);
    const { on, off } = useAnimationOnOff(secElem);
    const windowWidth = useResizeValue(window.innerWidth);
    const [getInputWrapperClassName, setGIWC] = useState("");
    const [getInputSpace, setGIS] = useState('');
    const { section1FinalInputReport,
        section2FinalInputReport,
        section3FinalInputReport, tryit
    } = useContext(MyContext);


    useEffect(() => {
        tryit();
        if (animation) {
            secElem.current.style.opacity = 0;

            outOn(on)
            outOff(off)

        }
        else {
            if (outOn) {
                outOn(() => {
                    alert('to use on() for section1, set animation to true first');
                    console.error('to use on() for section1, set animation to true first');

                })
            }
            if (outOff) {
                outOff(() => {
                    alert('to use off() for section1, set animation to true first');
                    console.error('to use off() for section1, set animation to true first');

                })
            }

        }
    }, [])

    useEffect(() => {
        if (windowWidth < 700) {
            setGIWC(`flex flex-col 
          item-start`)
            if (windowWidth <= 465) {

                setGIS('95%');
            }
            else {
                setGIS('80%');

            }
        }
        else {
            setGIWC(`flex flex-row 
        flex-wrap
        justify-between`)
            setGIS('340px');
        }
    }, [windowWidth])

    return (
        <>

            <div ref={secElem} className=" m-1 p-4 border 
      border-green-800 rounded-2xl relative
      flex flex-col w-full max-w-[800px] " >
                <SectionHeading>Social Details</SectionHeading> <br></br>

                <div className={getInputWrapperClassName}>

                    <GetInput inputName="email" isDisabled
                        index={9} OutReport={OutReportFromInputs}
                        inputHeight="10" spaceOccupy={getInputSpace}
                        name={"Email Id"} typeToggle='input' totalInputLength={50}
                        prevValue={section3FinalInputReport[9]}
                        placeHolder="email@gmail.com"
                    />

                    <GetInput inputName="x"
                        index={10} OutReport={OutReportFromInputs}
                        inputHeight="10" spaceOccupy={getInputSpace}
                        name={"X"} typeToggle='input' totalInputLength={50}
                        prevValue={section3FinalInputReport[10]}
                        placeHolder="@twitter account"

                    />

                    <GetInput inputName="github"
                        index={11} OutReport={OutReportFromInputs}
                        inputHeight="10" spaceOccupy={getInputSpace}
                        name={"GitHub"} typeToggle='input'
                        totalInputLength={100}
                        prevValue={section3FinalInputReport[11]}
                        placeHolder="github/UserName/YourRepository"
                    />

                </div>

                <hr className="border m-1 border-green-800 "></hr>

                <div className="flex flex-row justify-between
        font-bold text-2xl">
                    <Button handle={buttonHandle1} mode={'back'}>
                        Back
                    </Button>
                    <Button handle={submitButton}
                        stateVal={[
                            section1FinalInputReport,
                            section2FinalInputReport,
                            section3FinalInputReport
                        ]}
                        mode={'submit'}>
                        Submit
                    </Button>
                </div>

            </div>

        </>
    );
}


export {
    NavShow, Section1, Section2, Section3,
    GetInputArray, GetInput, Button, ProfileImage, SectionHeading
}
