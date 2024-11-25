import { useEffect, useRef, useState } from 'react';
import { AboutJob } from '../Components/Rough/AboutJob';
import { UserProfile } from '../Components/UserProfile/UserProfile';
import { CreatePost } from '../Components/CreatePost/CreatePost';
import { JobCards } from '../Components/JobCards/jobCards';






function Rough({ children }) {


    return (
        <>

            <div>

                {/*<JobCards></JobCards>*/}
                {/*<AboutJob></AboutJob>*/}
                {/*  <UserProfile></UserProfile>*/}

                <CreatePost></CreatePost>
            </div>


        </>
    );
}


export { Rough };