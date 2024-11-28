
import { useState, useEffect, useRef } from 'react';
import { useResizeValue } from "../../MyLib/MyHook/customHook";
import { useAnimationOnOff } from "../../MyLib/MyHook/customAnimationOnOff";
import { MyContext } from './myContext';
import { useContext } from 'react';

function ProfileImage({ children }) {

    const [width, setwidth] = useState(window.innerWidth);

    function handleResize() {
        setwidth(window.innerWidth);

    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return (() => {
            window.removeEventListener('resize', handleResize);
        });

    }, [])


    if (width <= 550 && width > 380) {

        return (<>
            <div className="p-1 flex flex-col items-center w-full">

                <div className="bg-slate-700 p-5 flex flex-row
           rounded-2xl border-2 border-green-800 w-full  ">
                    <div className="size-28 relative top-14
            border-2 border-green-900 
             rounded-full bg-slate-500 "></div>
                </div>



                <UploadButton className="relative right-20 flex flex-row 
        justify-center items-center bg-green-950 rounded-xl p-1 scale-75
          bottom-3 border border-black"/>

                <UploadButton className="relative left-36 flex flex-row 
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

                <div className="bg-slate-700 p-5 flex flex-row
           rounded-2xl border-2 border-green-800 w-full  ">
                    <div className="size-28 relative top-12
            border-2 border-green-900
             rounded-full bg-slate-500 "></div>
                </div>



                <UploadButton className="relative right-6 flex flex-row 
        justify-center items-center bg-green-950 rounded-xl p-1 scale-75
          bottom-5 border border-black"/>

                <UploadButton className="relative left-24 flex flex-row 
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


                <div className="bg-slate-700 p-5 flex flex-row
           rounded-2xl border-2 border-green-800 w-full max-w-[600px]  ">
                    <div className="size-28 relative top-12
            border-2 border-green-900
             rounded-full bg-slate-500 "></div>
                </div>


                <UploadButton className="relative right-36 flex flex-row 
        justify-center items-center bg-green-950 rounded-xl p-1 scale-75
          bottom-3 border border-black"/>

                <UploadButton className="relative left-52 flex flex-row 
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
    prevValue
    , inputHeight = 10, typeToggle = true, placeHolder = '',
    spaceOccupy = '40%', OutReport, isMendatory = false
}) {

    let aref = useRef(null);
    const { tryit } = useContext(MyContext);
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

        TheReport.current.inputData.data =
            string[0];
        if (OutReport) {
            OutReport(TheReport.current);
            tryit();

        } else {
            console.error('please provide Functinoality to the attribute OutReport of the GetInput to get the report of the component');
        }
    }, [string])

    useEffect(() => {
        if (boolPreviousVal) {
            aref.current.value = prevValue.inputData.data;
        }
        if (aref.current.value.length < 1) {
            TheReport.current.ok = false;
        } else {
            TheReport.current.ok = true;
        }
    }, [])



    return (
        <>
            <div className={`flex flex-col 
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
                    <input
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
                    <textarea
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

function Button({ children, mode, handle, stateVal }) {


    function handleButton() {
        if (mode === 'next') {
            handle(1, stateVal);
        }
        else if (mode === 'back') {
            handle(-1, stateVal);

        }
        else if (mode === 'submit') {
            handle(stateVal);
        }
    }



    return (
        <>
            <button onClick={handleButton}
                className=" m-1 p-2
      pl-4 pr-4 flex flex-row items-center
      justify-center
       bg-green-950 rounded-xl 
       text-teal-700 
       border border-green-800" >

                {children}

            </button>
        </>
    );
}


function UploadButton({ children, className, onClick = null, mode }) {

    function handleClick() {
        if (mode == 'pimg') {

        }
        else if (mode == 'bimg') {

        }
        else {
            console.error('Provide mode attribute to the UploadButton Component to have working');
        }
    }

    return (
        <>
            <button className={className} onClick={() => {
                handleClick();

            }}
            >
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


function Section1({ children, animation = false,
    outOn, outOff, buttonHandle1, buttonHandle2,
    OutReportFromInputs }) {

    const secElem = useRef(null);
    const { on, off } = useAnimationOnOff(secElem);
    const windowWidth = useResizeValue(window.innerWidth);
    const [getInputWrapperClassName, setGIWC] = useState("");
    const [getInputSpace, setGIS] = useState('');
    const { section1FinalInputReport } = useContext(MyContext);







    useEffect(() => {
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
                    <ProfileImage></ProfileImage>
                </div><br></br><br></br>

                <div className={getInputWrapperClassName}>

                    <GetInput index="2" inputName="userName"
                        inputHeight="10" spaceOccupy={getInputSpace}
                        name={"User Name"} typeToggle='input'
                        placeHolder="Ex : Ajeet Singh"
                        isMendatory={true}
                        prevValue={section1FinalInputReport[2]}
                        OutReport={OutReportFromInputs}
                    />

                    <GetInput index="3" inputName="title"
                        inputHeight="10" spaceOccupy={getInputSpace}
                        name={"Professional Title"} typeToggle='input'
                        placeHolder="Ex : Web Developer"
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
                        name={"Discription"}
                        prevValue={section1FinalInputReport[5]}
                        totalInputLength={200} OutReport={OutReportFromInputs}
                        placeHolder="Tell Brife About You ..."
                    />

                </div>

                <hr className="border m-1 border-green-800 "></hr>

                <div className="flex flex-row justify-end
        font-bold text-2xl">

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

    const { section2FinalInputReport } = useContext(MyContext);

    useEffect(() => {
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
                        name={"Education"}
                        prevValue={section2FinalInputReport[6]}
                        placeHolder=" Ex: BCA From Punjab University"
                    />

                    <GetInput inputName="skills"
                        index={7} OutReport={OutReportFromInputs}
                        inputHeight="32" spaceOccupy={getInputSpace}
                        name={"Skills"}
                        prevValue={section2FinalInputReport[7]}
                        placeHolder="Tell About Your Professional Skills"
                    />

                    <GetInput inputName="experiance"
                        index={8} OutReport={OutReportFromInputs}
                        inputHeight="32" spaceOccupy={getInputSpace}
                        name={"Experiance"}
                        totalInputLength={200}
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
        section3FinalInputReport
    } = useContext(MyContext);

    useEffect(() => {
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

                    <GetInput inputName="email"
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


export { NavShow, Section1, Section2, Section3 }
