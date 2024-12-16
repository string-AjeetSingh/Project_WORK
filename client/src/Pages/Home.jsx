//import { HomeWithoutLogin } from "./HomeWithoutLogin";
import { HomeWithoutLogin } from "../Components/HomeWithoutLogin/HomeWithoutLogin";
import { HomeWithLogin } from './../Components/HomeWithLogin/HomeWithLogin';

import { useControlLogin } from "../MyLib/MyHook/controlLogin";
import { useNavigate } from "react-router-dom";

import { requestServer } from "../MyLib/RequestServer/requestServer";
import { useEffect } from "react";


function Home({ }) {

    let isLogin = false;

    const { isAuthenticated, isLoading, user, loginWithRedirect, nowLogout } = useControlLogin(true);

    async function isRegistered() {
        const toServer = new requestServer(process.env.REACT_APP_SERVER_URL +
            '/xtServer/api/isRegistered', { optionsMode: 'default' }, true);

        let result = await toServer.requestJson();


        if (result) {
            if (result.json.status) {
                console.log('is registered');
            } else {
                console.log('is not registered');
            }
        }
        else {
            console.error('an error with request');
        }
    }

    useEffect(() => {

        isRegistered();

    }, [isAuthenticated])

    if (!isLoading) {
        return (<>
            {isAuthenticated ? <HomeWithLogin logout={nowLogout} user={user} /> : <HomeWithoutLogin
                login={loginWithRedirect} user={user} />}
        </>);
    }
    return <div className="text-2xl font-bold ">Loading Please wait</div>

}


export { Home };