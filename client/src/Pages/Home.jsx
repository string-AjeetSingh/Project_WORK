//import { HomeWithoutLogin } from "./HomeWithoutLogin";
import { HomeWithoutLogin } from "../Components/HomeWithoutLogin/HomeWithoutLogin";
import { HomeWithLogin } from './../Components/HomeWithLogin/HomeWithLogin';

import { useControlLogin } from "../MyLib/MyHook/controlLogin";



function Home({ }) {

    let isLogin = false;

    const { isAuthenticated, isLoading } = useControlLogin();


    if (!isLoading) {
        return (<>
            {isAuthenticated ? <HomeWithLogin /> : <HomeWithoutLogin />}
        </>);
    }
    return <div className="text-2xl font-bold ">Loading Please wait</div>

}


export { Home };