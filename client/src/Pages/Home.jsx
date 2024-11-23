//import { HomeWithoutLogin } from "./HomeWithoutLogin";
import { HomeWithoutLogin } from "../Components/HomeWithoutLogin/HomeWithoutLogin";



function Home({ }) {

    let isLogin = false;
    return (<>
        {isLogin? <h1>Working on Login Page</h1>: <HomeWithoutLogin/>}
    </>);
}


export{Home};