import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { requestServer } from "../../MyLib/RequestServer/requestServer";
import { useControlLogin } from "../../MyLib/MyHook/controlLogin";

import { ifDebugging } from "../../MyLib/ifDebugging/ifDebugging";

const toServer = new requestServer('/xtServer/api/token');
const debug = new ifDebugging(process.env.REACT_APP_isDebugging);

function LoginTry({ }) {

    const tokenRef = useRef(null);
    const { loginWithRedirect, nowLogout } = useControlLogin();



    async function serverLogout() {
        console.clear();
        console.log('from serverLogout(), i attempt to clean console');

        let res = await toServer.requestJson();
        console.log('from server logout : ', res);



    }



    return (
        <>
            <div className="p-10 border-2 m-1 text-3xl font-serif  border-red-400">
                Using login now working on it.
                <p>Below , let's test it</p>
                <br>
                </br>

            </div>
            <div className="flex flex-row justify-center">
                <button className=" font-bold text-2xl p-1 m-2 text-center pl-5 pr-5 
                 bg-pink-400 border-2 border-black rounded-xl active:bg-red-500"
                    onClick={() => { loginWithRedirect(); }}>
                    Login
                </button>
                <button className=" font-bold text-2xl p-1 m-2 text-center pl-5 pr-5 
                 bg-pink-400 border-2 border-black rounded-xl active:bg-red-500"
                    onClick={() => {
                        nowLogout();
                    }}>
                    Logout
                </button>

                <button className=" font-bold text-2xl p-1 m-2 text-center pl-5 pr-5 
                 bg-pink-400 border-2 border-black rounded-xl active:bg-red-500"
                    onClick={() => {
                        debug.console('working on it .. ');
                        serverLogout();
                    }}>
                    ServerLogout
                </button>
            </div>
        </>
    );
}

export { LoginTry }
