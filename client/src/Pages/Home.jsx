//import { HomeWithoutLogin } from "./HomeWithoutLogin";
import { HomeWithoutLogin } from "../Components/HomeWithoutLogin/HomeWithoutLogin";
import { HomeWithLogin } from './../Components/HomeWithLogin/HomeWithLogin';

import { useControlLogin } from "../MyLib/MyHook/controlLogin";



function Home({ }) {

    let isLogin = false;

    const { isAuthenticated, isLoading, user, loginWithRedirect, nowLogout } = useControlLogin(true);


    if (!isLoading) {
        return (<>
            {isAuthenticated ? <HomeWithLogin logout={nowLogout} user={user} /> : <HomeWithoutLogin
                login={loginWithRedirect} user={user} />}
        </>);
    }
    return <div className="text-2xl font-bold ">Loading Please wait</div>

}


export { Home };