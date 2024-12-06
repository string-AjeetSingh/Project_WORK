import { useEffect, useRef, useState } from 'react';
import { AboutJob } from '../Components/Rough/AboutJob';
import { UserProfile } from '../Components/UserProfile/UserProfile';
import { CreatePost } from '../Components/CreatePost/CreatePost';
import { CreateUserProfile } from '../Components/CreateUserProfile/createUserProfile';
import { JobCards } from '../Components/JobCards/jobCards';
import { LoginTry } from '../Components/Rough/login';
import { TryConnection } from '../Components/Rough/tryConnectionServer';
import { LoadingScreen } from '../Components/TranstitionScreen/LoadingScreen';






function Rough({ children }) {


    return (
        <>
            <LoadingScreen />
            <div>

                {/*<JobCards></JobCards>*/}
                {/*<AboutJob></AboutJob>*/}

                {/*  <CreatePost></CreatePost>*/}

                {/*   <CreateUserProfile></CreateUserProfile>*/}
                {/* <LoginTry /> */}
                {/* <TryConnection /> */}
                {/* <LoginTry /> */}






            </div>


        </>
    );
}


export { Rough };