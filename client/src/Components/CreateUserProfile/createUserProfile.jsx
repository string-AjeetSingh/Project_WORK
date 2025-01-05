import { useReducer, useState, useRef, useEffect } from "react";
import { NavShow, Section1, Section2, Section3 } from "./subComponents";
import { flushSync } from "react-dom";
import { MyContext } from "./myContext";
import { commonContext } from './../../MyLib/commonContext';
import { requestServer } from "../../MyLib/RequestServer/requestServer";
import { useContext } from "react";

const toServer = new requestServer(process.env.REACT_APP_SERVER_URL + "/xtServer/api/register",
    {
        method: 'POST'
    }, true
)

function CreateUserProfile({ isAuthenticated, email, logout }) {

    // let { isAuthenticated } = useContext(commonContext);
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
                outOff={setOff} logout={logout}
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
            outOff={setOff} logout={logout}
            OutReportFromInputs={updateFinalInputReport1}
            buttonHandle1={handleSectionButtons1} />)

    async function tryit() {
        console.log('from try it function ,below the state');
        console.log(section1FinalInputReport);
        console.log(section2FinalInputReport);
        console.log(section3FinalInputReport);
        console.log('from try it function ,Over ----------------- ');
    }

    function placePreviousValueSection3(index, param = {
        isMendatory: null, ok: null,
        name: null, data: null, redNotice: null
    }) {

        if (param instanceof Object) {

            const TheReport = {
                index: index,
                isMendatory: param.isMendatory,
                ok: param.ok,
                inputData: {
                    name: param.name,
                    data: param.data,
                    redNotice: param.redNotice,
                }
            };

            updateFinalInputReport3(TheReport);
        }
        else {
            console.error('param must be instance of Object');
        }
    }

    async function handleSectionButtons1(val, stateVal) {

        let runNext = true;


        for (let item of stateVal) {
            if (item) {

                if (item.isMendatory) {
                    if (!item.ok) {
                        item.inputData.redNotice();
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
        //console.log(initialValues.current.currentSection);
    }
    async function handleSectionButtons3(stateVal) {

        let allData = combineArraysToOne(stateVal);
        console.log('all data is below');
        console.log(allData);
        allData.forEach((item) => {
            console.log('name of input : ', item.inputData.name);
        })


        //......................
        if (allData.length < 1) {
            alert('not data, please provide data to submit');
            return;
        }


        if (allData[0].inputData.data[0].files) {
            // alert('file contained may be');
            if (allData[0].inputData.data[0].files) {
                // alert('file contained here');
                toServer.setFormData('theImg', allData[0].inputData.data[0].files);
                toServer.setFormData('data', allData, true);
            }
        }
        else {
            toServer.setFormData('data', allData, true);
        }
        //console.log('the file is : ', allData[0].inputData.data[0].files);
        //toServer.setContentType('multipart/form-data');

        let res = await toServer.fetchNoStringify();
        toServer.resetFormData();
        if (res) {
            if (res.json.status) {
                console.log('the response from submit : ', res);
                return true;
            }
            else {
                return false;
            }
        } else {
            alert('problem in connection i guess, unable to upload data');
        }
        //.......................

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
        toServer.setAuthorizedFlag(isAuthenticated);

        if (email) {
            placePreviousValueSection3(9, {
                data: email,
                name: 'email'
            });
        }

    }, [])
    return (
        <>
            <div className="p-1">
                <div className="flex flex-row  justify-center
            relative w-full mb-4
           ">
                    <div className="text-4xl font-serif
          text-teal-600  ">
                        Welcome
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

export { CreateUserProfile }













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
