
import { useState, useEffect, useRef } from 'react';
import { useResizeValue } from "../../MyLib/MyHook/customHook";
import { useAnimationOnOff } from "../../MyLib/MyHook/customAnimationOnOff";


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
      <div className="p-1 flex flex-col items-center">

        <div className="size-36 relative 
        border-2 border-green-700
         rounded-full bg-slate-500 "></div>

        <UploadButton className="relative left-14 flex flex-row 
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
        border-2 border-green-700
         rounded-full bg-slate-500 "></div>

        <UploadButton className="relative left-14 flex flex-row 
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
        border-2 border-green-700
         rounded-full bg-slate-500 "></div>


        <UploadButton className="relative left-14 flex flex-row 
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

function GetInput({ name, inputName, totalInputLength = 100
  , inputHeight = 10, typeToggle = true, placeHolder = '',
  spaceOccupy = '40%'
}) {



  const [string, setString] = useState(['', totalInputLength]);

  function handledChanbg(event) {
    if (string[0].length < totalInputLength) {
      setString([event.target.value, string[1]])
    }
  }



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
          <input onChange={(e) => {
            handledChanbg(e);
          }}
            placeholder={placeHolder}
            className={`border border-teal-500
        bg-transparent rounded-md 
        p-1 h-${inputHeight}`}
            maxLength={totalInputLength}>

          </input>
          :
          <textarea onChange={(e) => {
            handledChanbg(e);
          }}
            placeholder={placeHolder}
            className={`border border-teal-500
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

function Button({ children, mode, handle }) {


  function handleButton() {
    if (mode === 'next') {
      handle(1);
    }
    else if (mode === 'back') {
      handle(-1);

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


function UploadButton({ children, className, onClick = null }) {
  return (
    <>
      <button className={className} onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
      >
        <img className="size-8   border-black rounded-full"
          src="./stock/icon/pencileSmall.gif"
          alt='Edit Button'>
        </img>
        <div className="m-1 font-bold 
          text-teal-600">Upload</div>
      </button>
    </>
  );
}


function Section1({ children, animation = false,
  outOn, outOff, buttonHandle1 }) {

  const secElem = useRef(null);
  const { on, off } = useAnimationOnOff(secElem);
  const windowWidth = useResizeValue(window.innerWidth);
  const [getInputWrapperClassName, setGIWC] = useState("");
  const [getInputSpace, setGIS] = useState('');


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
        <SectionHeading>Organisation Detail</SectionHeading> <br></br>

        <div className="self-center w-full
          flex flex-row justify-center ">
          <ProfileImage></ProfileImage>
        </div><br></br><br></br>

        <div className={getInputWrapperClassName}>

          <GetInput inputHeight="10" spaceOccupy={getInputSpace}
            name={"Company Name"} typeToggle='input'
            placeHolder="Ex : Microsoft"
          />

          <GetInput inputHeight="20" spaceOccupy={getInputSpace}
            name={"Job Title"}
            placeHolder="Senior Web Developer"
          />

          <GetInput inputHeight="20" spaceOccupy={getInputSpace}
            name={"Addresh"}
            totalInputLength={200}
            placeHolder="Hoshiarpur, Mohali"
          />

        </div>

        <hr className="border m-1 border-green-800 "></hr>

        <div className="flex flex-row justify-end
        font-bold text-2xl">

          <Button handle={buttonHandle1}
            mode={'next'}>
            Next
          </Button>
        </div>

      </div>
    </>
  );
}

function Section2({ children, animation = false,
  outOn, outOff, buttonHandle1 }) {

  const secElem = useRef(null);
  const { on, off } = useAnimationOnOff(secElem);
  const windowWidth = useResizeValue(window.innerWidth);
  const [getInputWrapperClassName, setGIWC] = useState("");
  const [getInputSpace, setGIS] = useState('');


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
        <SectionHeading>Job Detail</SectionHeading> <br></br>

        <div className={getInputWrapperClassName}>

          <GetInput inputHeight="32" spaceOccupy={getInputSpace}
            name={"About"}
            placeHolder="Your Job Discription"
          />

          <GetInput inputHeight="32" spaceOccupy={getInputSpace}
            name={"Qualifications"}
            placeHolder=" - Qualifications ...."
          />

          <GetInput inputHeight="32" spaceOccupy={getInputSpace}
            name={"Responsibilities"}
            totalInputLength={200}
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
  outOn, outOff, buttonHandle1 }) {

  const secElem = useRef(null);
  const { on, off } = useAnimationOnOff(secElem);
  const windowWidth = useResizeValue(window.innerWidth);
  const [getInputWrapperClassName, setGIWC] = useState("");
  const [getInputSpace, setGIS] = useState('');

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

          <GetInput inputHeight="10" spaceOccupy={getInputSpace}
            name={"Email Id"} typeToggle='input' totalInputLength={50}
            placeHolder="email@gmail.com"
          />

          <GetInput inputHeight="10" spaceOccupy={getInputSpace}
            name={"X"} typeToggle='input' totalInputLength={50}
            placeHolder="@twitter account"
          />

          <GetInput inputHeight="10" spaceOccupy={getInputSpace}
            name={"GitHub"} typeToggle='input'
            totalInputLength={100}
            placeHolder="github/UserName/YourRepository"
          />

        </div>

        <hr className="border m-1 border-green-800 "></hr>

        <div className="flex flex-row justify-between
        font-bold text-2xl">
          <Button handle={buttonHandle1} mode={'back'}>
            Back
          </Button>
          <Button mode={'next'}>
            Submit
          </Button>
        </div>

      </div>

    </>
  );
}


export { NavShow, Section1, Section2, Section3 }
