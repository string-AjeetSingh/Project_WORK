import { useEffect, useRef, useState } from 'react';
import { AboutJob } from '../Components/Rough/AboutJob';
import { UserProfile } from '../Components/UserProfile/UserProfile';
import { JobCards } from '../Components/JobCards/jobCards';






function Rough({ children }) {

    
    return (
        <>

            <div>
               {/*<JobCards></JobCards>*/}
                  {/*<AboutJob></AboutJob>*/}
                <UserProfile></UserProfile>
            </div>
            

        </>
    );
}


export { Rough };