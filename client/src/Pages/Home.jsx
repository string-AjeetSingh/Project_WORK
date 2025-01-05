//import { HomeWithoutLogin } from "./HomeWithoutLogin";
import { HomeWithoutLogin } from "../Components/HomeWithoutLogin/HomeWithoutLogin";
import { HomeWithLogin } from './../Components/HomeWithLogin/HomeWithLogin';
import { LoadingScreen } from "../Components/TranstitionScreen/LoadingScreen";
import { pleaseWait } from "../MyLib/Animation/animation";

import { useControlLogin } from "../MyLib/MyHook/controlLogin";
import { useNavigate } from "react-router-dom";


import { requestServer } from "../MyLib/RequestServer/requestServer";
import { useEffect, useRef, useState } from "react";


function Home({ }) {

    const loadingScreen = useRef(null);
    const offLoadingScreenFromChild = useRef(null);
    const [boolscreen, setboolscreen] = useState(true);
    const [otherWise, setOtherWise] = useState(null);
    const { isAuthenticated, isLoading, ifRegistered,
        user, loginWithRedirect, nowLogout } = useControlLogin(true);

    async function noUser() {
        loadingScreen.current.off();
        await pleaseWait(2900);

        setTimeout(() => {
            setboolscreen(null);
        }, 5000)

        setOtherWise(<HomeWithoutLogin
            login={loginWithRedirect} user={user} />);
    }

    useEffect(() => {
        //console.log('from userEffect');
        if (loadingScreen.current) {
            offLoadingScreenFromChild.current = {
                off: () => {
                    loadingScreen.current.off();
                    setTimeout(() => {
                        setboolscreen(null);
                    }, 5000)
                }
            }
            loadingScreen.current.on();
        }
    }, [loadingScreen.current]);

    useEffect(() => {
        if (!isLoading) {

            if (!isAuthenticated) {
                noUser();
            }
        }
    }, [isAuthenticated, isLoading])


    return (<>
        {boolscreen ? <LoadingScreen outControl={loadingScreen} /> : null}
        {isAuthenticated ? ifRegistered ? <HomeWithLogin
            iAmReady={offLoadingScreenFromChild} logout={nowLogout}
            user={user} isAuthenticated={isAuthenticated} /> : null
            : otherWise}
    </>);
}




export { Home };