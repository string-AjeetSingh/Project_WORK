import { useReducer, useState, useRef, useEffect } from "react";
import { NavShow, Section1, Section2, Section3 } from "./subComponents";
import { flushSync } from "react-dom";
import { MyContext } from "./myContext";
import { requestServer } from "../../MyLib/RequestServer/requestServer";
import { useControlLogin } from "../../MyLib/MyHook/controlLogin";
import { useNavigate } from "react-router-dom";
import { commonContext } from "../../MyLib/commonContext";
import { Header } from "../Header/header";

const toServer = new requestServer(process.env.REACT_APP_SERVER_URL
  + "/xtServer/api/createPost",
  {
    method: 'POST'
  }, true
)

function CreatePost({ }) {

  const [highLightNav, sethighLightNav] = useState(1);
  const [section1FinalInputReport, setsection1FinalInputReport] = useState([]);
  const [section2FinalInputReport, setsection2FinalInputReport] = useState([]);
  const [section3FinalInputReport, setsection3FinalInputReport] = useState([]);
  const { isAuthenticated, isLoading, nowLogout, user } = useControlLogin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        toServer.setAuthorizedFlag(isAuthenticated);

      } else {
        navigate('/');
      }
    }
  }, [isLoading, isAuthenticated])


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

    if (allData.length < 1) {
      alert('not data, please provide data to submit');
      return;
    }



    if (allData[0].index === 1) {
      alert('file contained may be');
      if (allData[0].inputData.data[0].files) {
        alert('file contained here');
        toServer.setFormData('theImg', allData[0].inputData.data[0].files);
        toServer.setFormData('data', allData.slice(1, allData.length), true);
      }
    } else {
      toServer.setFormData('data', allData, true);
    }
    //console.log('the file is : ', allData[0].inputData.data[0].files);
    //toServer.setContentType('multipart/form-data');

    let res = await toServer.fetchNoStringify();
    toServer.resetFormData();
    if (res) {

      alert('Uploaded succesfully ');
      navigate('/provider');
      console.log('the response from submit : ', res);
      return true;

    } else {
      alert('problem in connection i guess, unable to upload data');
      return false;
    }

    //return
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
    if (animationSwitch.current.on) {

      animationSwitch.current.on();
    }

  }, [isAuthenticated])

  if (!isLoading) {
    if (isAuthenticated) {

      return (
        <>
          <header >
            <commonContext.Provider value={{ user }}>
              <Header logout={nowLogout} search_Link ></Header>
            </commonContext.Provider>
          </header>
          <hr className="border-[1px] 
                                 border-green-950"></hr>
          <div className="p-1">
            <div className="flex flex-row  justify-center
            relative w-full mb-4
           ">
              <div className="text-4xl font-serif
          text-teal-600  ">
                Create Job
              </div>

            </div>
            <div className="flex flex-row 
         justify-center ">
              <NavShow howMuch={3} highLight={highLightNav} ></NavShow>
            </div>

            <MyContext.Provider value={{
              tryit, section1FinalInputReport, section2FinalInputReport
              , section3FinalInputReport, isAuthenticated

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
  } else {
    return (<h2 className="font-bold text-3xl font-serif">Checking authentication please wait ... </h2>)
  }
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