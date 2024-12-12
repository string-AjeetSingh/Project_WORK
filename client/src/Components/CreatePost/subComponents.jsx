
import { useState, useEffect, useRef } from 'react';
import { useResizeValue } from "../../MyLib/MyHook/customHook";
import { useAnimationOnOff } from "../../MyLib/MyHook/customAnimationOnOff";
import { requestServer } from '../../MyLib/RequestServer/requestServer';
import { MyContext } from './myContext';
import { useContext } from 'react';

function ProfileImage({ children }) {

  const [width, setwidth] = useState(window.innerWidth);
  const [src, setsrc] = useState(null);

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
      <div className="p-1 flex flex-col items-center">

        <div className="size-36 relative 
        border-2 border-green-700 overflow-hidden
         rounded-full bg-slate-500 ">
          {src ? <img src={src} alt='profile Img'></img> : null}
        </div>

        <UploadButton setImg={setsrc}
          className="relative left-14 flex flex-row 
        justify-center items-center bg-green-950 rounded-xl p-1 scale-75
          bottom-10 border border-black"/>

        <div className="text-[0.9rem] font-bold
relative bottom-5 ">
          Png/Jpg/Jpeg
        </div>

        <div className="text-[1.2rem]
 text-teal-600
font-bold">
          Organisation Logo/Icon
        </div>

      </div>




    </>);
  }
  else if (width <= 380) {

    return (<>

      <div className="p-1 flex flex-col items-center">

        <div className="size-28 relative 
        border-2 border-green-700 overflow-hidden
         rounded-full bg-slate-500 ">
          {src ? <img src={src} alt='profile Img'></img> : null}
        </div>

        <UploadButton setImg={setsrc}
          className="relative left-14 flex flex-row 
        justify-center items-center bg-green-950 rounded-xl p-1 scale-75
          bottom-10 border border-black"/>

        <div className="text-[0.9rem] font-bold
        relative bottom-5 ">
          Png/Jpg/Jpeg
        </div>

        <div className="text-[1.2rem]
         text-teal-600
        font-bold">
          Organisation Logo/Icon
        </div>

      </div>



    </>);
  }
  else {
    return (<>


      <div className="p-1 flex flex-col items-center">


        <div className="size-40 relative 
        border-2 border-green-700 overflow-hidden
         rounded-full bg-slate-500 ">
          {src ? <img src={src} alt='profile Img'></img> : null}
        </div>


        <UploadButton setImg={setsrc}
          className="relative left-14 flex flex-row 
        justify-center items-center bg-green-950 rounded-xl p-1 scale-75
          bottom-10 border border-black"/>

        <div className="text-[0.9rem] font-bold
relative bottom-5 ">
          Png/Jpg/Jpeg
        </div>

        <div className="text-[1.2rem]
 text-teal-600
font-bold">
          Organisation Logo/Icon
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

function GetInput({ index, name, inputName, totalInputLength = 100
  , inputHeight = 10, typeToggle = true, placeHolder = '', isReadOnly = false,
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

    if (!OutReport) {
      console.error('please provide Functinoality to the attribute OutReport of the GetInput to get the report of the component');
    }

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
          <i>{name}</i>
        </div>


        {typeToggle == 'input' ?
          <input
            ref={aref} readOnly={isReadOnly}
            name={inputName} disabled={isDisabled}
            onChange={(e) => {
              handledChanbg(e);
            }}
            placeholder={placeHolder}
            className={`border border-teal-500
              focus:outline-teal-400  
        bg-transparent rounded-md text-green-200
        p-1 h-${inputHeight}`}
            maxLength={totalInputLength}>

          </input>
          :
          <textarea
            ref={aref} readOnly={isReadOnly} disabled={isDisabled}
            name={inputName}
            onChange={(e) => {
              handledChanbg(e);
            }}
            placeholder={placeHolder}
            className={`border border-teal-500
               focus:outline-teal-400  
        bg-transparent rounded-md text-green-200
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
      justify-center hover:bg-green-900 active:bg-green-800 active:text-teal-950
      bg-green-950 rounded-xl 
      text-teal-700 
      border border-green-800" >

        {children}

      </button>
    </>
  );
}


function UploadButton({ setImg,
  children, className, onClick = null }) {

  let inputRef = useRef(null);
  const { index, prevData, isAuthenticated,
    OutReportFromInputs } = useContext(MyContext);

  const toServer = new requestServer(process.env.REACT_APP_SERVER_URL + '/xtServer/api/temp', {
    method: 'POST'
  });

  const TheReport = useRef({
    index: index,
    isMendatory: null,
    ok: false,
    inputData: {
      name: 'watch in data, it contain two datas files and color as array',
      data: [],
      redNotice: null,
    }
  });

  function handleClick() {
    inputRef.current.click();

  }

  async function setImage() {
    toServer.setAuthorizedFlag(isAuthenticated);
    toServer.setFormData('tempImg', TheReport.current.inputData.data[0].files);
    let result = await toServer.fetchNoStringify();

    if (result.status === 200) {
      alert('succesfully send temp data');
      console.log('from sending temp data  : ', result);

      if (result.json) {
        setImg(result.json.filePath);
        TheReport.current.inputData.src = result.json.filePath
      }
    }
    else {
      alert("fail to send temp data");
      console.log('from sending temp data  : ', result);
    }
  }

  async function handleChangeFile(e) {
    console.log('Changing file');



    if (prevData) {
      TheReport.current.inputData.data = [
        { files: e.target.files[0] },
        prevData.inputData.data[1]
      ]
    } else {
      TheReport.current.inputData.data = [
        { files: e.target.files[0] },
        null
      ]
    }

    await setImage();

    OutReportFromInputs(TheReport.current);
  }


  useEffect(() => {
    console.log("previous data is below");
    console.log(prevData);
    if (prevData) {
      // alert('found previous data');
      if (prevData.inputData.src) {
        // alert('found previous data.src');
        setImg(prevData.inputData.src)
      }
    }

  }, [prevData])


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


function Section1({ children, animation = false,
  outOn, outOff, buttonHandle1, buttonHandle2,
  OutReportFromInputs }) {

  const secElem = useRef(null);
  const { on, off } = useAnimationOnOff(secElem);
  const windowWidth = useResizeValue(window.innerWidth);
  const [getInputWrapperClassName, setGIWC] = useState("");
  const [getInputSpace, setGIS] = useState('');
  const { section1FinalInputReport } = useContext(MyContext);
  const { tryit } = useContext(MyContext);

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
        <SectionHeading>Organisation Detail</SectionHeading> <br></br>

        <div className="self-center w-full
          flex flex-row justify-center ">
          <MyContext.Provider value={{
            index: 1, OutReportFromInputs,
            prevData: section1FinalInputReport[1]
          }}>

            <ProfileImage
            ></ProfileImage>

          </MyContext.Provider>
        </div><br></br><br></br>

        <div className={getInputWrapperClassName}>

          <GetInput index={2} inputName="companyName"
            inputHeight="10" spaceOccupy={getInputSpace}
            name={"Company Name"} typeToggle='input'
            placeHolder="Ex : Microsoft"
            isMendatory={true} totalInputLength={50}
            prevValue={section1FinalInputReport[2]}
            OutReport={OutReportFromInputs}
          />

          <GetInput index={3} inputName="title"
            inputHeight="20" spaceOccupy={getInputSpace}
            name={"Job Title"}
            placeHolder="Senior Web Developer"
            prevValue={section1FinalInputReport[3]}
            OutReport={OutReportFromInputs}
          />

          <GetInput index={4} inputName="location"
            inputHeight="20" spaceOccupy={getInputSpace}
            name={"Addresh"} totalInputLength={200}
            placeHolder="Hoshiarpur, Mohali"
            OutReport={OutReportFromInputs}
            prevValue={section1FinalInputReport[4]}
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
        <SectionHeading>Job Detail</SectionHeading> <br></br>

        <div className={getInputWrapperClassName}>

          <GetInput inputName="desciption"
            index={5} OutReport={OutReportFromInputs}
            prevValue={section2FinalInputReport[5]}
            inputHeight="32" spaceOccupy={getInputSpace}
            name={"About"} totalInputLength={500}
            placeHolder="Your Job Discription"
          />

          <GetInput inputName="qualifications"
            index={6} OutReport={OutReportFromInputs}
            prevValue={section2FinalInputReport[6]}
            inputHeight="32" spaceOccupy={getInputSpace}
            name={"Qualifications"} totalInputLength={500}
            placeHolder=" - Qualifications ...."
          />

          <GetInput inputName="requirments"
            index={7} OutReport={OutReportFromInputs}
            prevValue={section2FinalInputReport[7]}
            inputHeight="32" spaceOccupy={getInputSpace}
            name={"Requirments"}
            totalInputLength={500}
            placeHolder="- Requirments ...."
          />

          <GetInput inputName="responsibilities"
            index={8} OutReport={OutReportFromInputs}
            prevValue={section2FinalInputReport[8]}
            inputHeight="32" spaceOccupy={getInputSpace}
            name={"Responsibilities"}
            totalInputLength={500}
            placeHolder="- Responsiblilities ...."
          />

        </div>

        <hr className="border m-1 border-green-800 "></hr>

        <div className="flex flex-row justify-between
        font-bold text-2xl">
          <Button handle={buttonHandle1} mode={'back'}>
            Back
          </Button>
          <Button handle={buttonHandle1} mode={'next'}>
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
