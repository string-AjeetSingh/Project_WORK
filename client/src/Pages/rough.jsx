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
import { GetInputArray } from '../Components/CreatePost/subComponents';





function Rough({ children }) {
    const navigate = useNavigate();
    const loadingScreen = useRef(null);




    return (
        <>


            {/*<LoadingScreen />*/}
            <LoadingScreen outControl={loadingScreen} />


            <div>
                {/*<JobCards></JobCards>*/}
                {/*<AboutJob></AboutJob>*/}
                {/*<CreatePost></CreatePost>*/}
                {/*<CreateUserProfile></CreateUserProfile>*/}
                {/*<LoginTry /> */}
                {/* <UserProfile /> */}
                {/*<TryConnection /> */}

                <button className="m-1  text-[1rem] rounded-md
                        border-[2px] hover:bg-green-800 active:bg-green-900
                        text-green-200 z-50
                        border-green-950 p-1">
                    On
                </button>

                <button className="m-1  text-[1rem] rounded-md
                        border-[2px] hover:bg-green-800 active:bg-green-900
                        text-green-200 z-50
                        border-green-950 p-1">
                    Off
                </button>







            </div>


        </>
    );
}


export { Rough };