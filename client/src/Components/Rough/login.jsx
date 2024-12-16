import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { requestServer } from "../../MyLib/RequestServer/requestServer";
import { useControlLogin } from "../../MyLib/MyHook/controlLogin";




import { ifDebugging } from "../../MyLib/ifDebugging/ifDebugging";
import { use } from "react";

const toServer = new requestServer('/xtServer/api/token');
const debug = new ifDebugging(process.env.REACT_APP_isDebugging);

function LoginTry({ }) {


    const tokenRef = useRef(null);
    const { loginWithRedirect, nowLogout, user, isAuthenticated, isLoading } = useControlLogin();


    console.log(user);

    async function handleUserDetail(params) {

        const userDetial = new requestServer(process.env.REACT_APP_SERVER_URL + "/xtServer/api/userDetail"
            , { method: 'GET' }
        );

        delete (userDetial.options.body);

        userDetial.setAuthorizedFlag(isAuthenticated);
        let result = await userDetial.requestJson();

        if (result) {
            console.log('the user detail would be : ', result);
        }

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




                <button onClick={() => {
                    handleUserDetail();
                }}
                    className=" font-bold text-2xl p-1 m-2 text-center pl-5 pr-5 
                 bg-pink-400 border-2 border-black rounded-xl active:bg-red-500">


                    getUserDetail
                </button>
            </div>
        </>
    );
}

export { LoginTry }
