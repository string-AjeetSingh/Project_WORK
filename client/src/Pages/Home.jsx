//import { HomeWithoutLogin } from "./HomeWithoutLogin";
import { HomeWithoutLogin } from "../Components/HomeWithoutLogin/HomeWithoutLogin";
import { HomeWithLogin } from './../Components/HomeWithLogin/HomeWithLogin';

import { useControlLogin } from "../MyLib/MyHook/controlLogin";



function Home({ }) {

    let isLogin = false;

    const { isAuthenticated, isLoading, loginWithRedirect, nowLogout } = useControlLogin(true);


    if (!isLoading) {
        return (<>
            {isAuthenticated ? <HomeWithLogin /> : <HomeWithoutLogin
                login={loginWithRedirect} logout={nowLogout} />}
        </>);
    }
    return <div className="text-2xl font-bold ">Loading Please wait</div>

}


export { Home };