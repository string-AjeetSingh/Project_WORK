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


    useEffect(() => {

        /* 
        
        if (loadingScreen.current.on) {
            alert('going to append loading screen');
            loadingScreen.current.on();
        }
        setTimeout(() => {
            if (loadingScreen.current.off) {
                alert('going to off loading screen');
                loadingScreen.current.off();
            }
        }, 6000);
        
        return (() => {
            if (loadingScreen.current.off) {
                loadingScreen.current.off();
            }
        })
        */
    }, [])

    return (
        <>


            {/*<LoadingScreen />*/}


            <div>
                {/*<JobCards></JobCards>*/}
                {/*<AboutJob></AboutJob>*/}
                {/*<CreatePost></CreatePost>*/}
                {/*<CreateUserProfile></CreateUserProfile>*/}
                {/*<LoginTry /> */}
                {/* <UserProfile /> */}
                {/*<TryConnection /> */}

                <GetInputArray name={'Tags :'} />







            </div>


        </>
    );
}


export { Rough };