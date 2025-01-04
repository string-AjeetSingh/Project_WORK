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






function Rough({ children }) {
    const navigate = useNavigate();
    const loadingScreen = useRef(null);
    const fileinput = useRef(null);

    async function uploadImg(e) {
        console.log("from uploadImg -- -- -- ");

        const upload = new requestServer('/xtServer/api/rough', {
            method: 'POST',
        });

        console.log('the file is : ', e.target.files[0]);
        upload.setFormData("theImg", e.target.files[0]);
        let result = await upload.fetchNoStringify();
        upload.resetFormData();

        if (result) {
            console.log('the result from server is : ', result);
        }
    }

    async function uploadPdf(e) {
        console.log("from uploadPdf -- -- -- ");

        const upload = new requestServer('/xtServer/api/roughPdf', {
            method: 'POST',
        });

        console.log('the file is : ', e.target.files[0]);
        upload.setFormData("thePdf", e.target.files[0]);
        let result = await upload.fetchNoStringify();
        upload.resetFormData();

        if (result) {
            console.log('the result from server is : ', result);
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
                Upload Image :
                <input onChange={(e) => {
                    uploadImg(e);
                }}
                    ref={fileinput} className="text-2xl font-bold " type="file">
                </input> <br />

                Upload pdf :
                <input onChange={(e) => {
                    uploadPdf(e);
                }}
                    ref={fileinput} className="text-2xl font-bold " type="file">
                </input> <br />












            </div>


        </>
    );
}


export { Rough };