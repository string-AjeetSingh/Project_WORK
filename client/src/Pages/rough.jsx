import { useEffect, useRef, useState } from 'react';
import { AboutJob } from '../Components/Rough/AboutJob';
import { UserProfile } from '../Components/UserProfile/UserProfile';
import { CreatePost } from '../Components/CreatePost/CreatePost';
import { CreateUserProfile } from '../Components/CreateUserProfile/createUserProfile';
import { JobCards } from '../Components/JobCards/jobCards';






function Rough({ children }) {


    return (
        <>

            <div>

                {/*<JobCards></JobCards>*/}
                {/*<AboutJob></AboutJob>*/}

                {/*  <CreatePost></CreatePost>*/}
                <CreatePost></CreatePost>
                {/*   <CreateUserProfile></CreateUserProfile>*/}

            </div>


        </>
    );
}


export { Rough };