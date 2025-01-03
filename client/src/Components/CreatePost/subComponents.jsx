
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

  useEffect(() => {

    if (!OutReport) {
      console.error('please provide Functinoality to the attribute OutReport of the GetInput to get the report of the component');
    }

    if (boolPreviousVal) {
      TheReport.current.inputData.data = prevValue.inputData.data;
      console.log('if prev val the Report is : ', TheReport);
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
      setarr([<ArrayItem index={childIndex.current}
        handleValues={handleReport}
        delFunction={del} />])
    }

  }, [])

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
  }, [])
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

function GetCheckBox({ index, name, inputName, totalInputLength = 100
  , inputHeight = 10, isReadOnly = false,
  spaceOccupy = '40%', prevValue, isDisabled = false,
  OutReport, isMendatory = false
}) {

  const [data, setData] = useState([]);

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

    }
  });

  function refineData(arr) {
    let newarr = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i]) {
        newarr[i] = arr[i];
      }
    }
    TheReport.current.inputData.data = newarr;
  }



  useEffect(() => {

    if (!OutReport) {
      console.error('please provide Functinoality to the attribute OutReport of the GetInput to get the report of the component');
    }


    if (boolPreviousVal) {
      setData((prev) => {
        let newOne = [...prevValue.inputData.data];
        return newOne
      })
    }
  }, [])


  useEffect(() => {

    TheReport.current.inputData.data = [...data];
    OutReport(TheReport.current);
  }, [data])


  return (
    <>
      <div className={`flex flex-col 
       m-1 max-sm:w-[300px] max-md:w-[600px] 
       max-w-[600px] min-w-[300px]
       h-fit `} style={{
          //width: spaceOccupy
        }}>

        <div className="text-[1.2rem] 
      font-bold text-teal-600 m-1 
      ">
          <i>{name}</i>
        </div>

        <div className='flex flex-col items-start
         border border-teal-600 rounded-xl p-3 text-teal-400  '>
          <InputBlock setData={setData} data={data} index={1} name={'Full Time'} inputName={'c1'} /> <br></br>
          <InputBlock setData={setData} data={data} index={2} name={'Part Time'} inputName={'c2'} /><br></br>
          <InputBlock setData={setData} data={data} index={3} name={'Remote'} inputName={'c3'} /><br></br>
          <InputBlock setData={setData} data={data} index={4} name={'Office'} inputName={'c4'} />
        </div>

      </div>
    </>
  );
}

function InputBlock({ inputName, name, setData, index, data }) {
  const button = useRef(null);



  useEffect(() => {
    if (data[index]) {
      button.current.checked = true;
    } else {
      button.current.checked = false;
    }
  }, [data])

  function handleChange() {
    if (button.current.checked) {
      setData((prev) => {
        let newOne = prev.slice();
        newOne[index] = name;
        return newOne;
      })
    } else {
      remove();
    }

  }

  function remove() {
    setData((prev) => {
      let newOne = prev.slice();
      newOne[index] = null;
      return newOne;
    })
  }

  /* 
  
  useEffect(() => {
    if (data) {
      if (data[index]) {
        button.current.checked = true;
        handleChange();
      }
    } else {
      button.current.checked = false;
    remove();
  }
}, [data])
*/
  return (
    <>
      <div className='flex flex-row items-center '>

        <input ref={button} onChange={() => {
          handleChange();
        }} className='size-5' type='checkbox' value={name} name={inputName} ></input>
        <lable className=" text-[1.05rem] m-1 font-bold">{name}</lable>
      </div>
    </>
  );
}

function Button({ children, mode, handle, stateVal }) {

  const butt = useRef('null');
  const [disable, setdisable] = useState(null);
  async function handleButton() {
    if (mode === 'next') {
      handle(1, stateVal);
    }
    else if (mode === 'back') {
      handle(-1, stateVal);

    }
    else if (mode === 'submit') {
      butt.current.innerHTML = 'Submitting';
      setdisable(true);

      let result = await handle(stateVal);
      if (result) {

      }
      setdisable(false);
      butt.current.innerHTML = 'Submit';
    }
  }



  return (
    <>
      <button ref={butt} onClick={handleButton} disabled={disable}
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

          <GetCheckBox index={5} OutReport={OutReportFromInputs}
            prevValue={section2FinalInputReport[5]}
            name={"Job Types"} inputName={'types'}
          />

          <GetInput inputName="desciption"
            index={6} OutReport={OutReportFromInputs}
            prevValue={section2FinalInputReport[6]}
            inputHeight="32" spaceOccupy={getInputSpace}
            name={"About"} totalInputLength={500}
            placeHolder="Your Job Discription"
          />

          <GetInput inputName="qualifications"
            index={7} OutReport={OutReportFromInputs}
            prevValue={section2FinalInputReport[7]}
            inputHeight="32" spaceOccupy={getInputSpace}
            name={"Qualifications"} totalInputLength={500}
            placeHolder=" - Qualifications ...."
          />

          <GetInput inputName="requirments"
            index={8} OutReport={OutReportFromInputs}
            prevValue={section2FinalInputReport[8]}
            inputHeight="32" spaceOccupy={getInputSpace}
            name={"Requirments"}
            totalInputLength={500}
            placeHolder="- Requirments ...."
          />

          <GetInput inputName="responsibilities"
            index={9} OutReport={OutReportFromInputs}
            prevValue={section2FinalInputReport[9]}
            inputHeight="32" spaceOccupy={getInputSpace}
            name={"Responsibilities"}
            totalInputLength={500}
            placeHolder="- Responsiblilities ...."
          />

          <GetInputArray index={10}
            inputName={'tags'} name={'Search Tags'}
            OutReport={OutReportFromInputs}
            prevValue={section2FinalInputReport[10]}
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
            index={11} OutReport={OutReportFromInputs}
            inputHeight="10" spaceOccupy={getInputSpace}
            name={"Email Id"} typeToggle='input' totalInputLength={50}
            prevValue={section3FinalInputReport[11]}
            placeHolder="email@gmail.com"
          />

          <GetInput inputName="x"
            index={12} OutReport={OutReportFromInputs}
            inputHeight="10" spaceOccupy={getInputSpace}
            name={"X"} typeToggle='input' totalInputLength={50}
            prevValue={section3FinalInputReport[12]}
            placeHolder="@twitter account"

          />

          <GetInput inputName="github"
            index={13} OutReport={OutReportFromInputs}
            inputHeight="10" spaceOccupy={getInputSpace}
            name={"GitHub"} typeToggle='input'
            totalInputLength={100}
            prevValue={section3FinalInputReport[13]}
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
  NavShow, Section1,
  Section2, Section3, GetInputArray, GetCheckBox
}
