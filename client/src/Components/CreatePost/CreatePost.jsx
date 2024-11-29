import { useReducer, useState, useRef, useEffect } from "react";
import { NavShow, Section1, Section2, Section3 } from "./subComponents";
import { flushSync } from "react-dom";
import { MyContext } from "./myContext";

function CreatePost({ }) {

  const [highLightNav, sethighLightNav] = useState(1);
  const [section1FinalInputReport, setsection1FinalInputReport] = useState([]);
  const [section2FinalInputReport, setsection2FinalInputReport] = useState([]);
  const [section3FinalInputReport, setsection3FinalInputReport] = useState([]);


  const initialValues = useRef({
    noNavShows: 3,
    currentSection: 1,
    lastSection: 3,
    nextSection: null,
    allSectionsArr: [null,
      <Section1 animation={true}
        outOn={setOn}
        outOff={setOff}
        OutReportFromInputs={updateFinalInputReport1}
        buttonHandle1={handleSectionButtons1} />,

      <Section2 animation={true}
        outOn={setOn}
        outOff={setOff}
        OutReportFromInputs={updateFinalInputReport2}
        buttonHandle1={handleSectionButtons2} />,

      <Section3 animation={true}
        outOn={setOn}
        outOff={setOff}
        OutReportFromInputs={updateFinalInputReport3}
        buttonHandle1={handleSectionButtons2}
        submitButton={handleSectionButtons3} />
    ]
  });

  const animationSwitch = useRef({
    on: null,
    off: null
  });

  const [sectionArr, setsectionArr] =
    useState(<Section1 animation={true}
      outOn={setOn}
      outOff={setOff}
      OutReportFromInputs={updateFinalInputReport1}
      buttonHandle1={handleSectionButtons1} />)

  async function tryit() {
    console.log('from try it function ,below the state');
    console.log(section1FinalInputReport);
    console.log(section2FinalInputReport);
    console.log(section3FinalInputReport);
    console.log('from try it function ,Over ----------------- ');
  }

  async function handleSectionButtons1(val, stateVal) {

    let runNext = true;


    for (let val of stateVal) {
      if (val) {

        if (val.isMendatory) {
          if (!val.ok) {
            val.inputData.redNotice();
            runNext = false;
          }
        }
      }

    }

    if (runNext) {

      let finall = null;
      finall = initialValues.current.currentSection + val;

      if (finall >= 1 && finall <= initialValues.current.lastSection) {

        initialValues.current.currentSection = finall;
        sethighLightNav(initialValues.current.currentSection);
        await animationSwitch.current.off();

        flushSync(() => {
          setsectionArr(initialValues.current.allSectionsArr[
            initialValues.current.currentSection
          ]);
        })
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
        await animationSwitch.current.on();

      }
      console.log(initialValues.current.currentSection);
    }
  }

  async function handleSectionButtons2(val) {

    let finall = null;
    finall = initialValues.current.currentSection + val;

    if (finall >= 1 && finall <= initialValues.current.lastSection) {

      initialValues.current.currentSection = finall;
      sethighLightNav(initialValues.current.currentSection);
      await animationSwitch.current.off();

      flushSync(() => {
        setsectionArr(initialValues.current.allSectionsArr[
          initialValues.current.currentSection
        ]);
      })
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      await animationSwitch.current.on();

    }
    console.log(initialValues.current.currentSection);
  }
  async function handleSectionButtons3(stateVal) {

    let allData = combineArraysToOne(stateVal);
    console.log('all data is below');
    console.log(allData);

  }

  function updateFinalInputReport1(param) {

    setsection1FinalInputReport((prev) => {
      let newReport = prev.slice();
      newReport[param.index] = param;
      return newReport;
    })
  }
  function updateFinalInputReport2(param) {

    setsection2FinalInputReport((prev) => {
      let newReport = prev.slice();
      newReport[param.index] = param;
      return newReport;
    })
  }
  function updateFinalInputReport3(param) {

    setsection3FinalInputReport((prev) => {
      let newReport = prev.slice();
      newReport[param.index] = param;
      return newReport;
    })
  }

  function setOn(params) {
    animationSwitch.current.on = params;
  }
  function setOff(params) {
    animationSwitch.current.off = params;
  }

  useEffect(() => {
    animationSwitch.current.on();

  }, [])
  return (
    <>
      <div className="p-1">
        <div className="flex flex-row   ">
          <div className="text-4xl font-serif 
          text-teal-600 mt-3 ml-3 mb-4 ">
            Create Post
          </div>

        </div>
        <div className="flex flex-row 
         justify-center ">
          <NavShow howMuch={3} highLight={highLightNav} ></NavShow>
        </div>

        <MyContext.Provider value={{
          tryit, section1FinalInputReport, section2FinalInputReport
          , section3FinalInputReport

        }}>

          <div className="flex flex-row 
         justify-center w-full  ">
            {sectionArr}
          </div>

        </MyContext.Provider>




      </div>
    </>
  );
}

export { CreatePost }

















//function Ahead..................................

function combineArraysToOne(arrofArrays) {
  let one = [];
  for (let val of arrofArrays) {
    for (let subval of val) {
      if (subval) {
        one.push(subval);
      }
    }
  }

  return one;
}