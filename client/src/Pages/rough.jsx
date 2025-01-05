import { useEffect, useRef, useState } from 'react';
import { AboutJob } from '../Components/Rough/AboutJob';
import { UserProfile } from '../Components/UserProfile/UserProfile';
import { CreatePost } from '../Components/CreatePost/CreatePost';
import { CreateUserProfile } from '../Components/CreateUserProfile/createUserProfile';
import { JobCards } from '../Components/JobCards/jobCards';
import { LoginTry } from '../Components/Rough/login';
import { TryConnection } from '../Components/Rough/tryConnectionServer';
import { LoadingScreen } from '../Components/TranstitionScreen/LoadingScreen';
import { useNavigate } from 'react-router-dom';
import { use } from 'react';
import { GetInputArray, GetCheckBox } from '../Components/CreatePost/subComponents';
import { requestServer } from '../MyLib/RequestServer/requestServer';
import { up } from '../MyLib/Animation/animation';






function Rough({ children }) {
    const navigate = useNavigate();
    const loadingScreen = useRef(null);
    const fileinput = useRef(null);
    const [disableit, setdisableit] = useState([null, null]);
    const theInputs = useRef({ type: '', email: '' });

    async function uploadImg(e) {
        //console.log("from uploadImg -- -- -- ");
        let otherData = {};
        if (theInputs.current.type.length > 0 && theInputs.current.email.length > 0) {
            otherData = {
                type: theInputs.current.type,
                no: theInputs.current.email
            }
            //console.log('the otherData is  : ', otherData);
        } else {
            alert('provide type and no please');
            console.error('provide type and no.');
            return;
        }


        const upload = new requestServer('/xtServer/api/DUpdateServer', {
            method: 'POST',
        });

        //console.log('the file is : ', e.target.files[0]);
        upload.setFormData('data', otherData, true);
        upload.setFormData("theImg", e.target.files[0]);
        let result = await upload.fetchNoStringify();
        upload.resetFormData();

        if (result) {
            //console.log('the result from server is : ', result);
        }

    }

    async function uploadPdf(e) {
        //console.log("from uploadPdf -- -- -- ");

        const upload = new requestServer('/xtServer/api/roughPdf', {
            method: 'POST',
        });

        //console.log('the file is : ', e.target.files[0]);
        upload.setFormData("thePdf", e.target.files[0]);
        let result = await upload.fetchNoStringify();
        upload.resetFormData();

        if (result) {
            //console.log('the result from server is : ', result);
        }
    }



    return (
        <>


            {/*<LoadingScreen />*/}


            <div className="p-2">
                {/*<JobCards></JobCards>*/}
                {/*<AboutJob></AboutJob>*/}
                {/*<CreatePost></CreatePost>*/}
                {/*<CreateUserProfile></CreateUserProfile>*/}
                {/*<LoginTry /> */}
                {/* <UserProfile /> */}
                {/*<TryConnection /> */}
                <div className='flex flex-col '>

                    <div className='text-teal-500 m-1 '>
                        <label>Type : </label><input onChange={(e) => {
                            theInputs.current.type = e.target.value;
                            //console.log(theInputs.current.type);
                        }}
                            className='placeholder:text-teal-700 p-1
                        bg-teal-900'
                            placeholder='profileimg' type='text'></input>
                    </div>
                    <div className='text-teal-500 m-1'>
                        <label>Email : </label><input onChange={(e) => {
                            theInputs.current.email = e.target.value;
                        }}
                            className='placeholder:text-teal-700 p-1
                         bg-teal-900'
                            placeholder='1' type='text'></input>
                    </div>
                    Upload Image :
                    <input disabled={disableit[0]} onChange={(e) => {
                        uploadImg(e);
                    }}
                        ref={fileinput} className="text-2xl font-bold " type="file">
                    </input>
                    <div className='font-bold text-teal-500'>

                        <input onChange={(e) => {
                            if (e.target.checked) {
                                setdisableit((prev) => {
                                    let newOne = prev.slice();
                                    newOne[0] = true;
                                    return newOne;
                                });
                            } else {
                                setdisableit((prev) => {
                                    let newOne = prev.slice();
                                    newOne[0] = false;
                                    return newOne;
                                });
                            }
                        }} type='checkbox'></input> <label>disable</label>
                    </div>

                    <br />

                    Upload pdf :
                    <input disabled={disableit[1]} onChange={(e) => {
                        uploadPdf(e);
                    }}
                        ref={fileinput} className="text-2xl font-bold " type="file">
                    </input>
                    <div className='font-bold text-teal-500'>

                        <input onChange={(e) => {
                            if (e.target.checked) {
                                setdisableit((prev) => {
                                    let newOne = prev.slice();
                                    newOne[1] = true;
                                    return newOne;
                                });
                            } else {
                                setdisableit((prev) => {
                                    let newOne = prev.slice();
                                    newOne[1] = false;
                                    return newOne;
                                });
                            }
                        }} type='checkbox'></input> <label>disable</label>
                    </div>
                    <br />
                </div>












            </div>


        </>
    );
}


export { Rough };