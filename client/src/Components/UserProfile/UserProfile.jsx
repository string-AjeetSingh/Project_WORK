import { useEffect, useRef, useState } from 'react';
import {
    ProfileImageSection, BulletShow, NewSkills,
    ProfileSection2, Education, Experiance
    , Skills, Discription, SocialMedia,
    NewProfileSection, NewSocialMedia,
    BlurScreen
} from './subComponents';
import {
    Button, GetInput,
    GetInputArray, ProfileImage, SectionHeading
} from '../CreateUserProfile/subComponents';

import { requestServer } from '../../MyLib/RequestServer/requestServer';
import { useResizeValue } from '../../MyLib/MyHook/customHook';
import { MyContext } from './myContext';
import { useNavigate } from 'react-router-dom';
import { flushSync } from 'react-dom';
import './userProfile.css';


const toServer = new requestServer(process.env.REACT_APP_SERVER_URL + "/xtServer/api/updateUserProfile",
    {
        method: 'POST'
    }, true
)


function UserProfile({ children, isAuthenticated, useAsUpdate, email, iAmReady }) {

    const [data, setdata] = useState(null);

    const [sectionReport, setsectionReport] = useState([]);
    const [getInputWrapperClassName, setGIWC] = useState("");
    const [getInputSpace, setGIS] = useState('');
    const [BlurChild, setBlurChild] = useState(null);
    const windowWidth = useResizeValue(window.innerWidth);
    const navigate = useNavigate();

    function placeArrayToSectionInput(arr) {
        setsectionReport((prev) => {
            let newOne = prev.slice();
            //  console.log('The arr from placeArrayToSectionInput', arr);
            arr.forEach((item) => {
                newOne[item.index] = { ...item }
            })
            return newOne;
        })
    }

    function closeBlurChild() {
        if (BlurChild)
            setBlurChild(null)
        else
            console.log('already off blur child');
    }

    function returnReportFormat(index, param = {
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

            return TheReport
        }
        else {
            console.error('param must be instance of Object');
            return false;
        }
    }

    function placePreviousValue(index, param = {
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

            updateFinalInputReport(TheReport);
        }
        else {
            console.error('param must be instance of Object');
        }
    }

    function updateFinalInputReport(param) {   //update the report, work as outreport
        flushSync(() => {

            setsectionReport((prev) => {
                let newReport = prev.slice();
                newReport[param.index] = param;
                return newReport;
            })
        })
    }

    async function handleSectionButtons(stateVal) {

        let allData = combineArraysToOne(stateVal);
        //let allData = stateVal;
        //console.log('all data is below');
        //console.log(allData);


        allData.forEach((item) => {
            //console.log('name of input : ', item.inputData.name);
        })



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


        let res = await toServer.fetchNoStringify();
        toServer.resetFormData();
        if (res) {
            if (res.json.status) {
                //console.log('the response from submit : ', res);
                return true;
            }
            else {
                return false;
            }
        } else {
            alert('problem in connection, unable to upload data');
        }


    }

    //------------------------------------------------------------------------

    async function userDetail(params) {

        const userDetial = new requestServer(process.env.REACT_APP_SERVER_URL
            + "/xtServer/api/userDetail"
            , { method: 'GET' }
            , true);

        delete (userDetial.options.body);

        userDetial.setAuthorizedFlag(isAuthenticated);
        let result = await userDetial.requestJson();

        if (result) {
            if (result.json.status) {

                // console.log('the user detail would be : ', result);
                //console.log(result.json.data);

                setdata(result.json.data);
                if (iAmReady) {
                    iAmReady.current.off();
                }
            }
            else {
                console.error('server error, ' + result.json.message);
            }
        }
        else {
            console.error('error from userDetail()');
        }


    }
    useEffect(() => {
        userDetail();
        if (email) {
            placePreviousValue(9, {
                data: email,
                name: 'email'
            });
        }
        toServer.setAuthorizedFlag(isAuthenticated);


    }, [])


    useEffect(() => {
        // console.log('from useeffect the data is : ', data);
        if (data) {
            let arr = [];
            arr.push(returnReportFormat(1, {
                data: [{ tempUrl: data.userData.img !== "" ? data.userData.img : null },
                { color: data.userData.color }],
                name: 'theImg'
            }));

            arr.push(returnReportFormat(2, {
                data: data.userData.name,
                name: 'name'
            }));

            arr.push(returnReportFormat(3, {
                data: data.userData.title,
                name: 'title'
            }));

            arr.push(returnReportFormat(4, {
                data: data.userData.status,
                name: 'status'
            }));

            arr.push(returnReportFormat(5, {
                data: data.userData.description,
                name: 'discription'
            }));

            arr.push(returnReportFormat(6, {
                data: data.userData.education,
                name: 'education'
            }))

            arr.push(returnReportFormat(7, {
                data: data.userData.skills,
                name: 'skills'
            }))

            arr.push(returnReportFormat(8, {
                data: data.userData.experiance,
                name: 'experiance'
            }))

            arr.push(returnReportFormat(10, {
                data: data.userSocialData.github,
                name: 'github'
            }))

            arr.push(returnReportFormat(11, {
                data: data.userSocialData.x,
                name: 'x'
            }))

            placeArrayToSectionInput(arr);
        }
    }, [data])

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
            {data ?
                useAsUpdate ?
                    <div className='p-2 flex flex-row justify-center '>

                        <div className=" m-1 p-4 border 
      border-green-800 rounded-2xl relative 
      flex flex-col w-full max-w-[800px] " >


                            <div className="self-center w-full
          flex flex-row justify-center ">
                                <MyContext.Provider value={{
                                    index: 1, OutReportFromInputs: updateFinalInputReport,
                                    prevData: sectionReport[1]
                                }}>
                                    <ProfileImage
                                        prevData={sectionReport[1]} useAsUpdate>

                                    </ProfileImage>
                                </MyContext.Provider>

                            </div><br></br><br></br>

                            <SectionHeading>Personal Detail</SectionHeading> <br></br>
                            <GetInput index="2" inputName="name"
                                inputHeight="10" spaceOccupy={getInputSpace}
                                name={"User Name"} typeToggle='input'
                                placeHolder="Ex : Ajeet Singh"
                                totalInputLength={50}
                                prevValue={sectionReport[2]}
                                OutReport={updateFinalInputReport}
                            />

                            <GetInput index="3" inputName="title"
                                inputHeight="10" spaceOccupy={getInputSpace}
                                name={"Professional Title"} typeToggle='input'
                                placeHolder="Ex : Web Developer" totalInputLength={50}
                                prevValue={sectionReport[3]}
                                OutReport={updateFinalInputReport}
                            />

                            <GetInput index='4' inputName="status"
                                inputHeight="20" spaceOccupy={getInputSpace}
                                name={"Status"} OutReport={updateFinalInputReport}
                                prevValue={sectionReport[4]}
                                placeHolder="Tell what you working on ..."
                            />

                            <GetInput index="5" inputName="discription"
                                inputHeight="32" spaceOccupy={getInputSpace}
                                name={"Discription"}
                                prevValue={sectionReport[5]}
                                totalInputLength={200} OutReport={updateFinalInputReport}
                                placeHolder="Tell Brife About You ..."
                            />
                            <br />
                            <SectionHeading>Your Knowledge</SectionHeading> <br></br>

                            <GetInput inputName="education"
                                index={6} OutReport={updateFinalInputReport}
                                inputHeight="32" spaceOccupy={getInputSpace}
                                name={"Education"} totalInputLength={250}
                                prevValue={sectionReport[6]}
                                placeHolder=" Ex: BCA From Punjab University"
                            />

                            <GetInputArray OutReport={updateFinalInputReport}
                                prevValue={sectionReport[7]} index={7} inputName={'skills'}
                                name={"Skills"} />

                            <GetInput inputName="experiance"
                                index={8} OutReport={updateFinalInputReport}
                                inputHeight="32" spaceOccupy={getInputSpace}
                                name={"Experiance"}
                                totalInputLength={500}
                                prevValue={sectionReport[8]}
                                placeHolder="About Your Experiance"
                            />
                            <br />
                            <SectionHeading>Social Details</SectionHeading> <br></br>

                            <GetInput inputName="email" isDisabled
                                index={9} OutReport={updateFinalInputReport}
                                inputHeight="10" spaceOccupy={getInputSpace}
                                name={"Email Id"} typeToggle='input' totalInputLength={50}
                                prevValue={sectionReport[9]}
                                placeHolder="email@gmail.com"
                            />

                            <GetInput inputName="x"
                                index={10} OutReport={updateFinalInputReport}
                                inputHeight="10" spaceOccupy={getInputSpace}
                                name={"X"} typeToggle='input' totalInputLength={50}
                                prevValue={sectionReport[10]}
                                placeHolder="@twitter account"

                            />

                            <GetInput inputName="github"
                                index={11} OutReport={updateFinalInputReport}
                                inputHeight="10" spaceOccupy={getInputSpace}
                                name={"GitHub"} typeToggle='input'
                                totalInputLength={100}
                                prevValue={sectionReport[11]}
                                placeHolder="github/UserName/YourRepository"
                            />

                            <div className='flex flex-row w-full 
                            justify-between self-center '>

                                <Button mode={'cancel'}>Cancel</Button>
                                <Button useAsUpdate handle={handleSectionButtons}
                                    stateVal={[
                                        sectionReport
                                    ]}
                                    mode={'submit'}>
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </div>
                    :
                    <div className=' p-2 flex flex-col items-center  ' >
                        <div style={{
                            backgroundColor: 'var(--greenLight-trans)',
                            paddingBottom: '50px'
                        }} className='p-2   flex flex-col w-full 
                        rounded-2xl 
                        max-w-[900px] min-w-[360px]'>

                            {BlurChild ?
                                <BlurScreen handleClick={closeBlurChild}>{BlurChild}</BlurScreen>
                                : null}

                            <ProfileImageSection screen={data.userData.color} imgSrc={data.userData.img}></ProfileImageSection>
                            <br></br>

                            <button onClick={() => {
                                navigate('/updateProfile');
                            }}
                                className="m-1  text-[1rem] rounded-md bg-green-950
                        border-[2px] hover:bg-green-800 active:bg-green-900
                        text-green-200 w-52 self-center rounded-tl-2xl
                        border-green-950 p-1">
                                <div className='flex flex-row justify-center items-center'>

                                    <img src='/stock/icon/edit.png'
                                        className='size-7 mr-2'></img>
                                    <span >Edit Profile</span>
                                </div>
                            </button>

                            <button onClick={() => {
                                navigate('/provider');
                            }}
                                className="m-1  text-[1rem] rounded-md bg-green-950
                        
                        border-[2px] hover:bg-green-800 active:bg-green-900
                        text-green-200 w-80 self-center rounded-tl-2xl
                        border-green-950 p-1">
                                <div className='flex flex-row justify-center items-center'>

                                    <img src='/stock/icon/switch1.png'
                                        className='size-7 mr-2'></img>
                                    <span >Switch To Provider</span>
                                </div>
                            </button>

                            <NewProfileSection setBlurScreen={setBlurChild} name={data?.userData?.name ? data.userData.name : 'undefined'}
                                title={data?.userData?.title ? data?.userData?.title : 'undefined'}
                                status={data?.userData?.status ? data?.userData?.status : 'undefined'}
                                heading="Basic"
                            />
                            <br></br>
                            <div className='flex flex-col'>

                                <BulletShow type={'description'} name={"Description"} closeBlurScreen={closeBlurChild}
                                    setBlurScreen={setBlurChild}
                                    dataArray={data.userData.description}>

                                </BulletShow>
                                <BulletShow type={'experiance'} name={"Experiance"} closeBlurScreen={closeBlurChild}
                                    setBlurScreen={setBlurChild}
                                    dataArray={data.userData.experiance}>

                                </BulletShow>
                                <BulletShow type={'education'} name={"Education"} closeBlurScreen={closeBlurChild}
                                    setBlurScreen={setBlurChild}
                                    dataArray={data.userData.education}>

                                </BulletShow>

                                <NewSkills setBlurScreen={setBlurChild} dataArray={data.userData.skills} />
                            </div>
                            <br></br>

                            <NewSocialMedia setBlurScreen={setBlurChild} email={data.userSocialData.email}
                                github={data.userSocialData.github} x={data.userSocialData.x} />

                        </div>
                    </div>


                : <h3>No User Data To Show</h3>}


        </>
    );
}


export { UserProfile };























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