import { useEffect, useRef, useState } from 'react';
import { AboutJob } from '../Components/Rough/AboutJob';
import { UserProfile } from '../Components/UserProfile/UserProfile';
import { CreatePost } from '../Components/CreatePost/CreatePost';
import { CreateUserProfile } from '../Components/CreateUserProfile/createUserProfile';
import { JobCards } from '../Components/JobCards/jobCards';
import { LoginTry } from '../Components/Rough/login';






function Rough({ children }) {


    return (
        <>

            <div>

                {/*<JobCards></JobCards>*/}
                {/*<AboutJob></AboutJob>*/}

                {/*  <CreatePost></CreatePost>*/}

                {/*   <CreateUserProfile></CreateUserProfile>*/}
                <LoginTry />

            </div>


        </>
    );
}


export { Rough };