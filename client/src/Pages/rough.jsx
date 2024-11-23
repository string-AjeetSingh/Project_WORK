import { useEffect, useRef, useState } from 'react';
import { AboutJob } from '../Components/Rough/AboutJob';
import { JobCards } from '../Components/JobCards/jobCards';



function Rough({ children }) {

    
    return (
        <>

            <div>
               {/*<JobCards></JobCards>*/}
               <AboutJob></AboutJob>

            </div>

        </>
    );
}


export { Rough };