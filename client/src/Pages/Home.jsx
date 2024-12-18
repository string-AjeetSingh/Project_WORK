//import { HomeWithoutLogin } from "./HomeWithoutLogin";
import { HomeWithoutLogin } from "../Components/HomeWithoutLogin/HomeWithoutLogin";
import { HomeWithLogin } from './../Components/HomeWithLogin/HomeWithLogin';

import { useControlLogin } from "../MyLib/MyHook/controlLogin";
import { useNavigate } from "react-router-dom";

import { requestServer } from "../MyLib/RequestServer/requestServer";
import { useEffect } from "react";


function Home({ }) {


    const { isAuthenticated, isLoading, ifRegistered,
        user, loginWithRedirect, nowLogout } = useControlLogin(true);


    if (!isLoading) {
        return (<>
            {isAuthenticated ? ifRegistered ? <HomeWithLogin logout={nowLogout}
                user={user} isAuthenticated={isAuthenticated} /> : null
                : <HomeWithoutLogin
                    login={loginWithRedirect} user={user} />}
        </>);
    }
    return <div className="text-2xl font-bold ">Loading Please wait</div>

}


export { Home };