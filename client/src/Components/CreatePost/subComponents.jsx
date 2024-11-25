
import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import { ProfileImageSection } from "../UserProfile/subComponents";
import { useState, useEffect, useRef } from 'react';
import { useResizeValue } from "../../MyLib/MyHook/customHook";

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
      <div className="bg-slate-700 p-5 flex flex-row
       rounded-2xl border-2 border-green-800 w-full  ">
        <div className="size-36 relative top-14
        border-2 border-green-900
         rounded-full bg-slate-500 "></div>

      </div>
    </>);
  }
  else if (width <= 380) {

    return (<>
      <div className="bg-slate-700 p-5 flex flex-row
       rounded-2xl border-2 border-green-800 w-full  ">
        <div className="size-28 relative top-12
        border-2 border-green-900
         rounded-full bg-slate-500 "></div>

      </div>
    </>);
  }
  else {
    return (<>
      <div className="bg-slate-700 p-5 flex flex-row w-full
       rounded-2xl border-2 border-green-800 max-w-[650px] ">
        <div className="size-40 relative top-16
        border-2 border-green-900
         rounded-full bg-slate-500 "></div>

      </div>
    </>);
  }
}

function CircleNumberNavItem({ children, addOnStyle = "" }) {
  return (
    <>
      <div className={`text-[1.1rem] rounded-full 
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

function NavShow({ children, containerClass }) {
  return (
    <>
      <div className="flex flex-row p-1 items-center  ">
        <CircleNumberNavItem addOnStyle={""}>1</CircleNumberNavItem><LineNavItem />
        <CircleNumberNavItem>2</CircleNumberNavItem> <LineNavItem />
        <CircleNumberNavItem>3</CircleNumberNavItem>
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

function Button({ children, mode }) {


  let directionSymbole = '';
  if (mode === 'next') {
    directionSymbole = ">";
  }
  else if (mode === 'back') {
    directionSymbole = "<";

  }
  return (
    <>
      <button className=" m-1 p-2
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



function Section1({ children }) {

  const windowWidth = useResizeValue(window.innerWidth);
  const [getInputWrapperClassName, setGIWC] = useState("");
  const [getInputSpace, setGIS] = useState('');

  useEffect(() => {
    if (windowWidth < 700) {
      setGIWC(`flex flex-col 
          item-start`)
      setGIS('80%');
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

      <div className=" m-1 p-4 border 
      border-green-800 rounded-2xl
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

          <Button mode={'next'}>
            Next
          </Button>
        </div>

      </div>
    </>
  );
}

function Section2({ children }) {


  const windowWidth = useResizeValue(window.innerWidth);
  const [getInputWrapperClassName, setGIWC] = useState("");
  const [getInputSpace, setGIS] = useState('');

  useEffect(() => {
    if (windowWidth < 700) {
      setGIWC(`flex flex-col 
          item-start`)
      setGIS('80%');
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

      <div className=" m-1 p-4 border 
      border-green-800 rounded-2xl
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
          <Button mode={'back'}>
            Back
          </Button>
          <Button mode={'next'}>
            Next
          </Button>
        </div>

      </div>

    </>
  );
}

function Section3({ children }) {

  const windowWidth = useResizeValue(window.innerWidth);
  const [getInputWrapperClassName, setGIWC] = useState("");
  const [getInputSpace, setGIS] = useState('');

  useEffect(() => {
    if (windowWidth < 700) {
      setGIWC(`flex flex-col 
          item-start`)
      setGIS('80%');
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

      <div className=" m-1 p-4 border 
      border-green-800 rounded-2xl
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
          <Button mode={'back'}>
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
