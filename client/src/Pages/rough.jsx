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






function Rough({ children }) {
    const navigate = useNavigate();
    const loadingScreen = useRef(null);




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
                <GetCheckBox name="Job Types :" />








            </div>


        </>
    );
}


export { Rough };